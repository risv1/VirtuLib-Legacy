import { createContext, useContext, useState } from "react";

interface ModalContextProps {
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
}

const ModalContext = createContext({
    open: false,
    onClose: () => {},
    onOpen: () => {},
} as ModalContextProps);

export const ModalProvider = (props: { children: JSX.Element }) => {
    
    const [open, setOpen] = useState(true);

    const onClose = () => {
        setOpen(false);
    }

    const onOpen = () => {
        setOpen(true);
    }

    return (
        <ModalContext.Provider value={{ open, onClose, onOpen }}>
            {props.children}
        </ModalContext.Provider>
    );
}

export const useModal = () => {
    return useContext(ModalContext);
}