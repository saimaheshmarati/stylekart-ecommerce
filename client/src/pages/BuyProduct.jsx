import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function BuyProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({ name: "", card: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => {
        console.error("Failed to fetch product", err);
        setError("Could not load product.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!form.name || !form.card) {
      setError("Please fill all fields");
      return;
    }

    navigate("/success");
  };

  if (!product) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center">🛍️ Buy Product</h1>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-blue-600 font-bold mb-2">₹{product.price}</p>

        <form onSubmit={handlePayment} className="space-y-4 mt-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="card"
            placeholder="Card Number (Dummy)"
            value={form.card}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Confirm Payment
          </button>
        </form>
      </div>
    </div>
  );
}

export default BuyProduct;
