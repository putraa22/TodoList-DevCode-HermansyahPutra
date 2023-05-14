import { createContext } from "react";
import { TypeModalContext } from "../../types/Modal/ModalType";

const ModalContext = createContext<TypeModalContext>({} as TypeModalContext);

export default ModalContext;
