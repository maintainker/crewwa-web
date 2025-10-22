import { type ComponentProps, type FunctionComponent, useContext } from "react";
import { ModalsDispatchContext, ModalsStateContext } from "../components";

const useModal = () => {
  const { open, close, pop } = useContext(ModalsDispatchContext);
  const modals = useContext(ModalsStateContext);

  const hasModal = modals.length > 0;

  const openModal = <T extends FunctionComponent<any>>(
    Component: T,
    props: ComponentProps<T>
  ) => {
    open(Component, props);
  };

  const closeModal = <T extends FunctionComponent<any>>(Component: T) => {
    close(Component);
  };

  const closeLastModal = () => {
    pop();
  };

  return {
    hasModal,
    openModal,
    closeModal,
    closeLastModal,
  };
};

export default useModal;
