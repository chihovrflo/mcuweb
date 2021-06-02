import React, { useState } from 'react';
import useWebSocket from 'hooks/useWebSocket';
import pt from 'lib/propTypes';
import {
  tempSetup, fanOn, fanOff, fanSetup, bulbOn, bulbOff, bulbSetup, dataRead, configFileRead,
} from 'actions/mcu';
import {
  DetailInput,
  DetailRoot,
} from './styled';

export default function MCUDetail({ match }) {
  const { port, host } = match.params;
  const [display, setDisplay] = useState('');
  const [auto, setAuto] = useState('');
  const [manual, setManual] = useState('');
  const [temp, setTemp] = useState('');
  const [fan, setFan] = useState('');
  const [bulb, setBulb] = useState('');
  const wsRef = useWebSocket({
    onOpen: (ws) => {
      console.log('ws is opened!');
      ws.send(JSON.stringify({
        type: 'ADD_MCU_SOCKET',
        data: { port, host },
      }));
    },
    onClose: () => console.log('close'),
    onMessage: (ws, event) => {
      const res = JSON.parse(event.data);
      if (res.type === 'setUpDisplay') setDisplay(res.payload);
      else if (res.type === 'setUpAuto') setAuto(res.payload);
      else setManual(res.payload);
    },
  });

  const handleClick = (event) => () => {
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify(event));
    }
  };
  const handleTemp = (event) => {
    setTemp(event.target.value);
  };
  const handleFan = (event) => {
    setFan(event.target.value);
  };
  const handleBulb = (event) => {
    setBulb(event.target.value);
  };

  return (
    <DetailRoot>
      <div>
        <button type="button" onClick={handleClick(dataRead())}>DataRead</button>
        <button type="button" onClick={handleClick(configFileRead())}>ConfigFileRead</button>
      </div>
      <div>
        {display}
      </div>
      <DetailInput label="Temp" value={temp} onChange={handleTemp} />
      <button type="button" onClick={handleClick(tempSetup(temp))}>Send</button>
      <div>
        {auto}
      </div>
      <div>
        <button type="button" onClick={handleClick(fanOn())}>FanOn</button>
        <button type="button" onClick={handleClick(fanOff())}>FanOff</button>
        <DetailInput label="Fan" value={fan} onChange={handleFan} />
        <button type="button" onClick={handleClick(fanSetup(fan))}>Send</button>
      </div>
      <div>
        <button type="button" onClick={handleClick(bulbOn())}>BulbOn</button>
        <button type="button" onClick={handleClick(bulbOff())}>BulbOff</button>
        <DetailInput label="Bulb" value={bulb} onChange={handleBulb} />
        <button type="button" onClick={handleClick(bulbSetup(bulb))}>Send</button>
      </div>
      <div>
        {manual}
      </div>
    </DetailRoot>
  );
}

MCUDetail.propTypes = {
  match: pt.match.isRequired,
};
