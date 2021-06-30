import React, { useState, useEffect, useRef } from 'react';
import Db from '../config/db.json';

const Exam = () => {
  const { name, version } = Db;
  const [dbInstance, setDBInstance] = useState(null);
  let recorder = useRef(null);
  let objectStore = null;

  const makeTX = (storeName, mode) => {
    let tx = dbInstance.transaction(storeName, mode);
    tx.onerror = (err) => {
      console.warn(err);
    };
    return tx;
  };
  useEffect(() => {
    if (checkIndexDb()) {
      connectDatabase();
    }
  }, []);
  useEffect(() => {
    const streamInitialize = async () => {
      let stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      recorder.current = new MediaRecorder(stream);
      recorder.current.addEventListener('dataavailable', (event) => {
        let tx = makeTX('audio', 'readwrite');
        let store = tx.objectStore('audio');
        let req = store.get(1);
        req.onsuccess = (e) => {
          const result = e.target.result;
          const newChunk = [...result.chunk];
          newChunk.push(event.data);
          console.log('Event Listerner Called: ', newChunk);
          store.put({ ...result, chunk: newChunk });
        };
      });
      recorder.current.start(1000);
    };
    console.log(dbInstance);
    if (dbInstance) {
      streamInitialize();
    }
  }, [dbInstance]);

  const checkIndexDb = () => {
    if (!window.indexedDB) {
      alert("Your browser doesn't support a stable version of indexedDb.");
      return false;
    }
    return true;
  };

  const connectDatabase = () => {
    const request = window.indexedDB.open(name, version);
    request.onerror = () => {
      alert('ERROR!!! Could not open database.');
    };
    request.onupgradeneeded = (event) => {
      debugger;
      setDBInstance(event.target.result);
      if (!dbInstance.objectStoreNames.contains('audio')) {
        objectStore = dbInstance.createObjectStore('audio', {
          keyPath: 'key',
          autoIncrement: true,
        });
        console.log(objectStore);
      }
    };
    request.onsuccess = (event) => {
      debugger;
      setDBInstance(event.target.result);
      let audioObjectStore = makeTX('audio', 'readwrite').objectStore('audio');
      audioObjectStore.add({ chunk: [] });
    };
  };

  const stopRecordHandler = () => {
    if (recorder.current) {
      recorder.current.stop();
      let tx = makeTX('audio', 'readonly');
      let store = tx.objectStore('audio');
      let req = store.get(1);
      req.onsuccess = (e) => {
        const result = e.target.result;
        const audioBlob = new Blob(result.chunk);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      };
    }
  };
  return (
    <>
      <h1>Your audio is being recorded.</h1>

      <button
        style={{ fontSize: '20px', color: 'white', backgroundColor: 'Blue' }}
        onClick={stopRecordHandler}
      >
        End Exam
      </button>
    </>
  );
};
export default Exam;
