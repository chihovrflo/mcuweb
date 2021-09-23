import React, { useContext } from 'react';
import ItemContext from '../../context';
import {
  EditorRoot,
  ItemRow,
  ItemKey,
  ItemValue,
} from './styled';

export default function Editor() {
  const {
    isEdit,
    editName,
    setEditName,
    editHost,
    setEditHost,
    editPort,
    setEditPort,
  } = useContext(ItemContext);
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
