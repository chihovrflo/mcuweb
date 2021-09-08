import React, { useContext } from 'react';
import propTypes from 'prop-types';
import ControllContext from './context';
import { FunctionWrapper, DetailInput, MsgBox } from './styled';

export default function Auto({
  temp,
  setTemp,
  handleTempSetUp,
  auto,
}) {
  const { ctrlComponent } = useContext(ControllContext);
  const handleTemp = (event) => setTemp(event.target.value);
  return ctrlComponent === 'Auto' ? (
    <>
      <FunctionWrapper>
        <DetailInput label="Temp" value={temp} onChange={handleTemp} />
        <button type="button" onClick={handleTempSetUp}>Send</button>
      </FunctionWrapper>
      <MsgBox>
        {auto}
      </MsgBox>
    </>
  ) : null;
}

Auto.propTypes = {
  temp: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  setTemp: propTypes.func.isRequired,
  handleTempSetUp: propTypes.func.isRequired,
  auto: propTypes.string.isRequired,
};
