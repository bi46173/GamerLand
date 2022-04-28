import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

const PrivateRoute = () => {
  const { user } = useAppSelector((state) => state.account);
  const location = useLocation();

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
