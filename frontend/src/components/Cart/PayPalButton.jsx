import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalButton({ amount, onSuccess, onError }) {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD", // Add currency at the script provider level
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) =>
          actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: parseFloat(amount).toFixed(2),
                  currency_code: "USD", // Specify currency in the order
                },
              },
            ],
          })
        }
        onApprove={(data, actions) => actions.order.capture().then(onSuccess)}
        onError={(err) => {
          console.error("PayPal Error:", err);
          onError(err);
        }}
        style={{ layout: "vertical" }}
      />
    </PayPalScriptProvider>
  );
}
