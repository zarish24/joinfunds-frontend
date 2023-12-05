import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./styles.module.scss";
import Box from "@mui/material/Box";
import { ThreeDots } from "../../../node_modules/react-loader-spinner/dist/index";
import { Tabs, Tab, Typography, Pagination } from "@mui/material";
import { Switch as AntSwitch } from 'antd';
//images
import pic1 from "../../assets/images/project/pic1.jpg";
import pic2 from "../../assets/images/project/pic2.jpg";
import pic3 from "../../assets/images/project/pic3.jpg";
import pic4 from "../../assets/images/project/pic4.jpg";
import pic5 from "../../assets/images/project/pic5.jpg";
import pic6 from "../../assets/images/project/pic6.jpg";
import pic7 from "../../assets/images/project/pic7.jpg";
import pic8 from "../../assets/images/project/pic8.jpg";
import pic9 from "../../assets/images/project/pic9.jpg";
import pic10 from "../../assets/images/project/pic10.jpg";
import pic11 from "../../assets/images/project/pic11.jpg";
import pic12 from "../../assets/images/project/pic12.jpg";

import avat1 from "../../assets/images/avatar/avatar1.jpg";
import avat2 from "../../assets/images/avatar/avatar2.jpg";
import avat3 from "../../assets/images/avatar/avatar3.jpg";
import avat4 from "../../assets/images/avatar/avatar4.jpg";
import avat5 from "../../assets/images/avatar/avatar5.jpg";
import avat6 from "../../assets/images/avatar/avatar6.jpg";
import avat7 from "../../assets/images/avatar/avatar7.jpg";
import avat8 from "../../assets/images/avatar/avatar8.jpg";
import avat9 from "../../assets/images/avatar/avatar9.jpg";
import clipboardCopy from 'clipboard-copy';
import axios from "axios";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton, 
  TelegramShareButton,
 } from 'react-share';
 
 import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon , // add this
  TelegramIcon , // add this
 } from 'react-share';
 import { toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';


const RecordsPerPage = 12;

const ProjectMasonry = (props) => {
  console.log("props-data", props.searchText);

  //  const { page, setPage } = props;
  const [loading, setLoading] = useState(false);
  const cardData = props.campaigns;
console.log('categories cardData',cardData)

  const [dropbtn, setDropbtn] = useState("Newest");
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState("All");
const [isShareModalOpen, setShareModalOpen] = useState(false);
const [shareItemId, setShareItemId] = useState(null);
const [titleOptions, setTitleOptions] = useState([]);
const toggleShareModal = (itemId) => {
  setShareItemId(itemId);
  setShareModalOpen(!isShareModalOpen);

};
// console.log('categories titleOptions',titleOptions)
const handleSwitchToggle = async (campaignId, checked) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token= user?.token;
  try {
    setLoading(true);
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/compaign/publish/${campaignId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('response',response)
    if (response.data.status === "success") {
     toast.success(`Campaign  Published successfully`)
     props.fetchData();
     console.log(`Campaign  Published successfully!`);
     setLoading(false);
    } else {
      
      console.error('Failed to update campaign:', response.statusText);
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error('An unexpected error occurred:', error);
  }
};
useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
 const token= user?.token;
  const fetchCategories = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      };
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/category/getCategories`,config);
    
      if (response.status === 200) {
        
        const categories = response.data.categories
        // console.log('categories',categories)

        setTitleOptions(categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  fetchCategories();
}, []);


const handleCopyUrl = async (url) => {
  try {
    await clipboardCopy(url);
   
    toast.success('URL copied to clipboard!');
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
};


  // useEffect(() => {
  //   // Initialize filtered with the data from props when the component mounts
  //   setFiltered(cardData);
  //   setPopular(cardData);
  // }, [cardData]);

  useEffect(() => {
    if (activeGenre === "All") {
      setFiltered(popular);
    } else {
      // Filter based on the selected genre title
      const filtered = popular.filter((card) => card.title === activeGenre);
      setFiltered(filtered);
    }
    if (props?.searchText !== "") {
      const filteredProjects = popular.filter((project) =>
        project.subtitle
          ?.toLowerCase()
          ?.includes(props.searchText?.toLowerCase())
      );
      console.log("ffff", filteredProjects);
      setFiltered(filteredProjects);
    }
  }, [activeGenre, popular, props?.searchText]);

  const goToNextPage = () => {
    console.log("functioncall", Math.ceil(cardData.length / RecordsPerPage));
    // if (props.page < Math.ceil(cardData.length / RecordsPerPage)) {
    setLoading(true);
    setTimeout(() => {
      props.setPage(props.page + 1);
      setLoading(false);
    }, 1000); // Simulate loading for 1 second (adjust as needed)
    // }
  };

  const goToPreviousPage = () => {
    if (props.page > 1) {
      setLoading(true);
      setTimeout(() => {
        props.setPage(props.page - 1);
        setLoading(false);
      }, 1000); // Simulate loading for 1 second (adjust as needed)
    }
  };
  return (
    <>
      <div className="row m-b30">
        <div className="col-xl-10 col-lg-9">
          <div className="site-filters style-1 clearfix">
          <ul className="filters justify-content-between" data-bs-toggle="buttons">
          <li className={`btn ${activeGenre === 'All' ? "active" : ""}`}>
  <Link to={"#"} onClick={() => { setActiveGenre('All'); props.setCategoryId(''); }}>
    All
  </Link>
</li>
  {titleOptions.map((option) => (
    <li key={option._id} className={`btn ${activeGenre === option.name ? "active" : ""}`}>
      <Link to={"#"} onClick={() => { setActiveGenre(option.name); props.setCategoryId(option._id); }}>
        {option.name}
      </Link>
    </li>
  ))} 

</ul>
          </div>
        </div>
        {/* <div className="col-xl-2 col-lg-3 text-start text-lg-end m-b20">
                    <Dropdown className="select-drop">
                        <Dropdown.Toggle as="div" className="i-false select-drop-btn">
                            <span>{dropbtn}</span>
                            <i className="fa-regular fa-angle-down"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>setDropbtn('Newest')}>Newest</Dropdown.Item>
                            <Dropdown.Item onClick={()=>setDropbtn('Oldest')}>Oldest</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div> */}
      </div>
      <div className="clearfix">
        <ul
          //layout
          id="masonry"
          className="row"
          //transition={{ duration: 0.3 }}
        >
          {/* {console.log("fileterData", filtered)} */}
          <AnimatePresence>
      {loading ? (
        <Box
          className={styles.centeredBox}
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="20vh"
        >
          <ThreeDots color="#E6007C" width={50} height={50} />
        </Box>
      ) : (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="row"
        >
        {Array.isArray(cardData) && cardData.length > 0 ? (
            cardData.map((item, index) => {
              console.log('item item',item)
              const progressValue = parseInt(item.progress, 10);
              
              // console.log("progressValue", progressValue);
              return (
                <motion.li
                layout
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="card-container col-xl-4 col-lg-6 col-md-6 col-sm-12 Fashion m-b30"
                key={index}
              >
                <div className="dz-card style-2 overlay-skew">
                  <div className={`dz-media ${styles.cardImgWrapper}`}>
                    <Link to={`/fundraiser-detail/${item._id}`}>
                    <img src={item?.campaign_images[0]?.url ? item?.campaign_images[0]?.url : avat3} alt="" />
                    </Link>
                  </div>
                  <div className="dz-info">
                    <ul className="dz-category">
                      <li>
                        <Link to={"#"}>Campaign</Link>
                      </li>
                    </ul>
                    <div className="d-flex justify-content-between align-items-end">
                    <div>
                    <h5 className="dz-title">
                      <Link to={`/fundraiser-detail/${item._id}`} title={item.title}>
                        {item.title.length > 15
                          ? item.title.slice(0, 15) + "..."
                          : item.title}
                      </Link>
                      </h5>
                      </div>

                      <div className="mb-2">
                      {item.published ? (
          <button
          onClick={() => {
            toggleShareModal(item._id);
            handleCopyUrl(`${process.env.REACT_APP_BACKEND_URL}/fundraiser-detail/${item._id}`);
        }}        
            className="btn share-button float-right"
          >
            <i className="fas fa-share"></i>
          </button>
        ) : (
         <>
 <div className="d-grid ">
      <label>
        Publish </label>
        <AntSwitch
          checked={false}
          className="ml-2" // Adjust margin as needed
          onChange={(checked) => {
            // Replace 'handleSwitchToggle' with your actual function
            handleSwitchToggle(item._id, checked);
          }}
        />
     
    </div>
</>

            )}
</div>

                    
                    </div>
                    {isShareModalOpen && (
                        
                        <div className="share-modal">
                          <FacebookShareButton url={`${process.env.REACT_APP_BACKEND_URL}/fundraiser-detail/${shareItemId}`}>
                              <FacebookIcon size={32} round />
                          </FacebookShareButton>
                          <TwitterShareButton url={`${process.env.REACT_APP_BACKEND_URL}/fundraiser-detail/${shareItemId}`}>
                            <TwitterIcon size={32} round />
                          </TwitterShareButton>
                          <LinkedinShareButton url={`${process.env.REACT_APP_BACKEND_URL}/fundraiser-detail/${shareItemId}`}>
                            <LinkedinIcon size={32} round />
                          </LinkedinShareButton>
                          <WhatsappShareButton url={`${process.env.REACT_APP_BACKEND_URL}/fundraiser-detail/${shareItemId}`}>
                            <WhatsappIcon size={32} round />
                          </WhatsappShareButton>
                          <TelegramShareButton url={`${process.env.REACT_APP_BACKEND_URL}/fundraiser-detail/${shareItemId}`}>
                            <TelegramIcon size={32} round />
                          </TelegramShareButton>                          
                        </div>
                      )}
                    <div className="progress-bx style-1">
                      <div className="progress">
                        <div
                          className={`progress-bar ${
                            progressValue >= 60
                              ? "bg-success"
                              : progressValue >= 30
                              ? "bg-warning"
                              : "bg-danger"
                          } progress-bar-striped progress-bar-animated`}
                          style={{ width: `${progressValue}%` }}
                        ></div>
                      </div>
                      <ul className="progress-tag">
                        <li className="raised">
                          <i className="las la-coins"></i> Raised:{" "}
                          <span className="text-primary">
                            $ {item.raised}
                          </span>
                        </li>
                        <li className="goal">
                          <i className="lar la-calendar"></i> Goal:{" "}
                          <span className="text-primary">
                            ${item.total_funding}
                          </span>
                        </li>
                      </ul>
                    </div>
      
                    <div className="author-wrappper">
                      <div className="author-media">
                        <img src={item?.user_detail?.profileImage} alt="" />
                      </div>
                      <div className="author-content">
                        <div className="author-head">
                          <h6 className="author-name">{item?.user_detail?.firstName} {item?.user_detail?.lastName}</h6>
                          {/* <ul className="rating-list">
                            <li>
                              <i className="fa fa-star"></i>
                            </li>{" "}
                            <li>
                              <i className="fa fa-star"></i>
                            </li>{" "}
                            <li>
                              <i className="fa fa-star"></i>
                            </li>{" "}
                            <li>
                              <i className="fa fa-star gray-light"></i>
                            </li>{" "}
                            <li>
                              <i className="fa fa-star gray-light"></i>
                            </li>
                          </ul> */}
                        <ul style={{ marginLeft: '16vh', display: 'flex', justifyContent: 'flex-end', listStyle: 'none', padding: 0 }}>
  <li key={item._id} className="dz-date">
    <i className="fa-solid fa-calendar" style={{ marginRight: '1vh',color: 'rgb(0,39,104)' }}></i>
    <span>
      {item?.remain_days} Days Left
    </span>
  </li>
</ul>
                        </div>
                        {/* <ul className="author-meta">
                          <li className="campaign">{item?.user_detail[0]?.publishedCampaignsCount} Campaign</li>
                          <li className="location">{item?.user_detail[0]?.country},{item?.user_detail[0]?.city}</li>
                        </ul> */}
                         
                      </div>
                    </div>
                  </div>
                </div>
              </motion.li>
              );
            })
          ) : (
            // Add a fallback JSX if cardData is not an array or has length 0
            <p>No Campaigns available</p>
          )}
        </motion.ul>
      )}
    </AnimatePresence>


        </ul>
      </div>
      {/* <div className="row">
        <div className="col-12 m-sm-t0 m-t30">
          <nav className="pagination-bx">
            <div className="page-item">
              <Link
                to={"#"}
                className="page-link prev"
                onClick={goToPreviousPage}
              >
                <i className="fas fa-chevron-left"></i>
              </Link>
            </div>
            <ul className="pagination">
              {Array.from({ length: props.page + 1 }, (_, i) => (
                <li
                  className={`page-item ${
                    i + 1 === props.page ? "active" : ""
                  }`}
                  key={i}
                >
                  <Link
                    to={"#"}
                    className="page-link"
                    onClick={() => props.setPage(i + 1)}
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
      </div> */}

      {/* <div className="row">
                <div className="col-12 m-sm-t0 m-t30">		
                    <nav className="pagination-bx">
                        <div className="page-item">
                            <Link to={"#"} className="page-link prev"><i className="fas fa-chevron-left"></i></Link>
                        </div>
                        <ul className="pagination">
                            <li className="page-item"><Link to={"#"} className="page-link">1</Link></li>
                            <li className="page-item"><Link to={"#"} className="page-link active">2</Link></li>
                            <li className="page-item"><Link to={"#"} className="page-link">3</Link></li>
                            <li className="page-item"><Link to={"#"} className="page-link">4</Link></li>
                        </ul>
                        <div className="page-item">
                            <Link to={"#"} className="page-link next"><i className="fas fa-chevron-right"></i></Link>
                        </div>
                    </nav>
                </div>
            </div>  */}
    </>
  );
};

export default ProjectMasonry;
