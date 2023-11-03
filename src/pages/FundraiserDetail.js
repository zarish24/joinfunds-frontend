import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

import PageBanner from "../layouts/PageBanner";
import { CommentBlog } from "../components/BlogDetailsLeftBar";

import bg from "../assets/images/banner/bnr4.jpg";
import avat1 from "../assets/images/avatar/avatar1.jpg";
import avat2 from "../assets/images/avatar/avatar2.jpg";
import avat3 from "../assets/images/avatar/avatar3.jpg";
import avat4 from "../assets/images/avatar/avatar4.jpg";
import avat5 from "../assets/images/avatar/avatar5.jpg";
import blog1 from "../assets/images/blog/recent-blog/pic1.jpg";
import blog2 from "../assets/images/blog/recent-blog/pic2.jpg";
import UpdateBlog from "../components/Home/UpdateBlog";
import GallerySlider from "../components/Fundraiser/GallerySlider";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useNavigate } from 'react-router-dom';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews, { interval: 3000 });
const numDonorsPerPage = 4; 
const testimonials = [
  {
    profileImage: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'John Doe',
    amount: '$500',
  },
  {
    profileImage: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Jane Smith',
    amount: '$750',
  },
  {
    profileImage: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Alice Johnson',
    amount: '$600',
  },
  // Add more testimonials as needed
];


const postBlog = [
  { image: blog1, title: "How To Teach Education Like A Pro." },
  { image: blog2, title: "Quick and Easy Fix For Your Education." },
];
const teamBlog = [
  { title: "Jake Johnson", image: avat1 },
  { title: "Celesto Anderson", image: avat2 },
  { title: "John Doe", image: avat3 },
  { title: "Jake Johnson", image: avat4 },
];

const donorsBlog = [
  { title: "Celesto Anderson", image: avat5, price: "$ 1,812" },
  { title: "John Doe", image: avat4, price: "$ 1,564" },
  { title: "Celesto Anderson", image: avat3, price: "$ 1,225" },
  { title: "Jake Johnson", image: avat2, price: "$ 9,00" },
];

