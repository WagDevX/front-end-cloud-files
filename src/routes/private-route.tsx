import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Navigate, RouteProps } from "react-router-dom";

export function PrivateRoute({ children }: RouteProps): JSX.Element {
  const isLoggedIn = useAuthUser();
  return <>{isLoggedIn ? children : <Navigate to="/login" />}</>;
}
