import styled from 'styled-components';
import {
  Card,
  CardActions,
  Button,
  CardContent,
} from '@material-ui/core';

export const ItemRoot = styled(Card)`
  margin: 20px 0;
`;

export const ButtonGroup = styled(CardActions)``;

export const ItemButton = styled(Button)``;

export const Message = styled.div`
  padding: 0 24px;
  color: red;
`;

export const ItemContent = styled(CardContent)`
  padding: ${({ type, isEdit }) => (type === 'add' && !isEdit ? '0px' : 'auto')}
`;
