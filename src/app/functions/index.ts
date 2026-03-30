import autoNumber from './autoGenerateNumber'
import {client} from './axiosClient'
import { urlServer, urlSocketIo, fullUrlServer } from './base_url'
import { checkingValidDate } from './checkingValidDate'
import {checkingValidImageInput, checkingValidDocumentInput} from './checkingValidFileInput'
import { checkInputAutoNumberFormat } from './checkInputAutoNoFormat'
import { ConvertDateTime } from './convertDateTime'
import realDateFormatValue from './dateFormatValue'
import { forceLogout } from './forceLogout'
import format from './format'
import { functionCheckingHORoutesAPI } from './functionCheckingHORoutesAPI'
import { functionCheckComTypeRoutesAPI } from './functionCheckingRoutesAPI'
import generateCode from './generateCode'
import { handleDownloadFile } from './handleDownloadFile'
import numberToWords from './numberToString'
import { UseReactQuery, GeneralReactQuery } from './reactQuery'
import socket from './socket'
import { getBranchUserSession, handleSocketJoinRoom, SocketListenerGlobalReactQuery, SocketListenerRoomReactQuery, SocketListenerGlobalUseState, SocketListenerRoomUseState, SocketListenerRoomReactQueryWithUseState, SocketListenerRoomReactQueryFormikPropsAndUseState } from './socketListener'
import { fieldString1, fieldString3, fieldString5, fieldString15, fieldString25, fieldString50, fieldString150, fieldString255 } from './stringValidationSchemas'
import { updateUniqueCodeInItemDetail } from './updateUniqueCodeInItemDetail'
import { userCurrentDateTime } from './userCurrentDateTime'

export {
  autoNumber,
  client,
  urlServer,
  urlSocketIo,
  fullUrlServer,
  checkingValidDate,
  checkInputAutoNumberFormat,
  ConvertDateTime,
  realDateFormatValue,
  forceLogout,
  format,
  functionCheckingHORoutesAPI,
  functionCheckComTypeRoutesAPI,
  generateCode,
  handleDownloadFile,
  numberToWords,
  UseReactQuery,
  GeneralReactQuery,
  socket,
  getBranchUserSession,
  handleSocketJoinRoom,
  SocketListenerGlobalReactQuery,
  SocketListenerRoomReactQuery,
  SocketListenerGlobalUseState,
  SocketListenerRoomUseState,
  SocketListenerRoomReactQueryWithUseState,
  SocketListenerRoomReactQueryFormikPropsAndUseState,
  fieldString1,
  fieldString3,
  fieldString5,
  fieldString15,
  fieldString25,
  fieldString50,
  fieldString150,
  fieldString255,
  updateUniqueCodeInItemDetail,
  userCurrentDateTime,
  checkingValidImageInput,
  checkingValidDocumentInput
};
