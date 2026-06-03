import ReactModal from "react-modal";
import css from "./Modal.module.css";

ReactModal.setAppElement("#root");

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <ReactModal
      isOpen
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      className={css.modal}
      overlayClassName={css.backdrop}
      bodyOpenClassName={css.bodyOpen}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;