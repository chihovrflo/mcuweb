import React, { useState, useEffect } from 'react';
import {
  getMCUList,
  addMCUList,
  deleteMCUList,
  updateMCUList,
} from 'apis/mcu/list';
import MCUItem from './components/Item';
import {
  ListRoot,
  ListContainer,
} from './styled';

export default function MCUList() {
  const [mcuList, setMCUList] = useState([]);
  useEffect(async () => {
    try {
      const mcu = await getMCUList();
      setMCUList(mcu.data.list);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const addItem = async ({ name, host, port }) => {
    try {
      const mcu = await addMCUList({ name, host, port });
      setMCUList(mcu.data.list);
    } catch (e) {
      console.log(e);
    }
  };

  const updateItem = (id) => async ({
    name,
    host,
    port,
  }) => {
    try {
      const mcu = await updateMCUList({
        id,
        name,
        host,
        port,
      });
      setMCUList(mcu.data.list);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteItem = (id) => async () => {
    try {
      const mcu = await deleteMCUList({ id });
      setMCUList(mcu.data.list);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ListRoot>
      <ListContainer>
        <h2>Chamber List</h2>
        {mcuList.map(({
          id,
          name,
          host,
          port,
        }) => (
          <MCUItem
            key={id}
            type="edit"
            name={name}
            host={host}
            port={port}
            updateItem={updateItem(id)}
            deleteItem={deleteItem(id)}
          >
            <MCUItem.Editor />
            <MCUItem.Viewer
              name={name}
              host={host}
              port={port}
            />
          </MCUItem>
        ))}
        <MCUItem
          type="add"
          addItem={addItem}
        >
          <MCUItem.Editor />
        </MCUItem>
      </ListContainer>
    </ListRoot>
  );
}
