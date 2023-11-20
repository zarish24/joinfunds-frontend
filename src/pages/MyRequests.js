import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
  } from "react";
  import { Link } from "react-router-dom";
  import { useNavigate } from "react-router-dom";
  import styles from "./styles.module.scss";
  import axios from "axios";
  import { Modal } from "react-bootstrap";
  import { loadStripe } from "@stripe/stripe-js";
  import { initStripe } from "./stripe";
  import { CardWidget } from "./CardWidget";
  import Box from "@mui/material/Box";
  import { ThreeDots } from "../../node_modules/react-loader-spinner/dist/index";
  import PageBanner from '../layouts/PageBanner';
  import bg from '../assets/images/banner/bnr3.jpg';
  
  let card = null;
  const MyRequests = () => {
    // Replace with your actual wallet address
    // const walletAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
    const user = JSON.parse(localStorage.getItem("user"));
  
    const [token, setToken] = useState("");
    const [copied, setCopied] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const [StripeAccNum, setStripeAccNum] = useState("");
    const [maskedAddress, setMaskedAddress] = useState("");
    const [modalStripeDonate, setModalStripeDonate] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const [user_id, setUser_id] = useState("");
    //   console.log('StripeAccNum', StripeAccNum)
    //   console.log('maskedAddress', maskedAddress)
    //   console.log('token', token)
    const dummyData = [
        {
            "_id": "6554ad406c495944ac9ff28d",
            "status": "Pending",
            "amount": 5000,
            "campaign_details": {
                "_id": "65487f78d87dbf072cd44f45",
                "title": "Education",
                "subtitle": "Need Fund For Education",
                "description": "Need for Education"
            }
        },
        {
            "_id": "6554ad406c495944ac9ff28d",
            "status": "Pending",
            "amount": 5000,
            "campaign_details": {
                "_id": "65487f78d87dbf072cd44f45",
                "title": "Education",
                "subtitle": "Need Fund For Education",
                "description": "Need for Education"
            }
        },
        {
            "_id": "6554ad406c495944ac9ff28d",
            "status": "Pending",
            "amount": 5000,
            "campaign_details": {
                "_id": "65487f78d87dbf072cd44f45",
                "title": "Education",
                "subtitle": "Need Fund For Education",
                "description": "Need for Education"
            }
        },
        {
            "_id": "6554ad406c495944ac9ff28d",
            "status": "Pending",
            "amount": 5000,
            "campaign_details": {
                "_id": "65487f78d87dbf072cd44f45",
                "title": "Education",
                "subtitle": "Need Fund For Education",
                "description": "Need for Education"
            }
        },
        {
            "_id": "6554ad406c495944ac9ff28d",
            "status": "Pending",
            "amount": 5000,
            "campaign_details": {
                "_id": "65487f78d87dbf072cd44f45",
                "title": "Education",
                "subtitle": "Need Fund For Education",
                "description": "Need for Education"
            }
        },
        {
            "_id": "6554ad406c495944ac9ff28d",
            "status": "Pending",
            "amount": 5000,
            "campaign_details": {
                "_id": "65487f78d87dbf072cd44f45",
                "title": "Education",
                "subtitle": "Need Fund For Education",
                "description": "Need for Education"
            }
        },
        {
            "_id": "6554ad406c495944ac9ff28d",
            "status": "Pending",
            "amount": 5000,
            "campaign_details": {
                "_id": "65487f78d87dbf072cd44f45",
                "title": "Education",
                "subtitle": "Need Fund For Education",
                "description": "Need for Education"
            }
        }
    ];
    
    return (
        <>
            {/* <h2>Requests</h2> */}
            <PageBanner maintitle=" Requests" pagetitle="My Requests" background={bg} />
         <div style={{ textAlign: 'center', marginTop: '20px', height:'70vh', marginBottom: '30px' }}>
         {dummyData.length > 0 ? (
                <table style={{ borderCollapse: 'collapse', width: '70%', margin: 'auto' }}>
                    <thead>
                        <tr>
                            <th style={cellStyle}>Request ID</th>
                            <th style={cellStyle}>Status</th>
                            <th style={cellStyle}>Amount</th>
                            <th style={cellStyle}>Campaign Title</th>
                            <th style={cellStyle}>Campaign Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummyData.map(request => (
                            <tr key={request._id}>
                                <td style={cellStyle}>{request._id}</td>
                                <td style={cellStyle}>{request.status}</td>
                                <td style={cellStyle}>{request.amount}</td>
                                <td style={cellStyle}>{request.campaign_details.title}</td>
                                <td style={cellStyle}>{request.campaign_details.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No requests available.</p>
            )}
        </div>
        </>
    );
};



   
  const cellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
};
  export default MyRequests;
  