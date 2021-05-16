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
  
  return (
    <div >
      MCU
    </div>
  );
}