import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import StateProvider from "./Context/hooks/StateProvider";
import SearchModal from "./utils/Navbar/SearchModel/SearchModal";
import Login from "./Pages/client/Auth/Login/Login";
import Register from "./Pages/client/Auth/Register/Register";
import AddCart from "./Pages/client/Cart/AddCart";
import Checkout from "./Pages/client/Cart/CheckOut/Checkout/Checkout";
import ProductPage from "./Pages/client/Products/Product/ProductPage";
import Products from "./Pages/client/Products/AllProducts/Products";
import ClientOrders from "./Pages/client/Orders/ClientOrders";
import ApiProvider from "./Context/Api/ApiProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FunctionProvider from "./Context/Function/FunctionProvider";
import ScrollToTop from "./utils/ScrollToTop";
import { useEffect } from "react";
import OrderComplete from "./Pages/client/Orders/OrderComplete/OrderComplete";
import Navbar from "./utils/Navbar/Navbar";
import MobileOrder from "./Pages/client/Orders/Mobile/MobileOrder";
import Profile from "./Pages/client/Profile/Profile";
import AdminNav from "./Pages/Admin/AdminNav";
import Home from "./Pages/client/Home/Home";


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
