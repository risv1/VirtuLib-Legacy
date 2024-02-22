import { ReactNode } from "react";
import styles from "../../styles/components/modal.module.css";
import { X } from "lucide-react";
import { useModal } from "../../layouts/ModalContext";
import { useNavigate } from "react-router";

const Modal = (props: {
  open: boolean;
  children: ReactNode;
}) => {
  const { onClose } = useModal();
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate("..");
  };

  const handleContent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    props.open && (
      <div className={styles.modal} onClick={handleClose}>
        <div className={styles.modal_content} onClick={handleContent}>
          <div className={styles.close} onClick={handleClose}>
            <X />
          </div>
          {props.children}
        </div>
      </div>
    )
  );
};

export default Modal;
