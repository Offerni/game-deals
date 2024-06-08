"use client";

import { Fragment, useContext } from "react";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { ModalContext } from "./ModalContext";
import { IModalReducerState } from "types";
import { ModalContent } from "./ModalContent";

type Props = {
  state: IModalReducerState;
};

export const Modal = (props: Props) => {
  const dispatch = useContext(ModalContext);

  return (
    <Transition show={props.state.open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-50 inset-0 overflow-y-auto"
        open={props.state.open}
        onClose={() => dispatch({ type: "close" })}
      >
        <div className="flex items-center justify-center min-h-screen pt-2 px-2 pb-20 text-center sm:block sm:p-0 mt-6">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="dark:bg-gray-800 bg-white text-gray-500 dark:text-gray-400 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <ModalContent
                  contentType={props.state.contentType}
                  originId={props.state.originId}
                />
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-500 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 dark:text-gray-200 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => dispatch({ type: "close" })}
                >
                  Close
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
