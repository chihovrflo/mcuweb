import React, { useState } from 'react';
import useWebSocket from 'hooks/useWebSocket';
import pt from 'lib/propTypes';
import {
  tempSetup, fanOn, fanOff, fanSetup, bulbOn, bulbOff, bulbSetup, configFileRead, changeMode,
} from 'actions/mcu';
import {
  DetailRoot,
  Temperature,
  TempWrapper,
  DetailItem,
  GridElement,
  TypographyElement,
  ListElement,
  ListItemElement,
  ListItemTextElement,
} from './styled';
import Controller from './components/Controller';

export default function MCUDetail({ match }) {
  const { port, host } = match.params;
  const [display, setDisplay] = useState('25');
  const [fanSpeed, setFanSpeed] = useState('unknown');
  const [bulbLight, setBulbLight] = useState('unknown');
  const [temp, setTemp] = useState('');
  const [auto, setAuto] = useState('');
  const [manual, setManual] = useState('');
  const [config, setConfig] = useState('');
  const [fan, setFan] = useState('');
  const [bulb, setBulb] = useState('');
  const [checkedFan, setCheckFan] = useState(false);
  const [checkedBulb, setCheckBulb] = useState(false);
  const [mode, setMode] = useState('1');
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
      if (res.type === 'setUpDisplay') {
        const splitedMsg = res.payload.split(',');
        setDisplay(splitedMsg[0].split(':')[1]);
        setFanSpeed(splitedMsg[1].split(':')[1]);
        setBulbLight(splitedMsg[2].split(':')[1]);
        setMode(splitedMsg[3].split(':')[1]);
      } else if (res.type === 'setUpAuto') setAuto(res.payload);
      else if (res.type === 'setUpConfig') setConfig(res.payload);
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
            setManual(res.payload);
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

  const handleChangeMode = (action) => () => {
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

  return (
    <DetailRoot>
      <TempWrapper>
        <Temperature
          id="display"
          label="Environment Temperature"
          value={display}
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
      <Controller
        handleChangeMode={handleChangeMode(changeMode())}
        mode={mode}
      >
        <Controller.Auto
          temp={temp}
          setTemp={setTemp}
          handleTempSetUp={handleSendMessage(tempSetup(temp))}
          auto={auto}
        />
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
          manual={manual}
        />
      </Controller>
      <GridElement item xs={12} md={6}>
        <TypographyElement sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          ConfigFileRead
        </TypographyElement>
        <button type="button" onClick={handleSendMessage(configFileRead())}>check</button>
        <ListElement>
          {config.split(', ').map((setting) => (
            <ListItemElement key={setting}>
              <ListItemTextElement primary={setting} />
            </ListItemElement>
          ))}
        </ListElement>
      </GridElement>
    </DetailRoot>
  );
}

MCUDetail.propTypes = {
  match: pt.match.isRequired,
};
