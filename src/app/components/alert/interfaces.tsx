// src/components/Alert/interfaces.ts

import { MouseEvent, ReactNode } from "react";

export enum MessageType {
  SUCCESS = "success",
  ERROR = "error"
};

export interface AlertProps {
  type?: MessageType;
  title: string;
  message?: string;
  gutterBottom?: boolean;
  gutterTop?: boolean;
  actionIcon?: ReactNode | boolean;
  onAction?: (e?: MouseEvent<HTMLButtonElement>) => void;
}

export interface Message {
  id: string;
  type: MessageType;
  title: string;
  message?: string;
}

export interface AlertState {
  messages: Message[];
  noOfMessages: number;
}

export enum AlertActionKind {
  ADD_SUCCESS = "ADD_SUCCESS",
  ADD_ERROR = "ADD_ERROR",
  REMOVE_MESSAGE = "REMOVE_MESSAGE",
}
export interface AlertAction {
  type: AlertActionKind;
  payload?: any;
}

export interface AlertContext {
  state: AlertState;
  addSuccessMessage: Function;
  addErrorMessage: Function;
  removeMessage: Function;
}
