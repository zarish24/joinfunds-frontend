import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import axios from "axios";

const WalletAddress = () => {
    // Replace with your actual wallet address
    // const walletAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';

    const [copied, setCopied] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const [maskedAddress, setMaskedAddress] = useState("");

    const copyToClipboard = () => {
        const textField = document.createElement('textarea');
        textField.innerText = walletAddress;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        setCopied(true);
    };


    
  useEffect(() => {
    const fetchData = async (token) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Use Bearer authentication, replace "Bearer" if you have a different authentication method
          },
        };
            const response = await axios
            .get(
              `${process.env.REACT_APP_BACKEND_URL}/api/compaign/getWalletAddress`, config
            )
            .then((res) => {
              if (res.status === 200 || res.status === 201) {
                setWalletAddress(res?.data?.data?.walletAddress)
                    // Extract the first six and last eight characters
                if(walletAddress)
                {
                    const firstSix = walletAddress.substring(0, 6);
                    const lastEight = walletAddress.substring(walletAddress.length - 8);
                    setMaskedAddress(firstSix + '.................................' + lastEight);
                }
                
               
              } else {
                window.alert("Wallet Address not fount due to some issue!");
              }
            })
            .catch((error) => {
              window.alert(error);
            });

      } catch (error) {
        window.alert("API request failed", error);
        console.error("API request failed", error);
      }
    };
    const user = JSON.parse(localStorage.getItem("user"));
    if (user ) {
      fetchData(user.token);
    }
    // Call the async function
  }, [walletAddress]);

    return (
        <div className={`${styles.wallet_address_container}`}>
            <h2>Your Wallet Address</h2>
            <div className={`${styles.wallet_address} ${copied ? 'copied' : ''}`}>
                {maskedAddress}
                <button onClick={copyToClipboard}>
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
        </div>
    );
};


export default WalletAddress;
