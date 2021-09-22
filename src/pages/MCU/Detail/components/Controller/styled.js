import styled from 'styled-components';
import {
  Switch,
  TextField,
  FormControlLabel,
} from '@material-ui/core';

export const ControllerRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const DetailInput = styled(TextField)``;
export const FunctionWrapper = styled.div`
  display: flex;
`;
export const SwitchLabel = styled(FormControlLabel)``;
export const SwitchGroup = styled.div``;
export const SwitchItem = styled(Switch)``;
export const MsgBox = styled.div`
  height: 40px; 
  display: flex;
  justify-content: center;
  align-items: center;
`;
