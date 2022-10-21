import { MouseEventHandler, useEffect } from "react";
import { createPortal } from "react-dom";
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
    <div
      className="fixed inset-0 flex items-center justify-center bg-slate-800 bg-opacity-30"
      onClick={handleBackdropClick}
    >
      <div className="relative p-10 bg-slate-500 rounded-lg">
        {children}
        <div className="absolute top-2 right-2">
          <IconButton handleClick={handleClickCloseModal}>
            <CloseIcon width="30" height="30" />
          </IconButton>
        </div>
      </div>
    </div>,
    document.querySelector("#modal-root") as HTMLElement
  );
}
