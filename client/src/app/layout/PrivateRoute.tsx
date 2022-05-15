import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

interface Props {
  roles?: string[];
}

const PrivateRoute = (props?: Props) => {
  const { user } = useAppSelector((state) => state.account);
  const location = useLocation();

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return user &&
    props?.roles &&
    props.roles?.some((r) => user!.roles?.includes(r)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
