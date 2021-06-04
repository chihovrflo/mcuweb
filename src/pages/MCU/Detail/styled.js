import styled from 'styled-components';
import {
  TextField,
} from '@material-ui/core';

export const DetailRoot = styled.div``;
export const TempWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const Temperature = styled(TextField)`
  & .MuiInputBase-input {
    width: 200px;
    text-align: center;
    font-size: 36px;
  }
`;
export const DetailItem = styled.div`
  height: 40px; 
  align-items: center;
  display: flex;
  justify-content: center;
`;
