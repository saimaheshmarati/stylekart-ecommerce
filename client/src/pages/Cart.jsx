import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center border-b pb-2">
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>₹{item.price} x {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-600 font-bold"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right font-bold text-xl mt-4">Total: ₹{total}</div>

          <div className="flex gap-4 mt-4 justify-end">
            <button
              onClick={clearCart}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Clear Cart
            </button>

            {/* ✅ Redirect to payment form instead of success */}
            <Link to="/payment">
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Proceed to Payment
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
