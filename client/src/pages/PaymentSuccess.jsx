import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <div className="bg-white shadow-lg p-6 rounded text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-700 mb-2">✅ Payment Successful!</h1>
        <p className="text-gray-600">Thank you for your purchase.</p>
        <p className="text-sm mt-2">Redirecting to Dashboard...</p>
      </div>
    </div>
  );
}

export default PaymentSuccess;
