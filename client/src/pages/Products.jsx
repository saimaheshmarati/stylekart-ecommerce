import React, { useState, useEffect, useContext, createContext } from "react";


function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch all products from the API
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/products");
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to load products");
        } else {
          setProducts(data.products || []);
        }
      } catch (err) {
        setError("Something went wrong while fetching products.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🛍️ All Products</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-700 mb-1">₹{product.price}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
