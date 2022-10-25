interface IContainerProps {
  children: JSX.Element | JSX.Element[] | string | string[];
}

export function Container({ children }: IContainerProps) {
  return <div className="ml-60 p-5">{children}</div>;
}
