import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../helpers/hooks";

interface IPrivateRoute {
  children: JSX.Element;
  redirect: string;
}

export function PrivateRoute({
  children,
  redirect = "/authorization",
}: IPrivateRoute) {
  const isLoggedIn = useAppSelector((state) => state.root.auth.isLoggedIn);

  if (isLoggedIn) {
    return children;
  }

  return <Navigate to={redirect} replace={true} />;
}
