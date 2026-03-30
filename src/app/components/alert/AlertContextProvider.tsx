import { createContext, FC, ReactNode, useCallback, useReducer } from "react";
import { AlertAction, AlertActionKind, AlertContext, AlertState } from "./interfaces";
import { AlertsContainer } from "./styled.components";
import { KTSVG } from "../../../_metronic";

export const AlertMessengerContext = createContext<AlertContext>({} as AlertContext);

const AlertReducer = (state: AlertState, action: AlertAction) => {
  switch (action.type) {
    case AlertActionKind.ADD_SUCCESS:
      return {
        ...state,
        messages: [{ type: "success", ...action.payload }, ...state.messages].slice(0, state.noOfMessages),
      };
    case AlertActionKind.ADD_ERROR:
      return {
        ...state,
        messages: [{ type: "error", ...action.payload }, ...state.messages].slice(0, state.noOfMessages),
      };
    case AlertActionKind.REMOVE_MESSAGE:
      return { ...state, messages: state.messages.filter((message) => message.id !== action.payload.id) };
  }
};

export const AlertContextProvider: FC<{
  children: ReactNode;
  noOfMessages?: number;
  autoHideTimeout?: number;
  autoHideError?: boolean;
}> = ({ children, noOfMessages = 5, autoHideTimeout = 6000, autoHideError = true }) => {
  const [state, dispatch] = useReducer(AlertReducer, { messages: [], noOfMessages });

  const addSuccessMessage = useCallback(
    (data: any) => {
      const id = Date.now();
      dispatch({ type: AlertActionKind.ADD_SUCCESS, payload: { id, ...data } });
      setTimeout(() => {
        dispatch({ type: AlertActionKind.REMOVE_MESSAGE, payload: { id } });
      }, autoHideTimeout);
    },
    [dispatch, autoHideTimeout]
  );

  const addErrorMessage = useCallback(
    (data: any) => {
      const id = Date.now();
      dispatch({ type: AlertActionKind.ADD_ERROR, payload: { id, ...data } });
      if (autoHideError) {
        setTimeout(() => {
          dispatch({ type: AlertActionKind.REMOVE_MESSAGE, payload: { id } });
        }, autoHideTimeout);
      }
    },
    [dispatch, autoHideError, autoHideTimeout]
  );

  const removeMessage = useCallback(
    (id: any) => {
      dispatch({ type: AlertActionKind.REMOVE_MESSAGE, payload: { id } });
    },
    [dispatch]
  );

  return (
    <AlertMessengerContext.Provider value={{ state, addSuccessMessage, addErrorMessage, removeMessage }}>
      {children}
      <AlertsContainer>
        {state.messages.map(({ type, title, message, id }) => (
          <div className="card card-custom shadow bg-light-dark" key={`alert__message__${id}`}>
            <div className="card-header ribbon ribbon-top ribbon-vertical">
              <div className={`ribbon-label ${type === 'success' ? 'bg-success' : 'bg-danger'}`}>
                { type === 'success'
                  ? <KTSVG path="/media/icons/duotune/arrows/arr012.svg" className="svg-icon-white svg-icon-2hx" />
                  : <KTSVG path="/media/icons/duotune/arrows/arr011.svg" className="svg-icon-white svg-icon-2hx" />
                }
              </div>
              <div className="card-title">{title}</div>
            </div>
            <div className="card-body">{message}</div>
          </div>
        ))}
      </AlertsContainer>
    </AlertMessengerContext.Provider>
  );
};
