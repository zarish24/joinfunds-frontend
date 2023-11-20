import React, { useState, useEffect, useReducer, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import styles from "./styles.module.scss";
import Google from "../assets/icons/social-login/google.svg";
import Collapse from "react-bootstrap/Collapse";
import { MenuListArray3 } from "./Menu";
import { IMAGES } from "../constant/theme";
import DonateModal from "../components/Modal/DonateModal";
import { LoginSocialGoogle } from "reactjs-social-login";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Box,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
} from "../../node_modules/@mui/material/index";
import { ThreeDots } from "../../node_modules/react-loader-spinner/dist/index";
import axios from "axios";

const Header = ({ onShowDonate, changeStyle, changeLogo }) => {
  const [loginModal, setloginModal] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [email, setEmail] = useState("");
  const [FirstN, setFirstN] = useState("");
  const [LastN, setLastN] = useState("");
  const [Zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [MediaLink, setMediaLink] = useState("");
  const [City, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [callOnClick, setCallOnClick] = useState(true);
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const handleStorageChange = () => {
      //   console.log("Storage changed");
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const validatePassword = (password) => {
   
   
    const hasMinimumLength = password.length >= 8;

    
    const hasCapitalLetter = /[A-Z]/.test(password);

  
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    
    const hasNumber = /\d/.test(password);

    return hasMinimumLength && hasCapitalLetter && hasSpecialCharacter && hasNumber;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError('')
    
  };

 
  const validatePhone = (value) => {
    const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
  
    if (!/^\+?1?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/.test(value)) {
      setPhoneError('Please enter a valid American phone number');
      return false;
    } else {
      setPhoneError('');
      return true;
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;

    // Validate the phone number
    // if (validatePhone(value)) {
      setPhone(value);
    // }
  };




  const nav = useNavigate();
  const formSubmit = async (e, apiEndpoint) => {
    e.preventDefault();
    
 
    let data = {
      email: email,
      password: password,
      firstName: FirstN,
      lastName: LastN,
      country: country,
      city: City,
      zipcode: Zip,
      phoneNumber: `+${phone}`,
      socialMediaProfile: MediaLink,
    };
    if (apiEndpoint === "api/user/register") {

      const validateAmericanPhoneNumber = (phoneNumber) => {
      
        const numericValue = phoneNumber.replace(/\D/g, '');
      
        return /^1?\d{10}$/.test(numericValue);
      };
    
      if (!validateAmericanPhoneNumber(`+${phone}`)) {
        toast.error('Please enter a valid American phone number.');
        return;
      }
    
      // Validate the password
      if (!validatePassword(password)) {
        toast.error('Password must be 8 characters long and include a capital letter, a special character, and a number.');
        return;
      }
      data = {
        email: email,
        password: password,
        firstName: FirstN,
        lastName: LastN,
        country: 'america',
        city: City,
        zipcode: Zip,
        phoneNumber: `+${phone}`,
        socialMediaProfile: MediaLink,
      };
    }
    if (apiEndpoint === "api/user/login") {
      data = {
        email: email,
        password: password,
      };
    }
    if (apiEndpoint === "api/user/sendForgetEmail") {
      data.email = email;
    } else {
      data.email = email;
      data.password = password;
    }
    const response = await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/${apiEndpoint}`, data)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setEmail("");
          setPassword("");
          setSignupModal(false);
          //   console.log("res rsgister", res);
          //   console.log("res res.data.message", res.data);
          toast.success(
            res?.data?.data?.message
              ? res?.data?.data?.message
              : res?.data?.message
          );
          // Store user information in local storage
          localStorage.setItem(
            "user",
            JSON.stringify({
              _id: res?.data?.user?._id,
              // city: res?.data?.user?.city,
              // country: res?.data?.user?.country,
              // phone: res?.data?.user?.phoneNumber,
              // link: res?.data?.user?.socialMediaProfile,
              // zip: res?.data?.user?.zipcode,
              // firstName: res?.data?.user?.firstName,
              // lastName: res?.data?.user?.lastName,
              // email: res?.data?.user?.email,
              // role: res?.data?.user?.role,
              // profileImage: res?.data?.user?.profileImage,
              token: res?.data?.token,
            })
          );
          if (loginModal === true) {
            localStorage.setItem("isLoggedIn", "true");
            setIsLoggedIn(true);
            setSignupModal(false);
            // toast.success(
            //   res?.data?.data?.message
            //     ? res?.data?.data?.message
            //     : res?.data?.message
            // );
            //   console.log("function-called", true);
            setloginModal(false);
            setSignupModal(false);
            navigate("/");
          } else {
            //   console.log("function-called", false);
            setloginModal(true);
          }
        } else {
          toast.error("Authentication failed. Please check your credentials.");
        }
      })
      .catch((e) => {
        toast.error(
          e?.response?.data?.message
            ? e?.response?.data?.message
            : e?.response?.data
        );
      });
  };

  /* for sticky header */
  const [headerFix, setheaderFix] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setheaderFix(window.scrollY > 50);
    });
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    var mainMenu = document.getElementById("OpenMenu");
    if (mainMenu) {
      if (sidebarOpen) {
        mainMenu.classList.add("show");
      } else {
        mainMenu.classList.remove("show");
      }
    }
  });

  // Menu dropdown list
  const reducer = (previousState, updatedState) => ({
    ...previousState,
    ...updatedState,
  });
  const initialState = {
    active: "",
    activeSubmenu: "",
  };
  const [state, setState] = useReducer(reducer, initialState);
  const handleMenuActive = (status) => {
    setState({ active: status });
    if (state.active === status) {
      setState({ active: "" });
    }
  };
  const handleSubmenuActive = (status) => {
    setState({ activeSubmenu: status });
    if (state.activeSubmenu === status) {
      setState({ activeSubmenu: "" });
    }
  };
  //let path = window.location.pathname;
  const [sideOverlay, setSideOverlay] = useState(false);

  const modalRef = useRef(null);

  return (
    <>
      <header className={`site-header mo-left header style-2 ${changeStyle}`}>
        <div
          className="sticky-header main-bar-wraper navbar-expand-lg is-fixed">
          <div className="main-bar clearfix ">
            <div className="container-fluid clearfix">
              {changeLogo ? (
                <>
                  <div className="logo-header mostion logo-dark">
                    <Link to={"/index-3"}>
                      <img
                        src={IMAGES.logo3}
                        alt=""
                        style={{ height: "60px", width: "112px" }}
                      />
                    </Link>
                  </div>
                  <div className="logo-header mostion logo-light">
                    <Link to={"/index-3"}>
                      <img
                        src={IMAGES.logo3}
                        style={{ height: "60px", width: "112px" }}
                        alt=""
                      />
                    </Link>
                  </div>
                </>
              ) : (
                <div className="logo-header mostion logo-dark">
                  <Link to={"/"}>
                    <img
                      src={IMAGES.logo2}
                      style={{ height: "60px", width: "112px" }}
                      alt=""
                    />
                  </Link>
                </div>
              )}
              <button
                type="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`navbar-toggler navicon justify-content-end ${
                  sidebarOpen ? "open" : "collapsed"
                }`}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              <div
                className={`header-nav navbar-collapse collapse justify-content-start ${
                  sidebarOpen ? "show" : ""
                }`}
              >
                <div className="logo-header logo-dark">
                  {changeLogo ? (
                    <Link to={"/"}>
                      <img
                        src={IMAGES.logo3}
                        style={{ height: "60px", width: "112px" }}
                        alt=""
                      />
                    </Link>
                  ) : (
                    <Link to={"/"}>
                      <img
                        src={IMAGES.logo2}
                        style={{ height: "60px", width: "112px" }}
                        alt=""
                      />
                    </Link>
                  )}
                </div>
                <ul className="nav navbar-nav navbar navbar-left">
                  {/* <li><Link to={"/index-3"}>Home</Link></li> */}
                  {MenuListArray3.map((data, index) => {
                    let menuClass = data.classChange;

                    if (data.title === "My Account" && !isLoggedIn) {
                      return null; // Skip rendering "Setting" when not logged in
                    }

                    if (menuClass !== "sub-menu-down") {
                      return (
                        <li className={menuClass} key={index}>
                          <Link to={data.to}>{data.title}</Link>
                        </li>
                      );
                    } else {
                      return (
                        <li
                          className={`${menuClass} ${
                            state.active === data.title ? "open" : ""
                          }`}
                          key={index}
                        >
                          {data.content && data.content.length > 0 ? (
                            <>
                              <Link
                                to={"#"}
                                onClick={() => {
                                  handleMenuActive(data.title);
                                }}
                              >
                                {data.title}
                              </Link>
                            </>
                          ) : (
                            <Link to={data.to}>{data.title}</Link>
                          )}
                          <ul
                            className={`sub-menu ${
                              menuClass === "mm-collapse" ? "open" : ""
                            }`}
                          >
                            {data.content &&
                              data.content.map((submenuItem, subIndex) => {
                                if (
                                  !isLoggedIn &&
                                  (submenuItem.title === "Create Compaign" ||
                                    submenuItem.title === "My Project")
                                ) {
                                  return null; // Skip rendering "Create Compaign" and "My Project" when not logged in
                                }

                                return (
                                  <li
                                    key={subIndex}
                                    className={`${
                                      state.activeSubmenu === submenuItem.title
                                        ? "open"
                                        : ""
                                    }`}
                                  >
                                    {submenuItem.content &&
                                    submenuItem.content.length > 0 ? (
                                      <>
                                        <Link
                                          to={submenuItem.to}
                                          onClick={() => {
                                            handleSubmenuActive(
                                              submenuItem.title
                                            );
                                          }}
                                        >
                                          {submenuItem.title}
                                          <i className="fa fa-angle-right" />
                                        </Link>
                                        <Collapse
                                          in={
                                            state.activeSubmenu ===
                                            submenuItem.title
                                              ? true
                                              : false
                                          }
                                        >
                                          <ul
                                            className={`sub-menu ${
                                              menuClass === "mm-collapse"
                                                ? "open"
                                                : ""
                                            }`}
                                          >
                                            {submenuItem.content &&
                                              submenuItem.content.map(
                                                (subSubItem, subSubIndex) => {
                                                  return (
                                                    <li key={subSubIndex}>
                                                      <Link to={subSubItem.to}>
                                                        {subSubItem.title}
                                                      </Link>
                                                    </li>
                                                  );
                                                }
                                              )}
                                          </ul>
                                        </Collapse>
                                      </>
                                    ) : (
                                      <Link to={submenuItem.to}>
                                        {submenuItem.title}
                                      </Link>
                                    )}
                                  </li>
                                );
                              })}
                          </ul>
                        </li>
                      );
                    }
                  })}
                  {/* {//   console.log("log", isLoggedIn)} */}
                  {!isLoggedIn && (
                    <>
                      {/* <li>
                        <Link
                          to={"#"}
                          data-bs-toggle="modal"
                          data-bs-target="#modalLogin"
                          onClick={() => setSideOverlay(!sideOverlay)}
                        >
                          Contact Us
                        </Link>
                      </li> */}
                      <li>
                        <Link
                          to={"#"}
                          data-bs-toggle="modal"
                          data-bs-target="#modalLogin"
                          onClick={() => setloginModal(true)}
                        >
                          Login / Sign Up
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
                <div className="header-bottom">
                  <Link
                    to={"#"}
                    className="btn btn-light btn-login btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#modalLogin"
                    onClick={() => setloginModal(true)}
                  >
                    <i className="flaticon-logout me-3"></i>Login / Sign Up
                  </Link>
                  <div className="dz-social-icon">
                    <ul>
                      <li>
                        <a
                          className="fab fa-facebook-f"
                          href="https://www.facebook.com/"
                          target="_blank"
                          rel="noreferrer"
                        ></a>
                      </li>
                      <li>
                        <a
                          className="fab fa-twitter"
                          href="https://twitter.com/"
                          target="_blank"
                          rel="noreferrer"
                        ></a>
                      </li>
                      <li>
                        <a
                          className="fab fa-linkedin-in"
                          href="https://www.linkedin.com/"
                          target="_blank"
                          rel="noreferrer"
                        ></a>
                      </li>
                      <li>
                        <a
                          className="fab fa-instagram"
                          href="https://www.instagram.com/"
                          target="_blank"
                          rel="noreferrer"
                        ></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={`contact-sidebar ${sideOverlay ? "active" : ""}`}>
        <div className="contact-box">
          <div className="logo-contact logo-dark">
            {changeLogo ? (
              <Link to={"/"}>
                <img src={IMAGES.logo3} alt="" />
              </Link>
            ) : (
              <Link to={"/"}>
                <img src={IMAGES.logo2} alt="" />
              </Link>
            )}
          </div>
          <div className="m-b50 contact-text">
            <div className="dz-title">
              <h4>About us</h4>
              <div className="dz-separator style-1 text-primary mb-0"></div>
            </div>
            <p>
              Aliquam erat massa porttitor vel egestas sit tristique ultricies
              lorem aliquet venenatis libero a nulla placerat egestas.
            </p>
            <Link to={"/about-us"} className="btn btn-primary btn-sm">
              READ MORE
            </Link>
          </div>
          <div className="dz-title">
            <h4>Contact Info</h4>
            <div className="dz-separator style-1 text-primary mb-0"></div>
          </div>
          <div className="icon-bx-wraper left">
            <div className="icon-md m-r20">
              <span className="icon-cell">
                <i className="las la-phone-volume"></i>
              </span>
            </div>
            <div className="icon-content">
              <h5 className="tilte">Call Now</h5>
              <p className="m-b0">
                +91 123 456 7890,
                <br /> +91 987 654 3210
              </p>
            </div>
          </div>
          <div className="icon-bx-wraper left">
            <div className="icon-md m-r20">
              <span className="icon-cell">
                <i className="las la-envelope-open"></i>
              </span>
            </div>
            <div className="icon-content">
              <h5 className="tilte">Email Now</h5>
              <p className="m-b0">info@gmail.com, services@gmail.com</p>
            </div>
          </div>
          <div className="icon-bx-wraper left">
            <div className="icon-md m-r20">
              <span className="icon-cell">
                <i className="las la-map-marker"></i>
              </span>
            </div>
            <div className="icon-content">
              <h5 className="tilte">Location</h5>
              <p className="m-b0">15/B Miranda House, New York, US</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="menu-close"
        onClick={() => setSideOverlay(!sideOverlay)}
      ></div>
      <Modal
        className="modal fade modal-wrapper auth-modal"
        id="modalLogin"
        show={loginModal}
        onHide={setloginModal}
        centered
      >
        <h2 className="title">Login Your Account</h2>
        <form onSubmit={(e) => formSubmit(e, "api/user/login")}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="reset-password">
              <Link
                to={"#"}
                className="btn-link collapsed"
                role="button"
                aria-controls="reset-password"
                // onClick={() => setOpenCollapse(!openCollapse)}
                onClick={() => (setResetModal(true), setloginModal(false))}
              >
                Reset password?
              </Link>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-outline-primary btn-block">
              Login
            </button>
          </div>
          {/* <div className="form-group">
            <Link to={"#"} className="btn facebook btn-block">
              <i className="fa-brands fa-facebook-f m-r10"></i>Log in with
              Facebook
            </Link>
          </div> */}
          {/* <div className="form-group">
            <Link to={"#"} className="btn google-plus btn-block">
              <i className="fa-brands fa-google m-r10"></i>Log in with Google
            </Link>
          </div> */}
          <Box className={styles.loginSocial}>
            {/* ---Social-Login with Google */}
            {callOnClick ? (
              <LoginSocialGoogle
                sx={{ pr: 1 }}
                client_id={
                  "1085137082696-c6a9ta6uk6gn30vf7vmsg8c066vmhl7i.apps.googleusercontent.com"
                }
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={async ({ data }) => {
                  let checkUser = await axios
                    .get(
                      `${process.env.REACT_APP_BACKEND_URL}/api/user/getSocialAppUserData/${data.email}`
                    )
                    .then(async (res) => {
                      if (res.status === 200 || res.status === 201) {
                        //   console.log("social-data", res);
                        localStorage.setItem(
                          `${res.data.data.doc.role}`,
                          JSON.stringify({
                            _id: res.data.data.doc._id,
                            firstName: res.data.data.doc.firstName,
                            lastName: res.data.data.doc.lastName,
                            email: res.data.data.doc.email,
                            role: res.data.data.doc.role,
                            socialLogin: "User is Login with Google",
                            token: res.data.data.doc.token,
                            profileImage: res.data.data.doc.profileImage
                              ? res.data.data.doc.profileImage
                              : "",
                          })
                        );
                        // if (res.data.data.doc.role === 'admin') {
                        //     navigate('/admin');
                        // }
                        //  else {
                        //   console.log("resres", res);
                        if (res.data.data.doc.role === "user") {
                          localStorage.setItem("isLoggedIn", "true");
                          setIsLoggedIn(true); // Update the state immediately.
                          setloginModal(false);
                          // Show the alert
                          toast.success("Login Successful!");

                          navigate("/");
                        }
                        // }
                      }
                    })
                    .catch(async (e) => {
                      if (e.response.data === "User Not found.") {
                        const userName = data?.name.replace(/\s/g, "");
                        const givenValues = {
                          username: userName,
                          email: data?.email,
                          profileImage: data?.picture,
                        };
                        await axios
                          .post(
                            `${process.env.REACT_APP_BACKEND_URL}/api/user/registerSocialAppUser`,
                            givenValues
                          )
                          .then((res) => {
                            if (res.status === 200 || res.status === 201) {
                              localStorage.setItem(
                                "user",
                                JSON.stringify({
                                  _id: res.data.data.user._id,
                                  firstName: res.data.data.user.firstName,
                                  lastName: res.data.data.user.lastName,
                                  email: res.data.data.user.email,
                                  role: res.data.data.user.role,
                                  socialLogin: "User is Login with Google",
                                  token: res.data.data.token,
                                  profileImage: res.data.data.user.profileImage
                                    ? res.data.data.user.profileImage
                                    : "",
                                })
                              );
                              localStorage.setItem("isLoggedIn", "true");
                              setIsLoggedIn(true); // Update the state immediately.
                              setloginModal(false);
                              // Show the alert
                              toast.success("Login Successful!");
                              navigate("/");
                              // setLoading(false);
                              // setAlert(true);
                              // setTimeout(() => {
                              //     navigate('/user');
                              // }, 1000);
                            }
                          })
                          .catch((e) => {
                            toast.success("UserName or Email Already Exists");
                            // setLoading(false);
                            // setErrorMessage('UserName or Email Already Exists');
                            // setErrorAlert(true);
                            // setTimeout(() => {
                            //     setErrorAlert(false);
                            // }, 2500);
                          });
                      }
                    });
                }}
                onReject={(err) => {
                  toast.success("Enter correct email to login");
                  // setErrorMessage('Enter correct email to login');
                  // setErrorAlert(true);
                  // setTimeout(() => {
                  //     setErrorAlert(false);
                  // }, 2500);
                }}
              >
                <img loading="lazy" src={Google} alt="google" />
              </LoginSocialGoogle>
            ) : null}
          </Box>
          <div className="sign-text">
            <span>
              Sign Up Don't have a Crowdfunding account?
              <Link
                to={"#"}
                className="btn-link collapsed"
                onClick={() => (setSignupModal(true), setloginModal(false))}
              >
                {" "}
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </Modal>
      <Modal
        className="modal fade modal-wrapper auth-modal"
        show={resetModal}
        onHide={setResetModal}
        centered
      >
        <div className="reset-password" id="reset-password">
          <h2 className="title">Reset password?</h2>
          <form onSubmit={(e) => formSubmit(e, "api/user/sendForgetEmail")}>
            <div className="form-group password-icon-bx">
              <i className="fa fa-lock"></i>
              <p>
                Enter your email address associated with your account, and we'll
                email you a link to reset your password...
              </p>
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-outline-primary btn-block"
              >
                Send reset link
              </button>
            </div>
            <Link
              to={"#"}
              className="sign-text d-block"
              data-bs-toggle="collapse"
              onClick={() => (setResetModal(false), setloginModal(true))}
            >
              Back
            </Link>
          </form>
        </div>
      </Modal>
      <Modal
        className="fade modal   "
        show={signupModal}
        onHide={setSignupModal}
        size="lg"
        centered
      >
        <Modal.Header
          className="d-flex justify-content-center align-items-center "
          style={{ backgroundColor: "rgb(27, 130, 113)" }}
        >
          <h4 className="text-center" style={{ color: "white" }}>
            Sign Up Your Account
          </h4>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <form
            onSubmit={(e) => formSubmit(e, "api/user/register")}
            style={{ display: "grid", gap: "10px" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr ",
                  gap: "10px",
                }}
              >
                <label>
                  First Name
                  <input
                    type="text"
                    value={FirstN}
                    style={{
                      width: "100%",
                      padding: "2px",
                      borderRadius: "5px",
                      border: "2px solid #ccc",
                    }}
                    onChange={(e) => setFirstN(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr ",
                  gap: "10px",
                }}
              >
                <label>
                  Last Name
                  <input
                    type="text"
                    value={LastN}
                    style={{
                      width: "100%",
                      padding: "2px",
                      borderRadius: "5px",
                      border: "2px solid #ccc",
                    }}
                    onChange={(e) => setLastN(e.target.value)}
                    required
                  />
                </label>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr ",
                  gap: "10px",
                }}
              >
                <label>
                  Email
                  <input
                    type="email"
                    value={email}
                    style={{
                      width: "100%",
                      padding: "2px",
                      borderRadius: "5px",
                      border: "2px solid #ccc",
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr ",
                  gap: "10px",
                }}
              >
                <label>
                  Phone
                  <input
                    type="text"
                    value={phone}
                    placeholder='e.g: +1 XXX-XXX-XXXX'
                    style={{
                      width: "100%",
                      padding: "2px",
                      borderRadius: "5px",
                      border: "2px solid #ccc",
                    }}
                    onChange={handlePhoneChange}
                    required
                  />
                  {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
                </label>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr",
                gap: "10px",
              }}
            >
              <label>
                Password
                {passwordError && <p style={{ color: 'red', fontSize: '12px', marginLeft: '8px', marginTop: '4px' }}>{passwordError}</p>}
                <input
                className='mb-0'
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  style={{
                    width: "calc(100% - 30px)",
                    padding: "2px",
                    borderRadius: "5px",
                    border: "2px solid #ccc",
                    marginRight: "30px",
                    marginBotttom: "0px",
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "relative",
                    right: "8px",
                    top: passwordError ? "-60%" : "-36%",
                    left: "85%",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
             
              </label>

              <label>
                City
                <input
                  type="text"
                  value={City}
                  onChange={(e) => setCity(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "2px",
                    borderRadius: "5px",
                    border: "2px solid #ccc",
                  }}
                  required
                />
              </label>

              <label>
                Zip Code
                <input
                  type="text"
                  value={Zip}
                  onChange={(e) => setZip(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "2px",
                    borderRadius: "5px",
                    border: "2px solid #ccc",
                  }}
                  required
                />
              </label>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr ",
                  gap: "10px",
                }}
              >
                <label>
                  Social Media Profile Link
                  <input
                    type="text"
                    // placeholder="Enter your social media profile link"
                    value={MediaLink}
                    onChange={(e) => setMediaLink(e.target.value)}
                    // onChange={handleSocialMediaLinkChange}
                    style={{
                      width: "100%",
                      padding: "2px",
                      borderRadius: "5px",
                      border: "2px solid #ccc",
                    }}
               
                  />
                  {/* Optionally, you can display the entered link */}
                  {/* {socialMediaLink && <p>Entered Social Media Link: {socialMediaLink}</p>} */}
                </label>
              </div>
            </div>

            {/* <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr ",
                  gap: "10px",
                }}
              >
                <label>
                  City
                  <input
                    type="text"
                    // value={email}
                    style={{
                      width: "100%",
                      padding: "2px",
                      borderRadius: "5px",
                      border: "2px solid #ccc",
                    }}
                    // onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr ",
                  gap: "10px",
                }}
              >
                <label>
                  Zip Code
                  <input
                    type="number"
                    // value={email}
                    style={{
                      width: "100%",
                      padding: "2px",
                      borderRadius: "5px",
                      border: "2px solid #ccc",
                    }}
                    // onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
              </div>
            </div> */}
            <div className="d-flex justify-content-center">
              <div className="w-50">
                <button
                  type="submit"
                  className="btn btn-outline-primary btn-block p-2 mx-auto mb-0"
                >
                  Signup
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box className={styles.loginSocial}>
            {callOnClick ? (
              <LoginSocialGoogle
                sx={{ pr: 1 }}
                client_id="1085137082696-c6a9ta6uk6gn30vf7vmsg8c066vmhl7i.apps.googleusercontent.com"
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={async ({ data }) => {
                  // ... your existing logic
                }}
                onReject={(err) => {
                  toast.success("Enter correct email to login");
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <img
                    loading="lazy"
                    src={Google}
                    alt="google"
                    style={{ marginRight: "8px" }}
                  />
                  Sign up with Google
                </div>
              </LoginSocialGoogle>
            ) : null}
          </Box>

          <div className="sign-text">
            <span>
              Already have a Crowdfunding account?{" "}
              <Link
                to="#"
                className="btn-link collapsed"
                data-bs-toggle="collapse"
                onClick={() => (setSignupModal(false), setloginModal(true))}
              >
                Login
              </Link>
            </span>
          </div>
        </Modal.Footer>
      </Modal>

      <DonateModal ref={modalRef} />
    </>
  );
};

export default Header;
