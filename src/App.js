import logo from './logo.svg';
// import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [counter, setCounter] = useState(0);
  const [jsonData, setjsonData] = useState('');
  const [userData, setUserData] = useState([]);

  const getSingleUserName = (singleUser) => {
    const { name : {first, last}} = singleUser;
    return `${first} ${last}`;
  }

  const getSingleUserImage = (singleUser) => {
    const { picture: {thumbnail}} = singleUser;
    return thumbnail;
  }
  useEffect(() => {
    fetchJsonData().then((userData) => {
      const stringifyData = JSON.stringify(userData, null, 2);
      setjsonData(stringifyData || 'No User Found');
      
      console.log(userData);
      setUserData(userData.data.results);
    });
  },[]);

  async function fetchJsonData() {
    try {
      const response = await axios.get('https://randomuser.me/api/');
      return response;

      // let stringifyData = JSON.stringify(response.data.results, null, 2);
      // let stringifyData = JSON.stringify(response.data.results);
      // setjsonData(stringifyData);
      // console.log(response.data.results);
      // setUserData(response.data.results);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <h1>REACT INTERVIEW</h1>
      <hr></hr>
      <p>Problem 1</p>
      <p>{counter}</p>
      <button onClick={ () => setCounter( counter + 1 ) }>increment</button>
      <p>Problem 2</p>
      <button onClick={fetchJsonData}>fetch user data</button>
      <pre>{jsonData}</pre>
      <p>Problem 3</p>
      {
        userData.map((singleUser, index) => (
          <div key={index}>
            <img src={getSingleUserImage(singleUser)} />
            <p><i>{getSingleUserName(singleUser)}</i></p>
          </div>
        ))
      }
      <p>Problem 4</p>
    </div>
  );
}

export default App;
