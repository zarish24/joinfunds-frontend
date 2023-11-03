import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import styles from './styles.module.scss';
import PageBanner from "../layouts/PageBanner";
import ProjectMasonry from "../components/Project/ProjectMasonry";
import UpdateBlog from "../components/Home/UpdateBlog";

import bg from "../assets/images/banner/bnr5.jpg";
import axios from "axios";

const MyProjects = () => {
  const [campaignType, setCampaignType] = useState("Campaign Type");
  const [campaignStatus, setCampaignStatus] = useState("Campaign Status");
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(1);
  
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async (user_id, token) => {
      try {
        console.log("user_id", user_id);
        const data = {
          status: "",
          campaign_type: "All Category",
          user_id,
          items_per_page: 12,
          page,
        };
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Use Bearer authentication, replace "Bearer" if you have a different authentication method
          },
        };
        if (campaignType !== "Campaign Type") {
          data.campaign_type = campaignType;
        }

        if (campaignStatus !== "Campaign Status") {
          data.status = campaignStatus;
        }

        const response = await axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/api/compaign/getAllCompaigns`,
            data,config
          )
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              console.log("all-comp-data", res?.data?.data?.data);
              setCampaigns(res?.data?.data?.data);
            } else {
              window.alert("Compaigns not fount due to some issue!");
            }
          })
          .catch((error) => {
            window.alert(error);
          });
        // setCampaigns(response.data); // Set the campaign data in state
      } catch (error) {
        window.alert("API request failed", error);
        console.error("API request failed", error);
      }
    };
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) {
      fetchData(user._id,user.token);
    }
    // Call the async function
  }, [page,campaignType,campaignStatus]);
  return (
    <>
      <div className="page-content bg-white">
        <PageBanner
          maintitle="Project"
          pagetitle="My-Projects"
          background={bg}
        />
        <div className="find-bx-wrapper">
          <div className="container">
            <div className={`${styles.find} bg-white`}>
              <form>
                <div className="row align-items-center">
                  {/* <div className="col-lg-3 col-md-4">
                    <div className=""> */}
                      <Dropdown className="col-lg-3 col-md-4 select-drop-2">
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
                            All Category
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => setCampaignType("Funding")}
                          >
                            Funding
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => setCampaignType("Donation")}
                          >
                            Donation
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Dropdown className="col-lg-3 col-md-4 select-drop-2">
                        <Dropdown.Toggle
                          as="div"
                          className="i-false select-drop-btn-2"
                        >
                          <span>{campaignStatus}</span>
                          <i className="fa-regular fa-angle-down"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => setCampaignStatus("Campaign Status")}
                          >
                            Campaign Status
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => setCampaignStatus("open")}
                          >
                            open
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => setCampaignStatus("close")}
                          >
                            close
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => setCampaignStatus("pending")}
                          >
                            pending
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => setCampaignStatus("reject")}
                          >
                            reject
                          </Dropdown.Item>
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
        {/* <div className="input-group-prepend">
          <button className="btn" onClick={handleSearch}>
            <i className="las la-search"></i>
          </button>
        </div> */}
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
            <div className="tag-list">
              <span className="title text-black">Popular Search:</span>
              <Link to={"#"}>Education,</Link>
              <Link to={"#"}>Business,</Link>
              <Link to={"#"}>Creative,</Link>
              <Link to={"#"}>Medical</Link>
            </div>
          </div>
        </div>
        <section className="content-inner-2">
          <div className="container">
            <ProjectMasonry
              campaigns = {campaigns}
              page = {page}
              setPage = {setPage}
              searchText = {searchText}
            />
          </div>
        </section>
        <div className="call-action style-1 content-inner-1">
          <div className="container">
            <UpdateBlog />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProjects;
