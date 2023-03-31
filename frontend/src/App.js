import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./utils/Navbar";
import StateProvider from "./Context/hooks/StateProvider";
import FunctionProvider from "./Context/Function/FunctionProvider";
import SearchModal from "./components/Navbar/SearchModal";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AddCart from "./Pages/AddCart";
import Checkout from "./components/AddCart/Checkout";
import ProductPage from "./Pages/ProductPage";

function App() {
  return (
    <>
      <StateProvider>
        <FunctionProvider>
          <BrowserRouter>
            <Navbar />
            <SearchModal />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/addcart" element={<AddCart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/productpage/:id" element={<ProductPage />} />
            </Routes>
          </BrowserRouter>
        </FunctionProvider>
      </StateProvider>
    </>
  );
}

export default App;
