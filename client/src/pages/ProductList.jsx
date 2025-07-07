import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function ProductList() {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${BASE_URL}/api/products/${productId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== productId));
        toast.success("Product deleted!");
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.error("Delete Error:", err);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <div className="h-[250px] overflow-hidden flex items-center justify-center mb-2">
              <img
                src={product.image}
                alt={product.name}
                className="object-contain max-h-full"
              />
            </div>

            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-gray-600 text-sm">{product.description}</p>
            <p className="text-blue-600 font-bold mt-2">₹{product.price}</p>
            <p className="text-sm text-gray-500">Sizes: {product.size.join(", ")}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
              >
                Add to Cart
              </button>

              <Link to={`/buy/${product._id}`}>
                <button className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 transition">
                  Buy Now
                </button>
              </Link>

              {user?.role === "admin" && (
                <>
                  <Link to={`/edit-product/${product._id}`}>
                    <button className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
