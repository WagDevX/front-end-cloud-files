import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Navigate, RouteProps } from "react-router-dom";

export function PrivateRoute({ children }: RouteProps): JSX.Element {
  const isLoggedIn = useAuthUser(); // check cookie or local storage etc.
  return <>{isLoggedIn ? children : <Navigate to="/login" />}</>;
}
