import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PageBanner from "../layouts/PageBanner";
import bg from "../assets/images/banner/bnr3.jpg";
import { ThreeDots } from "../../node_modules/react-loader-spinner/dist/index";
const RecordsPerPage = 10;

const MyRequests = () => {
  const [dummyData, setDummyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getAllUserReceivedTransactions = async () => {
      try {
        setLoading(true);

        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
const payload ={
  items_per_page: RecordsPerPage,
  page:currentPage,
}
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/payments/getUserPayoutRequests`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              page: currentPage,
              items_per_page: RecordsPerPage,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTotalPages(Math.ceil(data.totalRecords / RecordsPerPage));
        setDummyData(data.data);
      } catch (error) {
        // console.error("Error fetching data:", error);
        // toast.error("Payout requests not found for the user.");
      } finally {
        setLoading(false);
      }
    };

    getAllUserReceivedTransactions();
  }, [currentPage]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const formattedDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <PageBanner
        maintitle=" Home"
        pagetitle="My Payout Requests"
        background={bg}
      />
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          height: "70vh",
          marginBottom: "30px",
        }}
      >
        {loading ? (
          <ThreeDots color="#36a2ae" className='center' height={50} width={50} />
        ) : dummyData && dummyData.length > 0 ? (
          <table
            style={{ borderCollapse: "collapse", width: "70%", margin: "auto" }}
          >
            <thead>
              <tr>
                <th style={cellStylethead}>Request ID</th>
                <th style={cellStylethead}>Campaign Title</th>
                <th style={cellStylethead}>Total Donations</th>
                <th style={cellStylethead}>Status</th>
                <th style={cellStylethead}>Amount</th>
                <th style={cellStylethead}>Campaign Duration</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((request) => (
                <tr key={request._id}>
                  <td style={cellStyle}>{request._id}</td>
                  <td style={cellStyle}>{request.campaign_details.title}</td>
                  <td style={cellStyle}>{request.campaign_details.total_funding}</td>
                  <td style={cellStyle}>{request.status}</td>
                  <td style={cellStyle}>{request.amount}</td>
                  <td style={cellStyle}>
  {formattedDate(request.campaign_details.start_date)} - {formattedDate(request.campaign_details.end_date)}
</td>
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
              <Link
                to={"#"}
                className={`page-link prev ${currentPage === 1 && "disabled"}`}
                onClick={goToPreviousPage}
              >
                <i className="fas fa-chevron-left"></i>
              </Link>
            </div>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <li className="page-item" key={i}>
                  <Link
                    to={"#"}
                    className={`page-link ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="page-item">
              <Link
                to={"#"}
                className={`page-link next ${
                  currentPage === totalPages && "disabled"
                }`}
                onClick={goToNextPage}
              >
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
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
};
const cellStylethead = {
  border: '1px solid #ddd',
  background: "#bf0b32",
  color: '#fff',
  padding: '8px',
  textAlign: 'center',
};
export default MyRequests;
