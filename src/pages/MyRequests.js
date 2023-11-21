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
  import { toast } from 'react-toastify';
  const RecordsPerPage = 10;
  let card = null;
  const MyRequests = () => {
    const [dummyData, setDummyData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
  
    useEffect(() => {
      const getAllUserReceivedTransactions = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
  
        if (!token) {
          // console.error('User token not found in local storage');
          return;
        }
  
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/payments/getUserPayoutRequests`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                page: currentPage,
                items_per_page: RecordsPerPage,
              }),
            });
  
          if (!response.ok) {
            toast.error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          setTotalPages(Math.ceil(data.totalRecords / RecordsPerPage));
          setDummyData(data.data);
        } catch (error) {
          // console.error('Error fetching data/:', error);
        }
      };
  
      getAllUserReceivedTransactions();
    }, [currentPage]);
    const goToNextPage = () => {
        if (currentPage < totalPages) {
          setLoading(true);
          setTimeout(() => {
            setCurrentPage(currentPage + 1);
            setLoading(false);
          }, 1000); 
        }
      };
    
      const goToPreviousPage = () => {
        if (currentPage > 1) {
          setLoading(true);
          setTimeout(() => {
            setCurrentPage(currentPage - 1);
            setLoading(false);
          }, 1000); 
        }
      };

    
    return (
        <>
           
            <PageBanner maintitle=" My Payout Requests" pagetitle="My Payout Requests" background={bg} />
         <div style={{ textAlign: 'center', marginTop: '20px', height:'70vh', marginBottom: '30px' }}>
         {dummyData && dummyData.length > 0 ? (
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

<div className="col-12 m-sm-t0 m-t30">
            <nav className="pagination-bx">
              <div className="page-item">
                <Link to={"#"} className="page-link prev" onClick={goToPreviousPage}>
                  <i className="fas fa-chevron-left"></i>
                </Link>
              </div>
              <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
  <li
    className="page-item"
    key={i}
  >
    <Link
      to={"#"}
      className="page-link"
      style={{ backgroundColor: currentPage === i + 1 ? "rgba(36, 136, 124, 0.5)" : "" }}
      onClick={() => setCurrentPage(i + 1)}
    >
      {i + 1}
    </Link>
  </li>
))}
              </ul>
              <div className="page-item">
                <Link to={"#"} className="page-link next" onClick={goToNextPage}>
                  <i className="fas fa-chevron-right"></i>
                </Link>
              </div>
            </nav>
          </div>
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
  