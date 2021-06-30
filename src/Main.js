import Form from './Form';
import React, { useState, useContext } from 'react';
import { UserContext } from './ThemeContext';
// import Audio from './Audio';

const Main = (props) => {
  const { dbInstance } = props;
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState();

  const addData = () => {
    const transaction = dbInstance.transaction(['customers'], 'readwrite');
    transaction.oncomplete = () => {
      console.log('All done');
    };
    transaction.onerror = (event) => {
      console.log('Error : ', event.target.errorCode);
    };
    const objStore = transaction.objectStore('customers');
    const request = objStore.add(user);
    request.onsuccess = () => {
      console.log('Added Data');
    };
    request.onerror = () => {
      console.log('Error');
    };
  };

  const getAllData = () => {
    let updatedUsers = [];
    const request = dbInstance
      .transaction('customers')
      .objectStore('customers')
      .openCursor();
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        let { value } = cursor;
        updatedUsers.push(value);
        cursor.continue();
      }
      setUsers(updatedUsers);
    };
  };
  return (
    <>
      <Form addData={addData} />
      <button onClick={getAllData} style={{ width: '100px', height: '50px' }}>
        Get All Data
      </button>
      {users?.map((user) => {
        return (
          <div>
            {user.name}
            {user.email}
          </div>
        );
      })}
      {/* <Audio dbInstance={dbInstance} /> */}
    </>
  );
};
export default Main;