const FundraiserDetail = () => {
  const navigate = useNavigate(); 
  const { id } = useParams();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  
  const [modalDonate, setModalDonate] = useState(false);
  const [referModal, setReferModal] = useState(false);
  const [campaign, setCampaign] = useState({});
  const [comments, setComments] = useState([]);
  const [donners, setDonners] = useState([]);
  const [token, setToken] = useState("");
  const [daysLeft, setDaysLeft] = useState(0);
  const [reply, setReply] = useState(false);
  const [user_id, setUser_id] = useState("");
  const numDonorsPerPage = 4; // Number of donors displayed per group
  const maxSteps = Math.ceil(donners.length / numDonorsPerPage);
  const [paymentUpdate, setPaymentUpdate] = useState(false);
  const [comment_message, setComment_message] = useState('');
  const [formData, setFormData] = useState({
    compain_id: id,
    amount: 0,
    currency: "USD",
  });
  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      (prevActiveStep - 1 + maxSteps) % maxSteps
    );
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Use Bearer authentication, replace "Bearer" if you have a different authentication method
      },
    };
    const response = await axios
    .post(
      `${process.env.REACT_APP_BACKEND_URL}/api/payments/create-payment/${user_id}`,
      formData,config
    )
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        setPaymentUpdate(true)
        window.alert("Transaction has been completed successfully!");
        setFormData({
            ...formData,
            ["amount"]: 0,
          });
        setModalDonate(false)
      } else {
        window.alert(res.message);
      }
    })
    .catch((error) => {
      console.error("API request failed", error);
      setFormData({
        ...formData,
        ["amount"]: 0,
      });
      window.alert(error?.response?.data?.message);
      setModalDonate(false)
    });
   // setCampaigns(response.data); // Set the campaign data in state
    } catch (error) {
      window.alert("API request failed", error);
      console.error("API request failed", error.message);
    }
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
    const data = {
      campaign_id: id,
      user_id: user_id,
      comment_message: comment_message
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Use Bearer authentication, replace "Bearer" if you have a different authentication method
      },
    };
    const response = await axios
    .post(
      `${process.env.REACT_APP_BACKEND_URL}/api/compaign/createComment`,
      data,config
    )
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        setComment_message("")
      } else {
        // window.alert(res.message);
      }
    })
    .catch((error) => {
      console.error("API request failed", error);
      window.alert(error?.response?.data?.message);
    });
   // setCampaigns(response.data); // Set the campaign data in state
    } catch (error) {
      window.alert("API request failed", error);
      console.error("API request failed", error.message);
    }
  };
  useEffect(() => {
    const fetchData = async (_id,token) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Use Bearer authentication, replace "Bearer" if you have a different authentication method
          },
        };
        const response = await axios
          .get(
            `${process.env.REACT_APP_BACKEND_URL}/api/compaign/getSingleCompaign/${_id}`,config
          )
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              console.log("all-com", res);
              setCampaign(res?.data?.data?.doc);
              setDonners(res?.data?.data?.allDonners)
              const today = new Date();
              const startDate = new Date(res?.data?.data?.doc.start_date);
              const endDate = new Date(res?.data?.data?.doc.end_date);

              console.log("startDate:", startDate);
              console.log("endDate:", endDate);

              if (isNaN(startDate) || isNaN(endDate)) {
                console.log("Invalid date format");
                // Handle the case where the date format is invalid
              } else if (today > endDate) {
                // Campaign has ended
                setDaysLeft(0);
              } else if (today < startDate) {
                // Campaign hasn't started yet
                const timeDiff = startDate - today;
                const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                setDaysLeft(daysLeft);
              } else {
                // Campaign is ongoing
                const timeDiff = endDate - today;
                const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                console.log("daysLeft:", daysLeft);
                setDaysLeft(daysLeft);
              }
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
    setUser_id(user._id)
    if (user && user.token) {
      setToken(user.token)
      fetchData(id,user.token);
    }
    // Call the async function
  }, [id,paymentUpdate]);
  useEffect(() => {
    const fetchData = async (_id,token) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Use Bearer authentication, replace "Bearer" if you have a different authentication method
          },
        };
        const response = await axios
          .get(
            `${process.env.REACT_APP_BACKEND_URL}/api/compaign/getCompaignComments/${_id}`,config
          )
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              console.log("allff-com", res?.data?.data);
              setComments(res?.data?.data)
              
            } else {
              window.alert("Comments not fount due to some issue!");
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
    if (user && user.token) {
      fetchData(id,user.token);
    }
  }, [id,comment_message,reply]);
  return (
    <>
      <div className="page-content bg-white">
        <PageBanner
          maintitle="Fundraiser"
          pagetitle="Fundraiser Detail"
          background={bg}
        />
        <section className="content-inner-2">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-8 m-b30">
                <div className="fundraiser-single">
                  <div className="swiper fundraiser-gallery-wrapper">
                    <GallerySlider />
                  </div>
                  {console.log("titssle", campaign?.subtitle)}
                  <h2 className="title">{campaign?.subtitle}</h2>
                  <p>{campaign?.description}</p>
                  {/* <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."</p> */}

                  <h5>About the Fundraiser</h5>
                  <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat."
                  </p>
                  {console.log("sdds",user_id,campaign?.user_id)}
                  { user_id !== campaign?.user_id ? <>
                  <ul className="fundraiser-bottom">
                    <li>
                      <Link
                        to={"#"}
                        className="btn btn-primary btn-sm"
                        onClick={() => setModalDonate(true)}
                        data-bs-target="#modalDonate"
                      >
                        <i className="flaticon-like me-2"></i> Donate Now
                      </Link>
                    </li>
                    <li>
                      <a
                        href="https://www.facebook.com/login/"
                        target="_blank"
                        rel="noreferrer"
                        className="btn facebook btn-primary btn-sm"
                      >
                        <i className="fa-brands fa-facebook-square me-2"></i>{" "}
                        Spread The World
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://web.whatsapp.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="btn whatsapp btn-primary btn-sm"
                      >
                        <i className="fa-brands fa-whatsapp me-2"></i>Share
                      </a>
                    </li>
                  </ul></>: <></>}
                </div>
                <h5>Donners Detail</h5>
                <Box sx={{ maxWidth: 900, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          // height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        {/* <Typography variant="h6">{testimonials[activeStep].name}</Typography> */}
      </Paper>
      <AutoPlaySwipeableViews
         axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
         index={activeStep}
         onChangeIndex={handleStepChange}
         enableMouseEvents
      >
       {[...Array(maxSteps)].map((_, step) => (
  <div key={step}>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        p: 3,
      }}
    >
      {console.log("donners",donners)}
      {donners
        .slice(step * numDonorsPerPage, (step + 1) * numDonorsPerPage)
        .map((donor, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 3,
            }}
          >
            <img
              src={donor?.profileImage ? donor.profileImage : avat5}
              alt=""
              style={{
                height: 80,
                width: 80,
                borderRadius: '50%',
              }}
            />
            <Typography variant="subtitle1">
              {donor.firstName} {donor.lastName}
            </Typography>
            <Typography variant="body1">${donor.donated_amount}</Typography>
          </Box>
        ))}
    </Box>
  </div>
))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}  
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </Box>
                <div className="widget style-1 widget_refer">
                  <div className="widget-title">
                    <h4 className="title">Refer a Friend</h4>
                  </div>
                  <p>
                    In need of funds for medical treatment or know someone who
                    might be? Share the details and Akcel will get in touch
                    with.
                  </p>
                  <Link
                    to={"#"}
                    className="btn btn-outline-primary"
                    onClick={() => setReferModal(true)}
                  >
                    Refer Now
                  </Link>
                </div>
                <div className="clear" id="comment-list">
                  <div className="comments-area" id="comments">
                    <div className="widget-title style-1">
                      <h4 className="title">Comments</h4>
                    </div>
                    {console.log("comments",comments)}
                    <div className="clearfix">
                    <ol className="comment-list">
                    {comments.map((comment, index) => (
                    <li className="comment" key={comment._id}>
                      <CommentBlog
                        title={`${comment.user_detail[0].firstName} ${comment.user_detail[0].lastName}`}
                        image={comment.user_detail[0].profileImage ? comment.user_detail[0].profileImage : avat1}
                        comment_message={comment?.comment_message}
                        user_id={user_id}
                        commentId={comment._id}
                        setReply= {setReply}
                        reply = {reply}
                        
                      />
                      {comment.reply_messages.length > 0 && (
                        <ol className="children">
                          {comment.reply_messages.map((reply, replyIndex) => (
                            <li className="comment odd parent" key={reply._id}>
                              <CommentBlog
                                title={`${reply.user_detail[0].firstName} ${reply.user_detail[0].lastName}`}
                                image={reply.user_detail[0].profileImage ? reply.user_detail[0].profileImage : avat3}
                                comment_message={reply.reply_message}
                                user_id={user_id}
                                commentId={reply._id}
                                showReply= {false}
                              />
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  ))} 
                      </ol>
                      <div className="comment-respond" id="respond">
                        <div className="widget-title style-1">
                          <h4 className="title" id="reply-title">
                            Leave Your Comment
                            <small>
                              <Link
                                to={"#"}
                                style={{ display: "none" }}
                                id="cancel-comment-reply-link"
                                rel="nofollow"
                              >
                                Cancel reply
                              </Link>
                            </small>
                          </h4>
                        </div>
                        <form className="comment-form" id="commentform" onSubmit={handleCommentSubmit}>
                        <p className="comment-form-comment">
                          <label htmlFor="comment">Comment</label>
                          <textarea
                            rows="8"
                            name="comment_message"
                            placeholder="Comment here..."
                            id="comment"
                            value={comment_message}
                            onChange={(e) => setComment_message(e.target.value)}
                          ></textarea>
                        </p>
                        <p className="form-submit">
                          <button type="submit" className="btn btn-primary" id="submit">
                            SUBMIT
                          </button>
                        </p>
                      </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4">
                <aside className="side-bar sticky-top">
                { user_id !== campaign?.user_id ? <>
                  <div className="widget style-1 widget_donate">
                    <Link
                      to={"#"}
                      className="btn btn-donate btn-primary w-100"
                      data-bs-toggle="modal"
                      data-bs-target="#modalDonate"
                      onClick={() => setModalDonate(true)}
                    >
                      <i className="flaticon-like me-3"></i> Donate Now
                    </Link>
                    <div className="tagcloud">
                      <Link
                        to={"#"}
                        data-bs-toggle="modal"
                        data-bs-target="#modalDonate"
                      >
                        Cards
                      </Link>
                      <Link
                        to={"#"}
                        data-bs-toggle="modal"
                        data-bs-target="#modalDonate"
                      >
                        Net Banking
                      </Link>
                      <Link
                        to={"#"}
                        data-bs-toggle="modal"
                        data-bs-target="#modalDonate"
                      >
                        UPI
                      </Link>
                    </div>
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary facebook w-100 btn-bottom"
                    >
                      <i className="fa-brands fa-facebook-square me-2"></i>{" "}
                      Spread The World
                    </a>
                  </div></>:   
                 campaign?.status === "pending" || campaign?.status === "open" ? (
                  <button
                    style={{
                      backgroundColor: 'blue',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      marginBottom: "20px",
                      width: "356px",
                      height: "44px",
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      transition: 'background-color 0.3s'
                    }}
                    onClick={() => navigate(`/Edit-compaign/${campaign._id}`)}
                  >
                    Edit Campaign
                  </button>
                ) : null
                  }

                  {/* <!--  Widget Fund --> */}
                  <div className="widget style-1 widget_fund">
                    <h3 className="title">$ {campaign?.raised}</h3>
                    <p>
                      raised of <span>$ {campaign?.total_funding}</span> goal
                    </p>
                    <div className="progress-bx style-1">
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-secondary progress-bar-striped progress-bar-animated"
                          role="progressbar"
                          style={{ width: campaign?.progres }}
                        ></div>
                      </div>
                    </div>
                    <ul className="detail">
                      <li className="d-flex">
                        <h5>2422</h5>
                        <span className="ms-2">supporters</span>
                      </li>

                      <li className="d-flex">
                        <h5>{daysLeft}</h5>
                        <span className="ms-2">days left</span>
                      </li>
                    </ul>
                  </div>

                  {/* <!-- Fundraiser Post --> */}
                  <div className="widget style-1 recent-posts-entry">
                    <div className="widget-title">
                      <h5 className="title">Fundraiser Post</h5>
                    </div>
                    <div className="widget-post-bx">
                      {postBlog.map((data, ind) => (
                        <div className="widget-post clearfix" key={ind}>
                          <div className="dz-media">
                            <img src={data.image} alt="" />
                          </div>
                          <div className="dz-info">
                            <h6 className="title">
                              <Link to={"/blog-details"}>{data.title}</Link>
                            </h6>
                            <div className="dz-meta">
                              <ul>
                                <li className="post-date">
                                  <i className="flaticon-placeholder"></i>{" "}
                                  Coimbatore
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* <!-- Fundraising Team --> */}
                  <div className="widget style-1 widget_avatar">
                    <div className="widget-title">
                      <h5 className="title">Fundraising Team</h5>
                    </div>
                    <div className="avatar-wrapper">
                      {teamBlog.map((data, ind) => (
                        <div className="avatar-item" key={ind}>
                          <div className="avatar-media">
                            <img src={data.image} alt="" />
                          </div>
                          <div className="avatar-info">
                            <h6 className="title">
                              <Link to={"#"}>{data.title}</Link>
                            </h6>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* <!-- Top Donors --> */}
                  <div className="widget style-1 widget_avatar">
                    <div className="widget-title">
                      <h5 className="title">Top Donors</h5>
                    </div>
                    <div className="avatar-wrapper">
                      {campaign?.donors_detail?.map((item, ind) => (
                        <div className="avatar-item" key={ind}>
                          <div className="avatar-media">
                            <img src={item?.profileImage ? item?.profileImage : avat5 } alt="" />
                          </div>
                          <div className="avatar-info">
                            <h6 className="title">
                              <Link to={"#"}>{item.firstName} {item.lastName}</Link>
                            </h6>
                            <span className="donors-item">$ {item.donated_amount}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>
        <div className="call-action style-1 content-inner-1">
          <div className="container">
            <UpdateBlog />
          </div>
        </div>
      </div>
      <Modal
        className="modal fade modal-wrapper"
        id="modalRefer"
        show={referModal}
        onHide={setReferModal}
        centered
      >
        <div className="modal-header">
          <h5 className="modal-title">Refer a Friend</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setReferModal(false)}
          >
            <i className="flaticon-close"></i>
          </button>
        </div>
        <div className="modal-body">
          <form className="dz-form contact-bx" method="POST">
            <div className="form-group style-1 align-items-center">
              <label className="form-label">Name</label>
              <div className="input-group">
                <input
                  name="dzName"
                  required=""
                  type="text"
                  className="form-control"
                  placeholder="Jakob Bothman"
                />
              </div>
            </div>
            <div className="form-group style-1 align-items-center">
              <label className="form-label">Email address</label>
              <div className="input-group">
                <input
                  name="dzEmail"
                  required=""
                  type="text"
                  className="form-control"
                  placeholder="marseloque@mail.com"
                />
              </div>
            </div>
            <div className="form-group style-1 align-items-center">
              <label className="form-label">Phone Number</label>
              <div className="input-group">
                <input
                  name="dzPhoneNumber"
                  type="number"
                  className="form-control"
                  placeholder="Phone Number"
                />
              </div>
            </div>
            <div className="form-group mb-0 text-center">
              <button
                name="submit"
                type="submit"
                value="Submit"
                className="btn btn-primary"
              >
                Refer Now
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        className="modal fade modal-wrapper"
        id="modalDonate"
        show={modalDonate}
        onHide={setModalDonate}
      >
        <div className="modal-header">
          <h5 className="modal-title">Choose a donation amount</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setModalDonate(false)}
          >
            <i className="flaticon-close"></i>
          </button>
        </div>
        <div className="modal-body">
          <div className="col-lg-12">
            <div className="form-group">
              <label className="form-label">Amount</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <label className="form-label">Currency</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group mb-0 text-center">
              <button
                name="submit"
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block"
                onClick={handleSubmit} // Add this line
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FundraiserDetail;
