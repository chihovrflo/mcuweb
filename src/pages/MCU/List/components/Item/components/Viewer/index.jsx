import React, { useContext } from 'react';
import propTypes from 'prop-types';
import ItemContext from '../../context';
import {
  ViewerRoot,
  ItemRow,
  ItemKey,
  ItemValue,
  ItemLink,
} from './styled';

export default function Viewer({ name, host, port }) {
  const { isEdit } = useContext(ItemContext);
  return !isEdit && (
    <ViewerRoot>
      <ItemLink to={`/mcu/host/${host}/port/${port}`}>
        <ItemRow>
          <ItemKey>name:</ItemKey>
          <ItemValue>{name}</ItemValue>
        </ItemRow>
        <ItemRow>
          <ItemKey>host:</ItemKey>
          <ItemValue>{host}</ItemValue>
        </ItemRow>
        <ItemRow>
          <ItemKey>port:</ItemKey>
          <ItemValue>{port}</ItemValue>
        </ItemRow>
      </ItemLink>
    </ViewerRoot>
  );
}

Viewer.propTypes = {
  name: propTypes.string.isRequired,
  host: propTypes.string.isRequired,
  port: propTypes.string.isRequired,
};
