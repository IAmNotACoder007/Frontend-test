import { Navigate } from "react-router-dom";
import { useAccessToken } from "./AuthProvider";

export interface PrivateRouteProp {
  children: JSX.Element;
  redirectTo?: string;
}

export function PrivateRoute(props: PrivateRouteProp) {
  const { redirectTo, children } = props;
  const [accessToken] = useAccessToken();
  return accessToken ? children : <Navigate to={redirectTo || "/sign-in"} />;
}
