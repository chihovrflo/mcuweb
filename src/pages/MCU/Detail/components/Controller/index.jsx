import React, { useState } from 'react';
import propTypes from 'prop-types';
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
  checkedMode,
  handleMode,
}) {
  const [ctrlComponent, setCtrlComponent] = useState('auto');
  return (
    <ControllContext.Provider value={{ ctrlComponent, setCtrlComponent }}>
      <TypographyElement component="div">
        <GridElement component="label" container alignItems="center" spacing={1}>
          <GridElement item>Auto</GridElement>
          <GridElement item>
            <AntSwitch checked={checkedMode} onChange={handleMode} name="checkedMode" />
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
  checkedMode: propTypes.bool.isRequired,
  handleMode: propTypes.func.isRequired,
};

Controller.Auto = Auto;
Controller.Manual = Manual;
export default Controller;
