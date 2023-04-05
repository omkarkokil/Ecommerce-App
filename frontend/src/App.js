import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import Products from "./Pages/Products";
import ClientOrders from "./Pages/ClientOrders";
import DashBoard from "./Admin/pages/DashBoard";
import { useContext } from "react";
import StateContext from "./Context/hooks/StateContext";
import AdminNav from "./Admin/AdminNav";

function App() {
  const loc = window.location.pathname;

  return (
    <>
      <StateProvider>
        <FunctionProvider>
          <BrowserRouter>
            {!loc.includes("/admin") ? <Navbar /> : ""}

            <SearchModal />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/addcart" element={<AddCart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/productpage/:id" element={<ProductPage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<ClientOrders />} />

              {/* Admin Panel */}
              <Route path="/admin/dashboard" element={<AdminNav />} />
              <Route path="/admin/addproducts" element={<AdminNav />} />
              <Route path="/admin/products" element={<AdminNav />} />
              <Route path="/admin/orders" element={<AdminNav />} />
              <Route path="/admin/users" element={<AdminNav />} />
              <Route path="/admin/reviews" element={<AdminNav />} />

              {/* Admin Panel */}
            </Routes>
          </BrowserRouter>
        </FunctionProvider>
      </StateProvider>
    </>
  );
}

export default App;
