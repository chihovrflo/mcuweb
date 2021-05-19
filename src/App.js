import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [host, setHost] = useState('192.168.51.5');
  const [port, setPort] = useState(1500);
  return (
    <div className="App">
      <input type="text" value={host} onChange={(event) => setHost(event.target.value)} placeholder="host" />
      <input type="number" value={port} onChange={(event) => setPort(event.target.value)} placeholder="port" />
      <button><Link to={`/mcu/host/${host}/port/${port}`}>Add MCU</Link></button>
    </div>
  );
}

export default App;
