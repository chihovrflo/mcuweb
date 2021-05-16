import React, { useRef, useEffect } from 'react';

export default function MCU() {
  const wsRef = useRef();
  useEffect(() => {
    wsRef.current = new WebSocket(process.env.REACT_APP_WS_HOST || 'ws://localhost:5000');
    if (wsRef.current) {
      wsRef.current.onopen = () => console.log('ws is open');
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
    <div >
      MCU
      <button onClick={handleClick}>Send</button>
    </div>
  );
}