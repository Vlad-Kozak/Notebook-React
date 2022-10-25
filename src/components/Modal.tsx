import { MouseEventHandler, useEffect } from "react";
import { createPortal } from "react-dom";
import { BiXCircle } from "react-icons/bi";

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
      className="fixed inset-0 flex items-center justify-center bg-slate-800/30 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative p-10 bg-sky-600 rounded-lg">
        {children}
        <div
          className="absolute top-2 right-2 transition-transform hover:rotate-90 focus:rotate-90"
          onClick={handleClickCloseModal}
        >
          <BiXCircle className="w-7 h-7 fill-white" />
        </div>
      </div>
    </div>,
    document.querySelector("#modal-root") as HTMLElement
  );
}
