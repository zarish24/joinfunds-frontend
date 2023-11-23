import React, { useState, useEffect } from "react";
import PageBanner from '../layouts/PageBanner';
import bg from '../assets/images/banner/bnr3.jpg';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import styles from "./styles.module.scss";

const RecordsPerPage = 10;

const RecivedDonations = () => {
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
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/payments/getRecievedTransactions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              page: currentPage,
              limit: RecordsPerPage,
            }),
          });

        if (!response.ok) {
          toast.error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTotalPages(Math.ceil(data.totalCount / RecordsPerPage));
        setDummyData(data.transactions);
      } catch (error) {
        // console.error('Error fetching data/:', error);
      }
    };

    getAllUserReceivedTransactions();
  }, [currentPage]);

  const formattedDate = (createdTime) => {
    return new Date(createdTime).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
  };

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
      <PageBanner maintitle=" Recived Donations" pagetitle="My Recived Donations" background={bg} />
      <div style={{ textAlign: 'center', marginTop: '20px', height: '100vh', marginBottom: '30px' }}>
        {dummyData.length > 0 ? (
          <table style={{ borderCollapse: 'collapse', width: '70%', margin: 'auto' }}>
            <thead>
              <tr>
                <th style={cellStylethead}>Date</th>
                <th style={cellStylethead}>Campaign</th>
                <th style={cellStylethead}>Donation </th>
                <th style={cellStylethead}>Donation Method</th>
                <th style={cellStylethead}> Name</th>
                {/* <th style={cellStylethead}> Email</th> */}
              </tr>
            </thead>
            <tbody>
              {dummyData.map(request => (
                <tr key={request._id}>
                  <td style={cellStyle}>{formattedDate(request.created_time)}</td>
                  <td style={cellStyle}>{request.title}</td>
                  <td style={cellStyle}>{request.amount}</td>
                  <td style={cellStyle}>{request.payment_method}</td>
                  <td style={cellStyle}>
  {request.user_details.firstName && request.user_details.lastName
    ? `${request.user_details.firstName} ${request.user_details.lastName}`
    : 'Anonymous Donation'}

</td>
                  {/* <td style={cellStyle}>
  {request.user_details.email ? request.user_details.email : 'Anonymous Email'}
</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Donations available.</p>
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
const cellStylethead = {
  border: '1px solid #ddd',
  background: "#bf0b32",
  color: '#fff',
  padding: '8px',
  textAlign: 'center',
};

export default RecivedDonations;
