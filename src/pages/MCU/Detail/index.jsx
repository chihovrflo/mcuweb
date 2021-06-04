import React, { useState } from 'react';
import useWebSocket from 'hooks/useWebSocket';
import pt from 'lib/propTypes';
import {
  tempSetup, fanOn, fanOff, fanSetup, bulbOn, bulbOff, bulbSetup, dataRead, configFileRead,
} from 'actions/mcu';
import {
  DetailInput,
  DetailRoot,
  Temperature,
  TempWrapper,
  DetailItem,
  SwitchLabel,
  SwitchItem,
  FunctionWrapper,
  GridElement,
  AntSwitch,
  TypographyElement,
} from './styled';

export default function MCUDetail({ match }) {
  const { port, host } = match.params;
  const [display, setDisplay] = useState('25');
  const [fanSpeed] = useState('unknown');
  const [bulbLight] = useState('unknown');
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

  const handleClick = (event) => () => {
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify(event));
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
      
      <TypographyElement component="div">
        <GridElement component="label" container alignItems="center" spacing={1}>
          <GridElement item>Auto</GridElement>
          <GridElement item>
            <AntSwitch checked={checkedMode} onChange={handleMode} name="checkedMode" />
          </GridElement>
          <GridElement item>Manual</GridElement>
        </GridElement>
      </TypographyElement>
      
      <div>
        <button type="button" onClick={handleClick(dataRead())}>DataRead</button>
        <button type="button" onClick={handleClick(configFileRead())}>ConfigFileRead</button>
      </div>
    </DetailRoot>
  );
}

MCUDetail.propTypes = {
  match: pt.match.isRequired,
};
