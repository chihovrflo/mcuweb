import React, { useState, useEffect } from 'react';
import { getMCUList } from 'apis/mcu/list';
import MCUItem from './components/Item';
import {
  ListRoot,
  ListContainer,
} from './styled';

export default function MCUList() {
  const [mcuList, setMCUList] = useState([]);
  useEffect(async () => {
    const mcu = await getMCUList();
    setMCUList(mcu.data.list);
  }, []);
  return (
    <ListRoot>
      <ListContainer>
        <h2>Chamber List</h2>
        {mcuList.map(({ name, host, port }) => (
          <MCUItem key={name}>
            <MCUItem.Editor
              name={name}
              host={host}
              port={port}
            />
            <MCUItem.Viewer
              name={name}
              host={host}
              port={port}
            />
          </MCUItem>
        ))}
      </ListContainer>
    </ListRoot>
  );
}
