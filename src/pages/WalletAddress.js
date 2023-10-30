import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const WalletAddress = () => {
    // Replace with your actual wallet address
    const walletAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';

    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        const textField = document.createElement('textarea');
        textField.innerText = walletAddress;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        setCopied(true);
    };

    // Extract the first six and last eight characters
    const firstSix = walletAddress.substring(0, 6);
    const lastEight = walletAddress.substring(walletAddress.length - 8);

    // Replace the rest with dots
    const maskedAddress = firstSix + '.................................' + lastEight;

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
