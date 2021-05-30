import React, { useState } from 'react';
import useWebSocket from 'hooks/useWebSocket';
import pt from 'lib/propTypes';

export default function MCUDetail({ match }) {
  const { port, host } = match.params;
  const [data, setData] = useState('');
  const wsRef = useWebSocket({
    onOpen: (ws) => {
      console.log('ws is opened!');
      ws.send(JSON.stringify({
        type: 'ADD_MCU_SOCKET',
        data: { port, host },
      }));
    },
    onClose: () => console.log('close'),
    onMessage: (ws, event) => setData(event.data),
  });
  const handleClick = () => {
    if (wsRef.current) {
      wsRef.current.send('FanOn');
    }
  };
  return (
    <div>
      {data}
      <button type="button" onClick={handleClick}>Send</button>
    </div>
  );
}

MCUDetail.propTypes = {
  match: pt.match.isRequired,
};
