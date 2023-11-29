import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import styles from './styles.module.scss';
import PageBanner from "../layouts/PageBanner";
import ProjectMasonry from "../components/Project/ProjectMasonry";
import UpdateBlog from "../components/Home/UpdateBlog";
import { toast } from 'react-toastify';
import bg from "../assets/images/banner/bnr5.jpg";
import axios from "axios";
const RecordsPerPage = 12;
const MyProjects = () => {
  const [campaignType, setCampaignType] = useState("");
  const [campaignStatus, setCampaignStatus] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [CategoryId, setCategoryId] = useState('');
  const [totalPages, setTotalPages] = useState(0);
console.log('searchText',searchText)

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
    const token =user.token;
    const id = user._id
      try {
       
        const data = {
          category_id:CategoryId,
          status: campaignStatus,
          campaign_type: "",
          title_search: searchText,
          user_id:id,
          items_per_page: RecordsPerPage,
          page:currentPage,
        };
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        };
        // if (campaignType !== "Campaign Type") {
        //   data.campaign_type = campaignType;
        // }

        // if (campaignStatus !== "Campaign Status") {
        //   data.status = campaignStatus;
        // }
        const response = await axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/api/compaign/getMyCampaigns`,
            data,config
          )
          .then((res) => {

            if (res.status === 200 || res.status === 201) {

              // console.log("all-comp-data", res?.data?.data?.data);
              setTotalPages(Math.ceil(res?.data?.count / RecordsPerPage));


              setCampaigns(res?.data?.data);
              setLoading(false);
            } else {
              setLoading(false);
              toast.error("Compaigns not fount due to some issue!");
            }
          })
          .catch((error) => {
            setLoading(false);
            setCampaigns([]);
            toast.error(error);
          });
        // setCampaigns(response.data); // Set the campaign data in state
      } catch (error) {
        toast.error("API request failed", error);
        // console.error("API request failed", error);
      }
    };
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) {
      fetchData(user._id,user.token);
    }
    fetchData();
    // Call the async function
  }, [currentPage,campaignType,campaignStatus,CategoryId,searchText]);



  const fetchData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token =user.token;
    const id = user._id
   
    try {
      // console.log("user_id", user_id);
      const data = {
        status: "",
        category_id:CategoryId,
        campaign_type: "",
        title_search: searchText,
        user_id:id,
        items_per_page: RecordsPerPage,
        page:currentPage,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      };
      // if (campaignType !== "Campaign Type") {
      //   data.campaign_type = campaignType;
      // }

      // if (campaignStatus !== "Campaign Status") {
      //   data.status = campaignStatus;
      // }
      const response = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/api/compaign/getMyCampaigns`,
          data,config
        )
        .then((res) => {
        
          if (res.status === 200 || res.status === 201) {

            setTotalPages(Math.ceil(res?.data?.count / RecordsPerPage));
            setCampaigns(res?.data?.data);
            setLoading(false);
          } else {
            setLoading(false);
            toast.error("Compaigns not fount due to some issue!");
          }
        })
        .catch((error) => {
          setLoading(false);
          setCampaigns([]);
          toast.error(error);
        });
      // setCampaigns(response.data); // Set the campaign data in state
    } catch (error) {
      toast.error("API request failed", error);
      // console.error("API request failed", error);
    }
  };

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
  return (
    <>
      <div className="page-content bg-white">
        <PageBanner
          maintitle="Campaigns"
          pagetitle="My Campaigns"
          background={bg}
        />
        <div className="find-bx-wrapper">
          <div className="container">
            <div className={`${styles.find} bg-white`}>
              <form>
                <div className="row align-items-center">
                  {/* <div className="col-lg-3 col-md-4">
                    <div className=""> */}
                      {/* <Dropdown className="col-lg-3 col-md-4 select-drop-2">
                        <Dropdown.Toggle
                          as="div"
                          className="i-false select-drop-btn-2"
                        >
                          <span>{campaignType}</span>
                          <i className="fa-regular fa-angle-down"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => setCampaignType("Campaign Type")}
                          >
                            Campaign Type
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => setCampaignType("All Category")}
                          >
                            all-category
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => setCampaignType("funding")}
                          >
                            funding
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => setCampaignType("donation")}
                          >
                            donation
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown> */}
                      <Dropdown className="col-lg-3 col-md-4 select-drop-2">
      <Dropdown.Toggle as="div" className="i-false select-drop-btn-2">
      <span>
  {(() => {
    switch (campaignStatus) {
      case 'open':
        return 'Open Campaigns';
      case 'close':
        return 'Closed Campaigns';
      default:
        return 'Campaign Status';
    }
  })()}
</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setCampaignStatus("")}>
          Campaign Status
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setCampaignStatus("open")}>
        Open Campaigns
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setCampaignStatus("close")}>
        Closed Campaigns
        </Dropdown.Item>
        {/* Additional options */}
      </Dropdown.Menu>
    </Dropdown>
                    {/* </div>
                  </div> */}
                  <div className="col-lg-6 col-md-8">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Find Projects"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
    <div className="input-group-prepend" style={buttonStyle}>
        <Link to={"/create-compaign"} style={{color:'white'}}  className="btn">
        + New Campaign 
        </Link>
      </div>
      </div>
    </div>
                  {/* <div className="col-lg-9 col-md-8">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Find Projects"
                      />
                      <div className="input-group-prepend">
                        <button className="btn">
                          <i className="las la-search"></i>
                        </button>
                      </div>
                    </div>
                  </div> */}
                </div>
              </form>
            </div>
            {/* <div className="tag-list">
              <span className="title text-black">Popular Search:</span>
              <Link to={"#"}>Education,</Link>
              <Link to={"#"}>Business,</Link>
              <Link to={"#"}>Creative,</Link>
              <Link to={"#"}>Medical</Link>
            </div> */}
          </div>
        </div>
        <section className="content-inner-2">
          <div className="container">
            <ProjectMasonry
              campaigns = {campaigns}
              fetchData={fetchData}
              setCategoryId={setCategoryId}
              page = {page}
              setPage = {setPage}
              searchText = {searchText}
            />
          </div>
        </section>
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
        <div className="call-action style-1 content-inner-1">
          <div className="container">
            <UpdateBlog />
          </div>
        </div>
      </div>
    </>
  );
};
const buttonStyle = {
  backgroundColor: 'rgb(27,130,113)', 
  color: '#ffffff', 
  // padding: '4px 4px', 
  borderRadius: '4px', 
  border: 'none',
  // margin: '2px',  
  marginLeft: '14px', 
  cursor: 'pointer', 
};

export default MyProjects;
