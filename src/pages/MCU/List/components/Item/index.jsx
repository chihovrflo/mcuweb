import React, { useState } from 'react';
import pt from 'lib/propTypes';
import ItemContext from './context';
import Editor from './components/Editor';
import Viewer from './components/Viewer';
import {
  ItemRoot,
  ItemContent,
  ButtonGroup,
  ItemButton,
} from './styled';

function Item({ children }) {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <ItemContext.Provider value={{ isEdit }}>
      <ItemRoot>
        <ItemContent>
          {children}
        </ItemContent>
        {!isEdit && (
          <ButtonGroup>
            <ItemButton onClick={() => setIsEdit((prev) => !prev)}>Edit</ItemButton>
            <ItemButton>Delete</ItemButton>
          </ButtonGroup>
        )}
        {isEdit && (
          <ButtonGroup>
            <ItemButton onClick={() => setIsEdit((prev) => !prev)}>Confirm</ItemButton>
            <ItemButton>Cancel</ItemButton>
          </ButtonGroup>
        )}
      </ItemRoot>
    </ItemContext.Provider>
  );
}

Item.propTypes = {
  children: pt.children.isRequired,
};

Item.Editor = Editor;
Item.Viewer = Viewer;

export default Item;
