import React, { useRef, useEffect } from "react";

export default function Paypal() {
  const paypal = useRef(null);

  useEffect(() => {
    if (!paypal.current && window.paypal) {
      paypal.current = window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'checkout',
          height: 40,
          fundingicons: false,
        },
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Donation for a cause",
                amount: {
                  currency_code: "USD",
                  value: 10.0,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          try {
            const order = await actions.order.capture();
            console.log("Payment Token:", order.id);
            console.log("User Token:", data.payerID);
            // Now, securely send order.id and data.payerID to your server
            // Handle payment processing and user authentication securely on your server-side code
          } catch (error) {
            console.error("Error capturing payment:", error);
            // Handle errors gracefully
          }
        },
        onError: (err) => {
          console.error("PayPal error:", err);
          // Handle errors if necessary
        },
      });
      paypal.current.render("#paypal-container");
    }

    // Clean up function
    return () => {
      // Clean up PayPal buttons if needed
      if (paypal.current) {
        paypal.current.close();
        paypal.current = null;
      }
    };
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div id="paypal-container">
      <p>Make a donation to support our cause:</p>
    </div>
  );
}
