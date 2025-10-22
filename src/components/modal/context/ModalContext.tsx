import { createContext } from "react";

export interface ModalsContextProps {
  open: (Component: React.ComponentType<any>, props: any) => void;
  close: (Component: React.ComponentType<any>) => void;
  pop: () => void;
}

export interface ModalType {
  Component: React.ComponentType<any>;
  props: any;
}

export const ModalsDispatchContext = createContext<ModalsContextProps>({
  open: () => {},
  close: () => {},
  pop: () => {},
});
export const ModalsStateContext = createContext<ModalType[]>([]);
