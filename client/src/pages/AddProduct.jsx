import React, { useState } from "react";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    size: "",
    color: "",
    image: "",
    stock: "",
    category: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Convert size string to array, e.g. "S,M,L" => ["S","M","L"]
    const sizesArray = formData.size.split(",").map((s) => s.trim());

    try {
      const res = await fetch("http://localhost:8080/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, size: sizesArray }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Error adding product");
        return;
      }

      setMessage("✅ Product added successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        size: "",
        color: "",
        image: "",
        stock: "",
        category: "",
      });
    } catch (err) {
      setMessage("❌ Server error. Try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Product</h2>

      {message && (
        <div className="mb-4 text-center text-sm font-medium text-blue-600">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Description", name: "description", type: "text" },
          { label: "Price", name: "price", type: "number" },
          { label: "Size (comma-separated)", name: "size", type: "text" },
          { label: "Color", name: "color", type: "text" },
          { label: "Image URL", name: "image", type: "text" },
          { label: "Stock", name: "stock", type: "number" },
          { label: "Category", name: "category", type: "text" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
