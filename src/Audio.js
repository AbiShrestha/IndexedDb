import { invokeSaveAsDialog } from 'recordrtc';
import { useState, useEffect, useCallback, useRef } from 'react';

const Audio = (props) => {
  const [supportRTC, setSupportRTC] = useState(true);

  let recorder = useRef(null);
  let audioChunks = [];
  let audioBlob = null;
  const addAudio = useCallback(() => {
    const transaction = props.dbInstance.transaction(
      ['customers'],
      'readwrite'
    );
    transaction.oncomplete = () => {
      console.log('All done');
    };
    transaction.onerror = (event) => {
      console.log('Error : ', event.target.errorCode);
    };
    const objStore = transaction.objectStore('customers');
    // const request = objStore.add(blob);
    // request.onsuccess = () => {
    //   console.log('Added Audio In IndexedDb');
    // };
    // request.onerror = () => {
    //   console.log('Error Adding Audio In IndexedDb');
    // };
  }, []);

  useEffect(() => {
    if (
      navigator.mediaDevices === 'undefined' ||
      !navigator.mediaDevices.getUserMedia
    ) {
      alert('This browser does not support Web RTC');
      if (!!navigator.getUserMedia) {
        alert('This browser seems supporting deprecated getUserMedia API.');
      }
      setSupportRTC(false);
    } else {
      const streamInitialize = async () => {
        let stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        recorder.current = new MediaRecorder(stream, {
          type: 'audio',
        });
        recorder.current.addEventListener('dataavailable', (event) => {
          audioChunks.push(event.data);
        });
      };
      streamInitialize();
    }
  }, []);

  const startRecordHandler = () => {
    recorder.current.start();
  };

  const stopRecordHandler = () => {
    if (recorder.current) {
      recorder.current.stop();
      recorder.current.addEventListener('stop', () => {
        audioBlob = new Blob(audioChunks);
      });
    }
  };

  const playRecordHandler = async () => {
    let blob = await recorder.getBlob();
    let state = await recorder.getState();
    console.log(state);
    const filename = 'record1.wav';
    invokeSaveAsDialog(blob, filename);
    await recorder.destroy();
  };

  return (
    <>
      {supportRTC ? (
        <>
          <div style={{ diplay: 'flex', margin: '20px' }}>
            <button
              onClick={addAudio}
              style={{ marginRight: '10px', width: '100px', height: '50px' }}
            >
              Add Audio in Indexeddb
            </button>
            <button
              style={{ marginRight: '10px' }}
              onClick={startRecordHandler}
            >
              Record
            </button>
            <button style={{ marginRight: '10px' }} onClick={stopRecordHandler}>
              Stop
            </button>
            <button style={{ marginRight: '10px' }} onClick={playRecordHandler}>
              Play
            </button>
            {/* <button style={{ marginRight: '10px' }}>Play from state</button> */}
          </div>
        </>
      ) : (
        <h2>Does not support Web RTC</h2>
      )}
    </>
  );
};
export default Audio;
