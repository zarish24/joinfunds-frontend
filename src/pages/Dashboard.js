import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PageBanner from "../layouts/PageBanner";
import bg from "../assets/images/banner/bnr3.jpg";
import { ThreeDots } from "../../node_modules/react-loader-spinner/dist/index";
const RecordsPerPage = 10;

const Dashboard = () => {
  const [dummyData, setDummyData] = useState([]);
  const [dummyData1, setDummyData1] = useState([]);
  const [dummyData2, setDummyData2] = useState([]);  
  const [payoutBalance, setPayoutBalance] = useState(0);  
  const [donorsDetails, setDonorsDetails] = useState(0);  
  const [recievedTransactions, setRecievedTransactions] = useState(0); 
  const [dummyDataCount, setDummyDataCount] = useState(0);   
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
          `${process.env.REACT_APP_BACKEND_URL}/api/payments/getTodayMyCampaignsDonorsDetails`,
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
        console.log('data.data-------------------->>>>>>>>>>>>>', data);
        setDummyData(data.donor_details);
        setDummyDataCount(data.totalCount);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    const getTodayMyCampaignsDonorsDetails = async () => {
      try {
        setLoading(true);

        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
        const payload ={
          items_per_page: RecordsPerPage,
          page:currentPage,
        }
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/payments/getRecievedTransactions`,
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
        console.log('data.data 111  -------------------->>>>>>>>>>>>>', data);
        setDonorsDetails(data.totalCount);        
        setDummyData1(data.transactions);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    const getTodayUserRecievedTransactions = async () => {
      try {
        setLoading(true);

        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
        const payload ={
          items_per_page: RecordsPerPage,
          page:currentPage,
        }
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/payments/getTodayUserRecievedTransactions`,
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
        console.log('data.data 22222222-------------------->>>>>>>>>>>>>', data);
        setDummyData2(data.transactions);
        setRecievedTransactions(data.totalCount);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    const getgetPayoutBalance = async () => {
      try {
        setLoading(true);

        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
        const payload ={
          items_per_page: RecordsPerPage,
          page:currentPage,
        }
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/payments/getPayoutBalance`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('getgetPayoutBalance.data-------------------->>>>>>>>>>>>>', data);
        setPayoutBalance(data.myPayoutBalance);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    getAllUserReceivedTransactions();
    getgetPayoutBalance();
    getTodayUserRecievedTransactions();
    getTodayMyCampaignsDonorsDetails();
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
          <div className="page-content bg-white">
          <PageBanner
        maintitle=" Home"
        pagetitle="My Dashboard"
        background={bg}
      />
        <section className="content-inner section-wrapper5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6" style={{ cursor:'pointer' }}>
                  <div
                    className="icon-bx-wraper box-hover style-2 m-b30"
                    style={{ border: '1px solid #696969'}}
                  >
                    <div className="icon-lg">
                      <Link to={"/services-details"} className="icon-cell">
                        <i className="flaticon-coin-stack"></i>
                      </Link>
                    </div>
                    <div className="icon-content">
                      <h5 className="dz-tilte m-b5 text-capitalize">
                      Payout Balance
                      </h5>
                      <p>
                      {payoutBalance} USD
                      </p>
                    </div>
                  </div>
              </div>
              <div className="col-lg-6" style={{ cursor:'pointer' }}>
                  <div
                    className="icon-bx-wraper box-hover style-2 m-b30"
                    style={{ border: '1px solid #696969'}}
                  >
                    <div className="icon-lg">
                      <Link to={"/services-details"} className="icon-cell">
                        <i className="flaticon-responsibility"></i>
                      </Link>
                    </div>
                    <div className="icon-content">
                      <h5 className="dz-tilte m-b5 text-capitalize">
                      All Donations
                      </h5>
                      <p>
                      {donorsDetails} USD
                      </p>
                    </div>
                  </div>
              </div>
              <div className="col-lg-6" style={{ cursor:'pointer' }}>
                  <div
                    className="icon-bx-wraper box-hover style-2 m-b30"
                    style={{ border: '1px solid #696969'}}
                  >
                    <div className="icon-lg">
                      <Link to={"/services-details"} className="icon-cell">
                        <i className="flaticon-coins"></i>
                      </Link>
                    </div>
                    <div className="icon-content">
                      <h5 className="dz-tilte m-b5 text-capitalize">
                      Today Received Donations
                      </h5>
                      <p>
                      {recievedTransactions} USD
                      </p>
                    </div>
                  </div>
              </div>
              <div className="col-lg-6" style={{ cursor:'pointer' }}>
                  <div
                    className="icon-bx-wraper box-hover style-2 m-b30"
                    style={{ border: '1px solid #696969'}}
                  >
                    <div className="icon-lg">
                      <Link to={"/services-details"} className="icon-cell">
                        <i className="flaticon-coins-1"></i>
                      </Link>
                    </div>
                    <div className="icon-content">
                      <h5 className="dz-tilte m-b5 text-capitalize">
                      Total Donors
                      </h5>
                      <p>
                      {dummyDataCount} 
                      </p>
                    </div>
                  </div>
              </div>              
            </div>
      <hr></hr>
          </div>
        </section>
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <h4 className="mb-3" style={{ color: '#515151' }}>All Campaigns Donors </h4>
        {loading ? (
  <div className="text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <ThreeDots color="#36a2ae" className='center' height={50} width={50} />
  </div>
) : (
  <div className="table-responsive">
  <table style={{ borderCollapse: "collapse", width: "80%", margin: "auto" }}>
    <thead>
      <tr>
        <th scope="col" style={cellStylethead}>Campaign Title</th>
        <th scope="col" style={cellStylethead}>Donor</th>
        <th scope="col" style={cellStylethead}>Total Donations</th>
        <th scope="col" style={cellStylethead}>System Fee</th>
        <th scope="col" style={cellStylethead}>Payment Method</th>
      </tr>
    </thead>
    {dummyData && dummyData.length > 0 ? (
      <tbody>
        {dummyData.map((request) => (
          <tr key={request._id}>
            <td style={cellStyle}>{request.campaign_title}</td>            
            <td style={cellStyle}>{request.donor_user_details.firstName} {request.donor_user_details.lastName}</td>
            <td style={cellStyle}>{request.amount} {request.currency}</td>
            <td style={cellStyle}>{request.system_fees} {request.currency}</td>            
            <td style={cellStyle}>{request.payment_method}</td>
          </tr>
        ))}
      </tbody>
    ) : (
      <tbody>
        <tr>
          <td colSpan="6">
            <p className="my-3">No data found.</p>
          </td>
        </tr>
      </tbody>
    )}
  </table>
    </div>
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
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "20px",
        }}
      >
        <h4 className="mb-3" style={{ color: '#515151' }}>All Donations </h4>
        {loading ? (
  <div className="text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <ThreeDots color="#36a2ae" className='center' height={50} width={50} />
  </div>
) : (
<div className="table-responsive">
  <table className="table table-bordered" style={{ width: "80%", margin: "auto" }}>
    <thead className="thead-dark" style={{ background: "#bf0b32", color: "white  " }}>
      <tr>
        <th scope="col" style={{  color: "white" }}>Campaign Title</th>
        <th scope="col" style={{  color: "white" }}>Donor</th>
        <th scope="col" style={{  color: "white" }}>Total Donations</th>
        <th scope="col" style={{  color: "white" }}>System Fee</th>
        <th scope="col" style={{  color: "white" }}>Payment Method</th>
        <th scope="col" style={{  color: "white" }}>Payment Status</th>
        <th scope="col" style={{  color: "white" }}>Campaign Duration</th>
      </tr>
    </thead>
    {dummyData1 && dummyData1.length > 0 ? (
      <tbody>
        {dummyData1.map((request) => (
          <tr key={request._id}>
            <td>{request.title}</td>
            <td>{request.user_details.firstName} {request.user_details.lastName}</td>
            <td>{request.amount} {request.currency}</td>
            <td>{request.system_fees} {request.currency}</td>
            <td>{request.payment_method}</td>
            <td>{request.payment_status}</td>
            <td>{formattedDate(request.created_time)}</td>
          </tr>
        ))}
      </tbody>
    ) : (
      <tbody>
        <tr>
          <td colSpan="7">
            <p className="my-3">No data found.</p>
          </td>
        </tr>
      </tbody>
    )}
  </table>
</div>
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
  textTransform: 'capitalize',
};
const cellStylethead = {
  border: '1px solid #ddd',
  background: "#bf0b32",
  color: '#fff',
  padding: '8px',
  textAlign: 'center',
  textTransform: 'capitalize',
};
export default Dashboard;
