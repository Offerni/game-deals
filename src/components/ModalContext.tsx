"use client";

import { createContext, Dispatch, useReducer } from "react";
import { IModalReducerAction, IModalReducerState } from "types";
import Modal from "./Modal";

export const modalReducer = (
  state: IModalReducerState,
  action: IModalReducerAction
) => {
  switch (action.type) {
    case "open":
      return {
        ...state,
        open: true,
        originId: action.originId,
        contentType: action.contentType,
      };
    case "close":
      return { ...state, open: false };
    default:
      return state;
  }
};

type Props = {
  children: JSX.Element;
};

export const ModalContext = createContext<Dispatch<IModalReducerAction>>(
  () => {}
);
export const ModalContextProvider = (props: Props) => {
  const [state, dispatch] = useReducer(modalReducer, {
    open: false,
  });
  return (
    <ModalContext.Provider value={dispatch}>
      <Modal state={state} />
      {props.children}
    </ModalContext.Provider>
  );
};
