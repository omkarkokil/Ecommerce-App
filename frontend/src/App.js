import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./client/Pages/Home";
import StateProvider from "./Context/hooks/StateProvider";
import SearchModal from "./client/components/Navbar/SearchModal";
import Login from "./client/Pages/Login";
import Register from "./client/Pages/Register";
import AddCart from "./client/Pages/AddCart";
import Checkout from "./client/components/AddCart/Checkout";
import ProductPage from "./client/Pages/ProductPage";
import Products from "./client/Pages/Products";
import ClientOrders from "./client/Pages/ClientOrders";
import AdminNav from "./Admin/AdminNav";
import ApiProvider from "./Context/Api/ApiProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FunctionProvider from "./Context/Function/FunctionProvider";
import ScrollToTop from "./utils/ScrollToTop";
import { useEffect } from "react";
import OrderComplete from "./client/Pages/OrderComplete";
import EditProduct from "./Admin/pages/EditProduct";
import Navbar from "./utils/Navbar";
import MobileOrder from "./client/Pages/MobileOrder";
import Profile from "./client/Pages/Profile";


function App() {
  useEffect(() => {
  }, [])
  return (
    <>
      <BrowserRouter>

        <StateProvider>
          <FunctionProvider>
            <ApiProvider>
              <ToastContainer />
              <SearchModal />
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/addcart" element={<AddCart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/productpage/:id" element={<ProductPage />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<Products />} />
                <Route path="/orders" element={<ClientOrders />} />
                <Route path="/ordersSuccess" element={<OrderComplete />} />
                <Route path="/orderReport/:id" element={<MobileOrder />} />
                <Route path="/profile" element={<Profile />} />



                {/* Admin Panel */}

                <Route path="/admin/dashboard" element={<AdminNav />} />
                <Route path="/admin/addproducts" element={<AdminNav />} />
                <Route path="/admin/products" element={<AdminNav />} />
                <Route path="/admin/orders" element={<AdminNav />} />
                <Route path="/admin/users" element={<AdminNav />} />
                <Route path="/admin/editProduct/:id" element={<AdminNav />} />
                <Route path="/admin/getOrder/:id" element={<AdminNav />} />
                {/* Admin Panel */}
              </Routes>
            </ApiProvider>
          </FunctionProvider>
        </StateProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
