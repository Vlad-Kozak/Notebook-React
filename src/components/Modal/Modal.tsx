import { MouseEventHandler, useEffect } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";
import { ReactComponent as CloseIcon } from "../../images/close.svg";
import { IconButton } from "../IconButton/IconButton";

interface IModalProps {
  handleClickCloseModal: MouseEventHandler;
  children: JSX.Element;
}

export function Modal({ handleClickCloseModal, children }: IModalProps) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });

  const handleKeydown = (e: any) => {
    if (e.code === "Escape") {
      handleClickCloseModal(e);
    }
  };

  const handleBackdropClick = (e: any) => {
    if (e.target === e.currentTarget) {
      handleClickCloseModal(e);
    }
  };

  return createPortal(
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.modal}>
        {children}
        <div className={s.close}>
          <IconButton handleClick={handleClickCloseModal}>
            <CloseIcon width="30" height="30" />
          </IconButton>
        </div>
      </div>
    </div>,
    document.querySelector("#modal-root") as HTMLElement
  );
}
