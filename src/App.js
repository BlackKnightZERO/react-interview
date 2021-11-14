import logo from './logo.svg';
// import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface SingleUserName {
  first: String;
  last: String;
}

interface SingleUserImage {
  thumbnail: String;
}

interface SingleUser {
  name: SingleUserName;
  picture: SingleUserImage;
  // picture: any;
}

function App() {

  const [counter, setCounter] = useState(0);
  const [jsonData, setjsonData] = useState('');
  const [userData, setUserData] = useState([]);
  const [nextPageNumber, setnextPageNumber] = useState(1);

  const getSingleUserName = (singleUser: SingleUser) => {
    const { name : {first, last}} = singleUser;
    return `${first} ${last}`;
  }

  const getSingleUserImage = (singleUser: SingleUser) => {
    const { picture: {thumbnail}} = singleUser;
    return thumbnail;
  }

  // const fetchAndAppendNewUser = (pageNumber : number = 1) => {
    const fetchAndAppendNewUser = (pageNumber : number) => {

      let url = `https://randomuser.me/api?page=${pageNumber}`;
      
      return axios.get(url)
                  .then(({ data }) => {

                    if(data===undefined) return;

                    console.log(data.results);
                    const newUser = [
                      ...userData,
                      ...data.results,
                    ]
                    setUserData(newUser);
                    setjsonData(JSON.stringify(data, null, 2));
                  })
                  .catch((error) => {
                    console.error(error);
                  })
  }

  useEffect(() => {
    fetchJsonData(nextPageNumber).then((userData) => {
      const stringifyData = JSON.stringify(userData.data, null, 2);
      setjsonData(stringifyData || 'No User Found');
      
      console.log(userData);
      setUserData(userData.data.results);
      setnextPageNumber(userData.data.info.page + 1);
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

      <p style={{color:'red'}}>Problem 1</p>
      <p>{counter}</p>
      <button onClick={ () => setCounter( counter + 1 ) }>increment</button>
      
      <p style={{color:'red'}}>Problem 2</p>
      {/* <button onClick={fetchJsonData}>fetch user data</button> */}
      <pre>{jsonData}</pre>
      
      <p style={{color:'red'}}>Problem 3</p>
      <div style={{display:'flex', flexWrap:'wrap'}}>
      {
        userData.map((singleUser:SingleUserName, index) => (
          <div key={index} style={{ margin:'5px' }}>
            <img src={getSingleUserImage(singleUser)} />
            <p><i>{getSingleUserName(singleUser)}</i></p>
          </div>
        ))
      }
      </div>
      <p style={{color:'red'}}>Problem 4</p>
      <button onClick={fetchAndAppendNewUser}>fetch user data</button>
    </div>
  );
}

export default App;
