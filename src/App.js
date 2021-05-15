import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [client, setClient] = useState(null);
  const [input, setInput] = useState('');
  const wsConnect = () => {
    setClient(new WebSocket(process.env.REACT_APP_WS_HOST || 'ws://localhost:5000'));
  };
  useEffect(() => {
    if (client) {
      console.log(client);
      client.onopen = () =>console.log('ws is open')
    }
  }, [client])
  const sendMsg = () => {
    if (client) client.send(input);
  }
  return (
    <div className="App">
      <button onClick={wsConnect}>connect</button>
      <input value={input} onChange={(event) => setInput(event.target.value)} />
      <p>{input}</p>
      <button onClick={sendMsg}>send</button>
    </div>
  );
}

export default App;
