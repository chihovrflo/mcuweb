import React, { useState } from 'react';
import {
  DetailInput,
  SwitchLabel,
  SwitchItem,
  FunctionWrapper,
} from 'pages/MCU/Detail/styled';

function Manual() {
  const [manual] = useState('');
  const [fan, setFan] = useState('');
  const [bulb, setBulb] = useState('');
  const [checkedFan, setCheckFan] = useState(false);
  const [checkedBulb, setCheckBulb] = useState(false);
  const handleFan = (event) => {
    setFan(event.target.value);
  };
  const handleBulb = (event) => {
    setBulb(event.target.value);
  };
  const handleFanSwitch = (event) => {
    if (wsRef.current) {
      const { checked } = event.target;
      wsRef.current.send(JSON.stringify(checked ? fanOn() : fanOff()));
    }
  };
  const handleBulbSwitch = (event) => {
    if (wsRef.current) {
      const { checked } = event.target;
      wsRef.current.send(JSON.stringify(checked ? bulbOn() : bulbOff()));
    }
  };
  return (
    <>
      <FunctionWrapper>
        <SwitchLabel
          control={(
            <SwitchItem
              checked={checkedFan}
              onChange={handleFanSwitch}
              name="checkedFan"
              color="primary"
            />
          )}
          label="Fan Switch"
        />
        <DetailInput label="Fan" value={fan} onChange={handleFan} />
        <button type="button" onClick={handleClick(fanSetup(fan))}>Send</button>
      </FunctionWrapper>
      <FunctionWrapper>
        <SwitchLabel
          control={(
            <SwitchItem
              checked={checkedBulb}
              onChange={handleBulbSwitch}
              name="checkedBulb"
              color="primary"
            />
          )}
          label="Bulb Switch"
        />
        <DetailInput label="Bulb" value={bulb} onChange={handleBulb} />
        <button type="button" onClick={handleClick(bulbSetup(bulb))}>Send</button>
      </FunctionWrapper>
      <div>
        {manual}
      </div>
    </>
  );
}
function Auto() {
  const [temp, setTemp] = useState('');
  const [auto, setAuto] = useState('');
  const handleTemp = (event) => {
    setTemp(event.target.value);
  };
  return (
    <>
      <FunctionWrapper>
        <DetailInput label="Temp" value={temp} onChange={handleTemp} />
        <button type="button" onClick={handleClick(tempSetup(temp))}>Send</button>
      </FunctionWrapper>
      <div>
        {auto}
      </div>
    </>
  );
}
export default function Controller() {
  const [ctrlComponent, setCtrlComponent] = useState('auto');
  const changeToManual = () => setCtrlComponent('manual');
  const changeToAuto = () => setCtrlComponent('auto');
  const ComponentHandler = () => {
    if (ctrlComponent === 'manual') return <Manual />;
    return <Auto />;
  };
  return (
    <Tag>
      <ComponentHandler />
    </Tag>
  );
}
