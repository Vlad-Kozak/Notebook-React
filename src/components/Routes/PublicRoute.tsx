import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../helpers/hooks";

interface IPublicRoute {
  children: JSX.Element;
  redirect: string;
  restricted: boolean;
}

export function PublicRoute({
  children,
  redirect = "/",
  restricted = false,
}: IPublicRoute) {
  const isLoggedIn = useAppSelector((state) => state.root.auth.isLoggedIn);
  const shouldRedirect = restricted && isLoggedIn;

  if (shouldRedirect) {
    return <Navigate to={redirect} replace={true} />;
  }

  return children;
}
