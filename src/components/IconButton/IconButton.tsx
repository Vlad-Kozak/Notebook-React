import { MouseEventHandler } from "react";

interface IconButtonProps {
  handleClick: MouseEventHandler;
  children: JSX.Element;
}

export function IconButton({ handleClick, children }: IconButtonProps) {
  return (
    <button
      className="w-[30] h-[30] bg-transparent cursor-pointer transition-transform hover:scale-110 focus:scale-110"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
