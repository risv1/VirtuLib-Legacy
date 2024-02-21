import { ReactNode } from "react";
import styles from "../../styles/components/modal.module.css";
import { X } from "lucide-react";
import { useModal } from "../../layouts/ModalContext";

const Modal = (props: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {

    const {onClose} = useModal();

    const handleContent = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        onClose()
    }
    
  return (
    props.open && (
      <div className={styles.modal} onClick={props.onClose}>
        <div className={styles.modal_content} onClick={handleContent}>
          <div onClick={props.onClose} className={styles.close}>
            <X />
          </div>
          {props.children}
        </div>
      </div>
    )
  );
};

export default Modal;