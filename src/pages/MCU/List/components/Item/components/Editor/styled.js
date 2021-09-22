import styled from 'styled-components';
import {
  Input,
} from '@material-ui/core';

export const EditorRoot = styled.div`
  padding: 8px;
`;

export const ItemRow = styled.div`
  display: flex;
  height: 30px;
  line-height: 30px;
`;

export const ItemKey = styled.div`
  width: 80px;
`;

export const ItemValue = styled(Input)``;
