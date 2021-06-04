import React, { useState } from 'react';
import pt from 'lib/propTypes';
import ControllContext from './context';
import Auto from './Auto';
import Manual from './Manual';
import {
  TypographyElement,
  GridElement,
  AntSwitch,
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
      <TypographyElement component="div">
        <GridElement component="label" container alignItems="center" spacing={1}>
          <GridElement item>Auto</GridElement>
          <GridElement item>
            <AntSwitch onChange={handleMode} name="checkedMode" />
          </GridElement>
          <GridElement item>Manual</GridElement>
        </GridElement>
      </TypographyElement>
      {children}
    </ControllContext.Provider>
  );
}

Controller.propTypes = {
  children: pt.children.isRequired,
};

Controller.Auto = Auto;
Controller.Manual = Manual;
export default Controller;
