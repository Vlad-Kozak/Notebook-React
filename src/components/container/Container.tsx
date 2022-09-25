import s from "./Container.module.css";

interface IContainerProps {
  children: JSX.Element | JSX.Element[] | string | string[];
}

export function Container({ children }: IContainerProps) {
  return <div className={s.container}>{children}</div>;
}
