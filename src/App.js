import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [mcuList, setMCUList] = useState(['PI1', 'PI2']);
  const [host, setHost] = useState('');
  const [port, setPort] = useState(null);
  return (
    <div className="App">
      {mcuList.map((mcu) => (
        <div key={mcu} style={{ margin: '10px', padding: '10px', border: '2px solid #333', borderRadius: '5px' }}>
          <Link to={`/mcu/${mcu}`}>{mcu}</Link>
        </div>
      ))}
      <input type="text" value={host} onChange={(event) => setHost(event.target.value)} placeholder="host" />
      <input type="number" value={port} onChange={(event) => setPort(event.target.value)} placeholder="port" />
      <button><Link to={`/mcu/host/${host}/port/${port}`}>Add MCU</Link></button>
    </div>
  );
}

export default App;
