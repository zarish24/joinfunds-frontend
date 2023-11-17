import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./styles.module.scss";
import Box from "@mui/material/Box";
import { ThreeDots } from "../../../node_modules/react-loader-spinner/dist/index";
import { Tabs, Tab, Typography, Pagination } from "@mui/material";
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
const RecordsPerPage = 12;

const ProjectMasonry = (props) => {
  console.log("props-data", props.searchText);

  //  const { page, setPage } = props;
  const [loading, setLoading] = useState(false);
  const cardData = props.campaigns;
  const [dropbtn, setDropbtn] = useState("Newest");
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState("All");

  useEffect(() => {
    // Initialize filtered with the data from props when the component mounts
    setFiltered(cardData);
    setPopular(cardData);
  }, [cardData]);

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
            <ul
              className="filters justify-content-between"
              data-bs-toggle="buttons"
            >
              <li className={`btn ${activeGenre === "All" ? "active" : ""}`}>
                <Link to={"#"} onClick={() => setActiveGenre("All")}>
                  All Projects
                </Link>
              </li>
              <li
                data-filter=".Technology"
                className={`btn ${activeGenre === "Medical" ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre("Medical")}>
                  Medical
                </Link>
              </li>
              <li
                data-filter=".Medical"
                className={`btn ${activeGenre === "Memorial" ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre("Memorial")}>
                  Memorial
                </Link>
              </li>
              <li
                data-filter=".Business"
                className={`btn ${activeGenre === "Emergency" ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre("Emergency")}>
                  Emergency
                </Link>
              </li>
              <li
                data-filter=".Fashion"
                className={`btn ${activeGenre === "Nonprofit" ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre("Nonprofit")}>
                  Nonprofit
                </Link>
              </li>
              <li
                data-filter=".Technology"
                className={`btn ${activeGenre === "Education" ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre("Education")}>
                  Education
                </Link>
              </li>
              <li
                data-filter=".Medical"
                className={`btn ${activeGenre === "Animals" ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre("Animals")}>
                  Animals
                </Link>
              </li>
              <li
                data-filter=".Business"
                className={`btn ${activeGenre === "Business" ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre("Business")}>
                  Business
                </Link>
              </li>
              <li
                data-filter=".Fashion"
                className={`btn ${activeGenre === "Community" ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre("Community")}>
                  Community
                </Link>
              </li>
              <li
                data-filter=".Technology"
                className={`btn ${activeGenre === "Creative" ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre("Creative")}>
                  Creative
                </Link>
              </li>
              <li
                data-filter=".Medical"
                className={`btn ${
                  activeGenre === "Current Events" ? "active" : ""
                }`}
              >
                <Link to={"#"} onClick={() => setActiveGenre("Current Events")}>
                  Current Events
                </Link>
              </li>
              <li
                data-filter=".Business"
                className={`btn ${activeGenre === "Event" ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre("Event")}>
                  Event
                </Link>
              </li>
              <li
                data-filter=".Fashion"
                className={`btn ${activeGenre === "Faith" ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre("Faith")}>
                  Faith
                </Link>
              </li>
              <li
                data-filter=".Technology"
                className={`btn ${activeGenre === "Family" ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre("Family")}>
                  Family
                </Link>
              </li>
              <li
                data-filter=".Medical"
                className={`btn ${activeGenre === "Sport" ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre("Sport")}>
                  Sport
                </Link>
              </li>
              <li
                data-filter=".Business"
                className={`btn ${activeGenre === "Travel" ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre("Travel")}>
                  Travel
                </Link>
              </li>
              <li
                data-filter=".Fashion"
                className={`btn ${activeGenre === "Veteran" ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre("Veteran")}>
                  Veteran
                </Link>
              </li>
              <li
                data-filter=".Medical"
                className={`btn ${activeGenre === "Legal" ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre("Legal")}>
                  Legal
                </Link>
              </li>
              <li
                data-filter=".Business"
                className={`btn ${activeGenre === "General" ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre("General")}>
                  General
                </Link>
              </li>
              <li
                data-filter=".Fashion"
                className={`btn ${activeGenre === "Mission" ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre("Mission")}>
                  Mission
                </Link>
              </li>
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
          {console.log("fileterData", filtered)}
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
    (filtered &&
      Array.isArray(filtered) &&
      filtered.length === 0) ? (
        <Box
          className={styles.noDataFound}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4">
            No Campaign Found. Go to Previous Page!
          </Typography>
        </Box>
      ) : (
        Array.isArray(filtered) && filtered.length > 0 ? (
          filtered.map((item, index) => {
            const progressValue = parseInt(item.progres, 10);
            console.log("progressValue", progressValue);
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
                        <Link to={"#"}>{item.title}</Link>
                      </li>
                    </ul>
                    <h5 className="dz-title">
                      <Link to={`/fundraiser-detail/${item._id}`}>
                        {item.title.length > 25
                          ? item.title.slice(0, 25) + "..."
                          : item.title}
                      </Link>
                    </h5>
      
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
                        <img src={item.user_detail[0].profileImage} alt="" />
                      </div>
                      <div className="author-content">
                        <div className="author-head">
                          <h6 className="author-name">{item.user_detail[0].firstName} {item.user_detail[0].lastName}</h6>
                          <ul className="rating-list">
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
                          </ul>
                        </div>
                        <ul className="author-meta">
                          <li className="campaign">12 Campaign</li>
                          <li className="location">New York, London</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })
        ) : (
          // Add a fallback JSX if filtered is not an array or has length 0
          <p>No data available</p>
        )
      )
  )}
</AnimatePresence>

        </ul>
      </div>
      <div className="row">
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
      </div>

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
