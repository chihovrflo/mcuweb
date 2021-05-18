import React, { useState, useRef, useEffect } from 'react';

export default function MCU() {
  const [data, setData] = useState('');
  const wsRef = useRef();
  useEffect(() => {
    wsRef.current = new WebSocket(process.env.REACT_APP_WS_HOST || 'ws://localhost:5000');
    if (wsRef.current) {
      wsRef.current.onopen = () => console.log('ws is opened!');
      wsRef.current.onclose = () => console.log('ws is closed!');
      wsRef.current.onmessage = (event) => setData(event.message);
    }
    return () => {
      wsRef.current.close();
    }
  }, []);

  const handleClick = () => {
    if (wsRef.current) {
      wsRef.current.send('FanOn');
    }
  }

  return (
    <div>
      {data}
      <button onClick={handleClick}>Send</button>
    </div>
  );
}