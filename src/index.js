import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import  ThemeContext  from "./context/ThemeContext"; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PayPalScriptProvider options={process.env.REACT_APP_PAYPAL_CLIENT_ID }>
    <BrowserRouter basename="/">
      <ThemeContext>
        <App />
        <ToastContainer />
      </ThemeContext>
    </BrowserRouter>
    </PayPalScriptProvider>
  </React.StrictMode>
);

reportWebVitals();
