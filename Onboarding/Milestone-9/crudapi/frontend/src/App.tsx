import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { HelloMessage } from './components/HelloMessage';
import { Testbutton } from './components/HelloMessage';
import HnItem from '././components/fetchfromanAPI';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <p>
          <HelloMessage />
        </p>
      </div>
      <div>
        <p>
          <Testbutton onClick={() => console.log('clicked')} />{' '}
        </p>
      </div>
      <div>
        <p>
          <h1>Hacker News Item</h1>
          <HnItem itemId={8863} />
        </p>
      </div>
    </>
  );
}

export default App;
