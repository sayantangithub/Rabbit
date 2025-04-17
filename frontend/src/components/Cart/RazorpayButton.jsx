import React from "react";

export default function RazorpayButton({ amount, onSuccess, onError, checkoutId }) {
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Failed to load Razorpay SDK. Please check your connection.");
      return;
    }

    try {
      // Create Razorpay order on backend
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/razorpay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({ amount, checkoutId }),
      });

      const data = await response.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "MyShop",
        description: "Order Payment",
        order_id: data.id,
        handler: async function (response) {
          const paymentDetails = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          onSuccess(paymentDetails);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#000",
        },
      };

      const razor = new window.Razorpay(options);
      razor.on("payment.failed", onError);
      razor.open();
    } catch (err) {
      console.error("Razorpay Error:", err);
      onError(err);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full bg-green-600 text-white py-3 rounded mt-4"
    >
      Pay with Razorpay
    </button>
  );
}
