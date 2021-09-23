import React from 'react';
import propTypes from 'prop-types';
import pt from 'lib/propTypes';
import ControllContext from './context';
import Auto from './Auto';
import Manual from './Manual';
import {
  ControllerRoot,
  SwitchGroup,
  SwitchItem,
} from './styled';

function Controller({
  children,
  handleChangeMode,
  mode,
}) {
  const handleMode = () => {
    handleChangeMode('ChangeMode');
  };
  console.log(mode);
  return (
    <ControllContext.Provider value={{ mode }}>
      <ControllerRoot>
        <SwitchGroup>
          Auto
          <SwitchItem onChange={handleMode} name="checkedMode" />
          Manual
        </SwitchGroup>
        {children}
      </ControllerRoot>
    </ControllContext.Provider>
  );
}

Controller.propTypes = {
  children: pt.children.isRequired,
  handleChangeMode: propTypes.func.isRequired,
  mode: propTypes.string.isRequired,
};

Controller.Auto = Auto;
Controller.Manual = Manual;
export default Controller;
