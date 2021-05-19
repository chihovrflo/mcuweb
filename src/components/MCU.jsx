import React, { useState, useRef, useEffect } from 'react';

export default function MCU({ match }) {
  const { port, host } = match.params;
  const [data, setData] = useState('');
  const wsRef = useRef();
  useEffect(() => {
    wsRef.current = new WebSocket(process.env.REACT_APP_WS_HOST || 'ws://localhost:5001');
    if (wsRef.current) {
      wsRef.current.onopen = () => {
        console.log('ws is opened!');
        wsRef.current.send(JSON.stringify({
          type: 'ADD_MCU_SOCKET',
          data: { port, host },
        }));
      };
      wsRef.current.onclose = () => console.log('ws is closed!');
      wsRef.current.onmessage = (event) => setData(event.data);
    }
    return () => {
      wsRef.current.close();
    }
  }, [port, host]);

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