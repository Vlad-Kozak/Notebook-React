import { MouseEventHandler } from "react";

interface ITextButtonProps {
  handleClick: MouseEventHandler;
  children: string;
}

export function TextButton({ handleClick, children }: ITextButtonProps) {
  return (
    <button
      className="w-40 py-2 rounded-lg bg-slate-500 font-medium text-white cursor-pointer transition-colors hover:bg-slate-700 focus:bg-slate-700"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
