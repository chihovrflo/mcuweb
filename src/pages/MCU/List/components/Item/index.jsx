import React, { useState } from 'react';
import propTypes from 'prop-types';
import pt from 'lib/propTypes';
import ItemContext from './context';
import Editor from './components/Editor';
import Viewer from './components/Viewer';
import {
  ItemRoot,
  ItemContent,
  ButtonGroup,
  ItemButton,
  Message,
} from './styled';

function Item({
  name,
  host,
  port,
  type,
  children,
  addItem,
  updateItem,
  deleteItem,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [editName, setEditName] = useState(name || '');
  const [editHost, setEditHost] = useState(host || '');
  const [editPort, setEditPort] = useState(port || '');
  const [message] = useState('');
  return (
    <ItemContext.Provider
      value={{
        isEdit,
        editName,
        setEditName,
        editHost,
        setEditHost,
        editPort,
        setEditPort,
      }}
    >
      <ItemRoot>
        <ItemContent type={type} isEdit={isEdit}>
          {
            React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  editName,
                  setEditName,
                  editHost,
                  setEditHost,
                  editPort,
                  setEditPort,
                });
              }
              return child;
            })
          }
        </ItemContent>
        <Message>{message}</Message>
        {!isEdit && type === 'add' && (
          <ButtonGroup>
            <ItemButton onClick={() => setIsEdit((prev) => !prev)}>Add new Item</ItemButton>
          </ButtonGroup>
        )}
        {!isEdit && type === 'edit' && (
          <ButtonGroup>
            <ItemButton onClick={() => setIsEdit((prev) => !prev)}>Edit</ItemButton>
            <ItemButton onClick={deleteItem}>Delete</ItemButton>
          </ButtonGroup>
        )}
        {isEdit && type === 'add' && (
          <ButtonGroup>
            <ItemButton
              onClick={() => {
                addItem({
                  name: editName,
                  host: editHost,
                  port: editPort,
                });
                setIsEdit((prev) => !prev);
              }}
            >
              Add
            </ItemButton>
            <ItemButton onClick={() => setIsEdit((prev) => !prev)}>Cancel</ItemButton>
          </ButtonGroup>
        )}
        {isEdit && type === 'edit' && (
          <ButtonGroup>
            <ItemButton
              onClick={() => {
                updateItem({
                  name: editName,
                  host: editHost,
                  port: editPort,
                });
                setIsEdit((prev) => !prev);
              }}
            >
              Confirm
            </ItemButton>
            <ItemButton onClick={() => setIsEdit((prev) => !prev)}>Cancel</ItemButton>
          </ButtonGroup>
        )}
      </ItemRoot>
    </ItemContext.Provider>
  );
}

Item.propTypes = {
  name: propTypes.string.isRequired,
  host: propTypes.string.isRequired,
  port: propTypes.string.isRequired,
  children: pt.children.isRequired,
  addItem: propTypes.func,
  updateItem: propTypes.func,
  deleteItem: propTypes.func,
  type: propTypes.oneOf(['add', 'edit']).isRequired,
};

Item.defaultProps = {
  addItem: () => {},
  updateItem: () => {},
  deleteItem: () => {},
};

Item.Editor = Editor;
Item.Viewer = Viewer;

export default Item;
