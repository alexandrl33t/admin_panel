import styled from 'styled-components';
import {Button, Input, Menu} from 'antd';
import Password from "antd/es/input/Password";

export const ButtonStyled: typeof Button = styled(Button)`
  border: 1px solid #818181;
  background: transparent;
  font-family: 'Roboto', sans-serif;
  font-size: 1.2em;
  border-radius: 5px;
  transition: .1s;
`;

export const InputStyled: typeof Input = styled(Input)`
  display: block;
  border-radius: 5px;
  background: transparent;
  border: 2px solid white;
`;

export const PasswordStyled: typeof Password = styled(InputStyled)`
`;

export const MenuStyled: typeof Menu = styled(Menu)`
  display: block;
  border-radius: 9px;
  border: 2px solid white;
  background: transparent;
  margin-left: -2px;
  margin-right: 216px;
  color: #fdfdfd
`;

