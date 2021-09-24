import React, { useContext } from 'react';
import propTypes from 'prop-types';
import ControllContext from './context';
import { FunctionWrapper, DetailInput } from './styled';

export default function Auto({
  temp,
  setTemp,
  handleTempSetUp,
}) {
  const { mode } = useContext(ControllContext);
  const handleTemp = (event) => setTemp(event.target.value);
  return mode === '1\n' && (
    <>
      <FunctionWrapper>
        <DetailInput label="Temp" value={temp} onChange={handleTemp} />
        <button type="button" onClick={handleTempSetUp}>Send</button>
      </FunctionWrapper>
    </>
  );
}

Auto.propTypes = {
  temp: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  setTemp: propTypes.func.isRequired,
  handleTempSetUp: propTypes.func.isRequired,
};
