// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import PrivateRoute from "./components/PrivateRoute";
import ProductList from "./pages/ProductList";
import EditProduct from "./pages/EditProduct";
import BuyProduct from "./pages/BuyProduct";
import PaymentSuccess from "./pages/PaymentSuccess";
import Cart from "./pages/Cart";
import PaymentForm from "./pages/PaymentForm";

import { CartProvider } from "./context/CartContext"; // ✅ Wrap App from here too
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <CartProvider> {/* 🔥 Force wrap again just for testing */}
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/add-product" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
        <Route path="/edit-product/:id" element={<PrivateRoute><EditProduct /></PrivateRoute>} />
        <Route path="/buy/:id" element={<PrivateRoute><BuyProduct /></PrivateRoute>} />
        <Route path="/success" element={<PrivateRoute><PaymentSuccess /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/payment" element={<PrivateRoute><PaymentForm /></PrivateRoute>} />
        <Route
          path="*"
          element={
            <div className="text-center p-10 text-red-600 font-bold text-xl">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </CartProvider>
  );
}

export default App;
