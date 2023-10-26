import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

import PageBanner from "../layouts/PageBanner";
import ProjectMasonry from "../components/Project/ProjectMasonry";
import UpdateBlog from "../components/Home/UpdateBlog";

import bg from "../assets/images/banner/bnr5.jpg";
import axios from "axios";

const Project = () => {
  const [campaignType, setCampaignType] = useState("Campaign Type");
  const [campaignStatus, setCampaignStatus] = useState("Campaign Status");
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          status: "",
          campaign_type: "All Category",
          items_per_page: 12,
          page,
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
            data
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

      fetchData();
    
    // Call the async function
  }, [page,campaignType,campaignStatus]);
  return (
    <>
      <div className="page-content bg-white">
        <PageBanner
          maintitle="Project"
          pagetitle="Project"
          background={bg}
        />
        <div className="find-bx-wrapper">
          <div className="container">
            <div className="find-bx bg-white">
              <form>
                <div className="row align-items-center">
                  <div className="col-lg-3 col-md-4">
                    <div className="">
                      <Dropdown className="select-drop-2">
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
                      <Dropdown className="select-drop-2">
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
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-8">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Find Projects"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </div>
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

export default Project;
