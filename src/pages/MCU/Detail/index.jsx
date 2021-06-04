import React, { useState } from 'react';
import useWebSocket from 'hooks/useWebSocket';
import pt from 'lib/propTypes';
import {
  tempSetup, fanOn, fanOff, fanSetup, bulbOn, bulbOff, bulbSetup, dataRead, configFileRead,
} from 'actions/mcu';
import {
  DetailRoot,
  Temperature,
  TempWrapper,
  DetailItem,
} from './styled';
import Controller from './components/Controller';

export default function MCUDetail({ match }) {
  const { port, host } = match.params;
  const [display, setDisplay] = useState('25');
  const [fanSpeed] = useState('unknown');
  const [bulbLight] = useState('unknown');
  const [temp, setTemp] = useState('');
  const [auto, setAuto] = useState('');
  const [manual] = useState('');
  const [fan, setFan] = useState('');
  const [bulb, setBulb] = useState('');
  const [checkedFan, setCheckFan] = useState(false);
  const [checkedBulb, setCheckBulb] = useState(false);
  const [checkedMode, setCheckMode] = useState(false);
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
      console.log(res);
      console.log(res.payload);
      if (res.type === 'setUpDisplay') setDisplay(res.payload);
      else if (res.type === 'setUpAuto') setAuto(res.payload);
      else {
        switch (res.payload) {
          case 'OK, Fan On\n':
            setCheckFan(true);
            break;
          case 'OK, Fan Off\n':
            setCheckFan(false);
            break;
          case 'OK, Bulb On\n':
            setCheckBulb(true);
            break;
          case 'OK, Bulb Off\n':
            setCheckBulb(false);
            break;
          default:
            break;
        }
      }
    },
  });

  const handleInput = (setValue) => (event) => setValue(event.target.value);

  const handleSendMessage = (action) => () => {
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify(action));
    }
  };

  const handleSendMessageWhenSwitch = (onAction, offAction) => (event) => {
    if (wsRef.current) {
      const { checked } = event.target;
      wsRef.current.send(JSON.stringify(checked ? onAction() : offAction()));
    }
  };

  const handleMode = (event) => {
    setCheckMode(event.target.checked);
  };

  return (
    <DetailRoot>
      <TempWrapper>
        <Temperature
          id="display"
          label="Environment Temperature"
          defaultValue={display}
          type="number"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
      </TempWrapper>
      <DetailItem>
        <span>fanSpeed:</span>
        <span>{fanSpeed}</span>
      </DetailItem>
      <DetailItem>
        <span>bulbLight:</span>
        <span>{bulbLight}</span>
      </DetailItem>
      <Controller checkedMode={checkedMode} handleMode={handleMode}>
        <Controller.Auto
          temp={temp}
          setTemp={setTemp}
          handleTempSetUp={handleSendMessage(tempSetup(temp))}
        />
        <div>{auto}</div>
        <Controller.Manual
          fan={fan}
          bulb={bulb}
          checkedFan={checkedFan}
          checkedBulb={checkedBulb}
          handleFan={handleInput(setFan)}
          handleBulb={handleInput(setBulb)}
          handleFanSetUp={handleSendMessage(fanSetup(fan))}
          handleBulbSetUp={handleSendMessage(bulbSetup(bulb))}
          handleFanSwitch={handleSendMessageWhenSwitch(fanOn, fanOff)}
          handleBulbSwitch={handleSendMessageWhenSwitch(bulbOn, bulbOff)}
        />
        <div>{manual}</div>
      </Controller>
      <div>
        <button type="button" onClick={handleSendMessage(dataRead())}>DataRead</button>
        <button type="button" onClick={handleSendMessage(configFileRead())}>ConfigFileRead</button>
      </div>
    </DetailRoot>
  );
}

MCUDetail.propTypes = {
  match: pt.match.isRequired,
};
