import styled from "styled-components";
import { AlertProps } from "./interfaces";

export const AppContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const Button = styled.button<{ variant: string }>`
  height: 48px;
  width: 200px;
`;

export const AlertsContainer = styled.div`
  position: absolute;
  right: 30%;
  top: 25%;
  padding:10px 20px;
  overflow-y: auto;
  max-height: calc(100vh - 100px);
`;

export const AlertContainer = styled.div<Partial<AlertProps>>`
  padding: 10px 20px;
  background: #fff;
  margin-top: ${(p) => p.gutterTop && "10px"};
  margin-bottom: ${(p) => p.gutterBottom && "10px"};
  min-width: 300px;
  height: 80px;
  border-radius: 4px;
  padding-top: 20px;
  border:0;
  border-left-width:3px;
  border-style:solid;
  border-left-color:${(p) => p.theme.colors[`message_${p.type}`]};
  position: relative;
  box-shadow: 0px 0px 10px 0 rgba(0,0,0,0.4);
`;

export const ActionIconContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;
