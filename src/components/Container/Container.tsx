interface IContainerProps {
  children: JSX.Element | JSX.Element[] | string | string[];
}

export function Container({ children }: IContainerProps) {
  return <div className="w-[1280px] mx-auto py-2 px-10">{children}</div>;
}
