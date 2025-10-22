import { useContext } from "react";
import { ModalsDispatchContext, ModalsStateContext } from "./ModalContext";

const Modals = () => {
  const openedModals = useContext(ModalsStateContext);
  const { close } = useContext(ModalsDispatchContext);

  return (
    <>
      {openedModals.map((modal, index) => {
        const { Component, props } = modal;
        const { onSubmit, ...restProps } = props;

        const onClose = () => {
          close(Component);
        };

        return (
          <Component
            {...restProps}
            key={index}
            onClose={onClose}
            onSubmit={onSubmit}
          />
        );
      })}
    </>
  );
};

export default Modals;
