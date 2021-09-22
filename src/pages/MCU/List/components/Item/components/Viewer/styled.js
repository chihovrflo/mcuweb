import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ViewerRoot = styled.div`
  padding: 8px;
  border-radius: 4px;
  :hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const ItemRow = styled.div`
  display: flex;
  height: 30px;
  line-height: 30px;
`;

export const ItemKey = styled.div`
  width: 80px;
`;

export const ItemValue = styled.div``;

export const ItemLink = styled(Link)`
  text-decoration: none;
`;
