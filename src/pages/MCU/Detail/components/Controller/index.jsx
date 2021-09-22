import React, { useState } from 'react';
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
}) {
  const [ctrlComponent, setCtrlComponent] = useState('Auto');
  const handleMode = (event) => {
    setCtrlComponent(event.target.checked ? 'Manual' : 'Auto');
  };
  return (
    <ControllContext.Provider value={{ ctrlComponent }}>
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
};

Controller.Auto = Auto;
Controller.Manual = Manual;
export default Controller;
