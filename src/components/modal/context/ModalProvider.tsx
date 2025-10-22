import { type ReactNode, useMemo, useState } from "react";
import {
  ModalsDispatchContext,
  ModalsStateContext,
  type ModalType,
} from "./ModalContext";
import Modals from "./Modals";

interface Props {
  children: ReactNode;
}

const ModalsProvider: React.FC<Props> = ({ children }: Props) => {
  const [openedModals, setOpenedModals] = useState<ModalType[]>([]);

  const open = (Component: React.ComponentType<any>, props: any) => {
    setOpenedModals((modals) => [...modals, { Component, props }]);
  };

  const close = (Component: React.ComponentType<any>) => {
    setOpenedModals((modals) =>
      modals.filter((modal) => modal.Component !== Component)
    );
  };

  const pop = () => {
    setOpenedModals((modals) => modals.slice(0, modals.length - 1));
  };

  const dispatch = useMemo(() => ({ open, close, pop }), []);

  return (
    <ModalsStateContext.Provider value={openedModals}>
      <ModalsDispatchContext.Provider value={dispatch}>
        {children}
        <Modals />
      </ModalsDispatchContext.Provider>
    </ModalsStateContext.Provider>
  );
};

export default ModalsProvider;
