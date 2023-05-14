import React, {
  FC,
  memo,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { TypeModalContext } from "../../types/Modal/ModalType";
import ModalContext from "./modalContext";

const ModalContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState<boolean>(false);
  const [modalChangeChildrenElement, setModalChangeChildrenElement] =
    useState<boolean>(false);
  const modalOnHandler = useCallback(() => setModal(() => true), []);
  const modalOffHandler = useCallback(() => setModal(() => false), []);
  const modalChangeChildrenElementOn = useCallback(
    () => setModalChangeChildrenElement(() => true),
    [],
  );
  const modalChangeChildrenElementOff = useCallback(
    () => setModalChangeChildrenElement(() => false),
    [],
  );
  const ModalContextValue: TypeModalContext = useMemo(
    () => ({
      isModalVisible: modal,
      isModalChangeChildrenElement: modalChangeChildrenElement,
      setModalOn: modalOnHandler,
      setModalOff: modalOffHandler,
      setModalChangeChildrenElementOn: modalChangeChildrenElementOn,
      setModalChangeChildrenElementOff: modalChangeChildrenElementOff,
    }),
    [
      modal,
      modalChangeChildrenElement,
      modalOnHandler,
      modalOffHandler,
      modalChangeChildrenElementOff,
      modalChangeChildrenElementOn,
    ],
  );
  return (
    <ModalContext.Provider value={ModalContextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export default memo(ModalContextProvider);
