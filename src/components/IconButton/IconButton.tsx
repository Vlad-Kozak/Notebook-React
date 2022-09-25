import { MouseEventHandler } from "react";
import s from "./IconButton.module.css";

interface IconButtonProps {
  handleClick: MouseEventHandler;
  children: JSX.Element;
}

export function IconButton({ handleClick, children }: IconButtonProps) {
  return (
    <button className={s.button} onClick={handleClick}>
      {children}
    </button>
  );
}
