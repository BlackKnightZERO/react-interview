import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [counter, setCounter] = useState(0);
  // const [jsonData, setjsonData] = userState([]);


  async function fetchJsonData() {
    try {
      const response = await axios.get('https://randomuser.me/api/');
      console.log(response);
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
      {/* <pre>{jsonData}</pre> */}
      <p>Problem 3</p>
      <p>Problem 4</p>
    </div>
  );
}

export default App;
