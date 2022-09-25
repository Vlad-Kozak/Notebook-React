import { MouseEventHandler } from "react";
import s from "./TextButton.module.css";

interface ITextButtonProps {
  handleClick: MouseEventHandler;
  children: string;
}

export function TextButton({ handleClick, children }: ITextButtonProps) {
  return (
    <button className={s.button} onClick={handleClick}>
      {children}
    </button>
  );
}
