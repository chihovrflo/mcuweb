import React, { useState, useContext } from 'react';
import propTypes from 'prop-types';
import ItemContext from '../../context';
import {
  EditorRoot,
  ItemRow,
  ItemKey,
  ItemValue,
} from './styled';

export default function Editor({ name, host, port }) {
  const [editName, setEditName] = useState(name || '');
  const [editHost, setEditHost] = useState(host || '');
  const [editPort, setEditPort] = useState(port || '');
  const { isEdit } = useContext(ItemContext);
  return isEdit && (
    <EditorRoot>
      <ItemRow>
        <ItemKey>name:</ItemKey>
        <ItemValue value={editName} onChange={(e) => setEditName(e.target.value)} />
      </ItemRow>
      <ItemRow>
        <ItemKey>host:</ItemKey>
        <ItemValue value={editHost} onChange={(e) => setEditHost(e.target.value)} />
      </ItemRow>
      <ItemRow>
        <ItemKey>port:</ItemKey>
        <ItemValue value={editPort} onChange={(e) => setEditPort(e.target.value)} />
      </ItemRow>
    </EditorRoot>
  );
}

Editor.propTypes = {
  name: propTypes.string.isRequired,
  host: propTypes.string.isRequired,
  port: propTypes.string.isRequired,
};
