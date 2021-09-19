import React, { useState, useEffect } from 'react';
import { getMCUList } from 'apis/mcu/list';
import {
  ListRoot,
  ListContainer,
  ListItem,
  ListLink,
} from './styled';

export default function MCUList() {
  const [mcuList, setMCUList] = useState([]);
  useEffect(async () => {
    const mcu = await getMCUList();
    setMCUList(mcu.list);
  }, []);
  return (
    <ListRoot>
      <ListContainer>
        <h2>Chamber List</h2>
        {mcuList.map(({ name, host, port }) => (
          <ListItem key={name}>
            <ListLink to={`/mcu/host/${host}/port/${port}`}>
              <div>{`name: ${name}`}</div>
              <div>{`host: ${host}`}</div>
              <div>{`port: ${port}`}</div>
            </ListLink>
          </ListItem>
        ))}
      </ListContainer>
    </ListRoot>
  );
}
