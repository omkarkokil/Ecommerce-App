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
            </Routes>
          </BrowserRouter>
        </FunctionProvider>
      </StateProvider>
    </>
  );
}

export default App;
