import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name}</h1>
        <p className="mb-4 text-gray-600">Email: {user?.email}</p>

        <div className="flex flex-col gap-2 items-center">
          <Link to="/products">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              View Products
            </button>
          </Link>

          <Link to="/cart">
            <button className="bg-purple-600 text-white px-4 py-2 rounded">
              View Cart
            </button>
          </Link>

          {user?.role === "admin" && (
            <Link to="/add-product">
              <button className="bg-green-600 text-white px-4 py-2 rounded">
                Add Product
              </button>
            </Link>
          )}
        </div>

        <button
          onClick={logout}
          className="mt-6 w-full bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
