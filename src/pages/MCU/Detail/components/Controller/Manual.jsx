import React, { useContext } from 'react';
import propTypes from 'prop-types';
import ControllContext from './context';
import {
  FunctionWrapper,
  SwitchItem,
  SwitchLabel,
  DetailInput,
} from './styled';

export default function Manual({
  fan,
  bulb,
  handleFan,
  handleBulb,
  checkedFan,
  checkedBulb,
  handleFanSwitch,
  handleBulbSwitch,
  handleFanSetUp,
  handleBulbSetUp,
}) {
  const ctrlComponent = useContext(ControllContext);
  console.log(ctrlComponent);
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
        <button type="button" onClick={handleFanSetUp}>Send</button>
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
        <button type="button" onClick={handleBulbSetUp}>Send</button>
      </FunctionWrapper>
    </>
  );
}

Manual.propTypes = {
  fan: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  bulb: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  handleFan: propTypes.func.isRequired,
  handleBulb: propTypes.func.isRequired,
  checkedFan: propTypes.bool.isRequired,
  checkedBulb: propTypes.bool.isRequired,
  handleFanSwitch: propTypes.func.isRequired,
  handleBulbSwitch: propTypes.func.isRequired,
  handleFanSetUp: propTypes.func.isRequired,
  handleBulbSetUp: propTypes.func.isRequired,
};
