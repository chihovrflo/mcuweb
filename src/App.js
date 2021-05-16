import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [mcuList, setMCUList] = useState(['PI1', 'PI2']);
  return (
    <div className="App">
      {mcuList.map((mcu) => (
        <div key={mcu} style={{ margin: '10px', padding: '10px', border: '2px solid #333', borderRadius: '5px' }}>
          <Link to={`/mcu/${mcu}`}>{mcu}</Link>
        </div>
      ))}
    </div>
  );
}

export default App;
