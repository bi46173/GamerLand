import {
  Container,
  createTheme,
  CssBaseline, // removes margins
  ThemeProvider,
} from "@mui/material"; 
import { useEffect, useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const {setBasket} = useStoreContext();
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const buyerId = getCookie('buyerId');
    if(buyerId){
      agent.Basket.get()
      .then(basket=> setBasket(basket))
      .catch(error=> console.log(error))
      .finally(() => setLoading(false))
    }else{
      setLoading(false);
    }
  },[setBasket])
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

  if(loading) return <LoadingComponent message="Loading..."></LoadingComponent>
  return (
    <div>
      <ThemeProvider theme={theme}>
        <ToastContainer position='bottom-right' hideProgressBar />
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
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
