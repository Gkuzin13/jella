import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {
  const getRes = async () => {
    try {
      const res = await fetch('http://localhost:5000/');

      const msg = await res.json();

      console.log(msg);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getRes();
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
