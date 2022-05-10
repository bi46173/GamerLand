import {
  Container,
  createTheme,
  CssBaseline, // removes margins
  ThemeProvider,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import Login from "../../features/account/Login";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import Register from "../../features/account/Register";
import PrivateRoute from "./PrivateRoute";
import Orders from "../../features/orders/Orders";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
import Inventory from "../../features/admin/Inventory";
import AdminContacts from "../../features/admin/contacts/AdminContacts";
import Dashboard from "../../features/admin/home/Dashboard";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading)
    return <LoadingComponent message="Loading..."></LoadingComponent>;
  return (
    <div>
      <ThemeProvider theme={theme}>
        <ToastContainer position="bottom-right" hideProgressBar />
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<ProductDetails />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/server-error" element={<ServerError />} />
            <Route path="/basket" element={<BasketPage />} />
            <Route
              path="/checkout"
              element={<PrivateRoute roles={["Member", "Admin"]} />}
            >
              <Route path="/checkout" element={<CheckoutWrapper />} />
            </Route>
            <Route
              path="/orders"
              element={<PrivateRoute roles={["Member", "Admin"]} />}
            >
              <Route path="/orders" element={<Orders />} />
            </Route>
            <Route path="/admin" element={<PrivateRoute roles={["Admin"]} />}>
              <Route path="/admin" element={<Dashboard />} />
            </Route>
            <Route
              path="/admin/inventory"
              element={<PrivateRoute roles={["Admin"]} />}
            >
              <Route path="/admin/inventory" element={<Inventory />} />
            </Route>
            <Route
              path="/admin/contacts"
              element={<PrivateRoute roles={["Admin"]} />}
            >
              <Route path="/admin/contacts" element={<AdminContacts />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
