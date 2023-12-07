/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-restricted-globals */
/* eslint no-restricted-globals: ["error", "history"] */
import React,{useState,useContext, useEffect,useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import CountUp from 'react-countup';
import ModalVideo from 'react-modal-video'
import 'react-modal-video/css/modal-video.min.css';
import axios from "axios";

//componenet
import MainSliderIndex3 from '../components/Home3/MainSliderIndex3';
import TrendingSlider2 from '../components/Home3/TrendingSlider2';
import AkcelServices from '../components/Home3/AkcelServices';
import SuccessStoriesSlider from '../components/Home3/SuccessStoriesSlider';
import LatestNewSlider from '../components/Home3/LatestNewSlider';
import PartnershipSlider from '../components/Home/PartnershipSlider';

//layouts
import Header2 from '../layouts/Header2';
import Header from '../layouts/Header';
import Footer3 from '../layouts/Footer3';
import Footer from '../layouts/Footer';
import { ThemeContext } from "../context/ThemeContext";
import { IMAGES } from '../constant/theme';
import Screenshot_29 from '../../src/assets/images/Screenshot_29.png';
import { toast,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SVGICON } from '../../src/constant/theme';
import { redirect } from "react-router-dom";
// const counterBlog = [
//     {title: "Completed Projects", number:"1854", },
//     {title: "Countries Served", number:"35", symbal:"+"},
//     {title: "People With Clean Water", number:"29", symbal:"M"},
//     {title: "People With Clean Tank", number:"41", symbal:"M"}
// ];

const Home3 = () => {    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const form = useRef(null);
    const [email, setEmail] = useState('');
    const [subscribeMsg, setSubscribeMsg] = useState('');
  


    const handleSubscribe = async (e) => {
      e.preventDefault();
  const payload = {
    email:email
  }
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/subscribe/subscribeForm`,  payload );
       
       
        console.log('Subscription successful:', response.data);
  toast.success('Subscription successful')
       
        setSubscribeMsg('Subscription successful');
  
        setEmail('');
  
      } catch (error) {
       
        console.error('Error subscribing:', error);
        toast.error("Email is already subscribed")
       
        setSubscribeMsg('Error subscribing. Please try again.');
      }
    };
    useEffect(() => {
        const intervalId = setInterval(() => {
          const storedValue = localStorage.getItem('isLoggedIn');
          const isUserLoggedIn = Boolean(storedValue);
          setIsLoggedIn(isUserLoggedIn);
    
          
          if (isUserLoggedIn) {
            clearInterval(intervalId);
          }
        }, 1000); 
    
      
        return () => clearInterval(intervalId);
      }, []);
  
    const { changeBackground, changePrimaryColor } = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "data-typography-2", label: "data-typography-2" });
		changePrimaryColor("color-skin-3");
	}, []);
    const [campaigns, setCampaigns] = useState([]);
    const [readModal,setReadModal] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [isOpen1, setOpen1] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
      });
    const nav = useNavigate();

const [open, setOpens] = useState(false);
console.log('open',open)
    const handlemodal = () =>{
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        if(token){
console.log('if',open)
window.location.href = '/create-compaign';
//  redirect('https://reactrouter.com/en/main/fetch/redirect');
        }else{
console.log('else',open)

            setOpens(true)
        }

    }
    const updateOpens = (value) => {
console.log('updateOpens value',value)

        setOpens(value);
      };
    const FormSubmit = (e) => {
        e.preventDefault();
        nav("/contact-us");
    };
    useEffect(() => {
        console.log('Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        const fetchData = async () => {
          try {
            // const config = {
            //     headers: {
            //       Authorization: `Bearer ${token}`, // Use Bearer authentication, replace "Bearer" if you have a different authentication method
            //     },
            //   };
            const response = await axios
              .get(
                `${process.env.REACT_APP_BACKEND_URL}/api/compaign/getTrendingCampaign`  //,config
              )
              .then((res) => {
                if (res.status === 200 || res.status === 201) {
                  //   console.log("all-comp-data", res?.data);
                  setCampaigns(res?.data);
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
            //   console.error("API request failed", error);
          }
        };
        // const user = JSON.parse(localStorage.getItem("user"));
        // if (user && user.token) {
          fetchData();
        // }
        
        // Call the async function
      }, []);

      const sendEmail = async (e) => {
        e.preventDefault();
    
        // Validation
        const { firstName, lastName, email, phoneNumber, message } = formData;
        console.log('formDatattt',formData);
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !phoneNumber.trim() || !message.trim()) {
          toast.error("All fields are required");
        } else {
          try {
            const response = await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/api/contactUs/submitForm`,
              formData
            );
    
            if (response.status === 200) {
              toast.success("Message Sent successfully");
              // Clear form fields
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                message: '',
              });
            } else {
              toast.error("Error submitting form");
            }
          } catch (error) {
            toast.error("Error submitting form. Please try again.");
          }
        }
      };
    return (
        <> 
                {isLoggedIn ? (
        <Header2 changeStyle="header-transparent" changeLogo={true} />
      ) : (
        <Header changeStyle="header-transparent" changeLogo={true} updateOpens={updateOpens} open={open}  />
      )}           
                <div className="page-content bg-white">	
                    <div className="main-bnr-two">
                        <MainSliderIndex3  handlemodal={handlemodal} />
                    </div>     
                    <section class="content-inner-1 section-wrapper1">
                        <div class="container">
                            <div class="row section-head align-items-center">
                                <div class="col-lg-8 col-md-12 wow fadeInUp" data-wow-delay="0.2s">
                                    {/* <h5 class="sub-title">LATEST CAUSES</h5> */}
                                    <h2>Top Trending </h2>
                                </div>
                                <div class="col-lg-4 col-md-12 text-end d-none d-lg-block wow fadeInUp" data-wow-delay="0.4s">
                                    <Link to={"/campaigns"} class="btn btn-primary">View All Causes</Link>
                                </div>
                            </div>
                        </div>
                        {/* {//   console.log("campaigns",campaigns)} */}
                        <div class="resize-wrapper">
                            <TrendingSlider2 campaigns = {campaigns} />
                        </div>
                    </section>           
                    <section className="content-inner">
                        <div className="container">
                            <div className="row about-bx5 align-items-center">
                                <div className="col-lg-6 m-b30">
                                    <div className="dz-about-media">
                                        <div className="img-wrapper">
                                            <img src={IMAGES.AboutPic2} alt="" className="img1" />
                                            <Link to={"#"} className="popup-youtube video-btn" onClick={()=> setOpen(true)} ><i className="fa-solid fa-play" ></i></Link>
                                        </div>
                                        <img src={IMAGES.AboutPic3} alt=""  className="img2"  />
                                    </div>
                                </div>
                                <div className="col-lg-6 m-b30" >
                                    <div className="section-head">
                                        {/* <h5 className="sub-title">About Us</h5> */}
                                        <h2>Help is <br/>Our Main Goal</h2>
                                    </div>
                                    {/* <h4 className="font-weight-500 m-b10">We Need Your Help</h4> */}
                                    <p className="m-b20">We invite you to be the part of something extraordinary. Whether you are a freedom-loving individual or a non-profit organization, Nfuse is here to infuse your funds. </p>
                                    <div className="dz-about-info">
                                        <div className="row">
                                            <div className="col-lg-6 col-sm-6">
                                                <ul className="list-check-3">
                                                    <li>Food Contributions</li>
                                                    <li>Medical Care</li>
                                                    <li>Education</li>
                                                    <li>Emergencies</li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-6 col-sm-6">
                                                <ul className="list-check-3">
                                                    <li>Animals</li>
                                                    <li>Legal</li>
                                                    <li>Non-Profit</li>
                                                    {/* <li>Pure Education</li> */}
                                                </ul>   
                                            </div>
                                        </div>
                                    </div>
                                    <Link to={"/about-us"} className="btn btn-primary">About Us</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <section className="section-wrapper2 content-inner-2 overlay-black-middle" style={{ background: 'none' }}
                        style={{backgroundImage:"url("+ IMAGES.Background5 +")", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}
                    >
                        <div className="container">
                            <div className="section-head text-center wow fadeInUp" data-wow-delay="0.2s">
                                {/* <h5 className="sub-title text-white">Services</h5> */}
                                <h2 className="title text-white">Services</h2>
                            </div>
                                <AkcelServices />
                                <div className="row justify-content-center mt-0 mt-md-3 mt-xl-5">
                <div className="col-lg-4 col-md-6 m-t30 wow fadeInUp" data-wow-delay="0.2s">
                    <div className="content-bx style-1 bg-primary text-center">
                        <div className="inner-content">
                            <h2 className="title text-white mb-3">Newsletter</h2>
                            {/* <p className="text-white">Participate in our monthly newsletter to receive the latest news and exclusive opportunities..</p> */}
                            <form className="dzSubscribe" onSubmit={handleSubscribe}>
                                <div className="dzSubscribeMsg text-white"></div>
                                <input
        name="dzEmail"
        required="required"
        type="email"
        className="form-control transparent m-b15"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
                <button name="submit" value="Submit" type="submit" className="btn btn-light btn-rounded btn-block">
        Subscribe Now
      </button>

                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 m-t30 wow fadeInUp" data-wow-delay="0.4s">
                    <div className="content-bx style-1 bg-primary text-center">
                        <div className="inner-content">
                        <h3 className="title text-white ">Help</h3>
                            <div className="icon-lg m-b20">
                                <Link to={"/project-categories"} className="icon-cell">
                                <span style={{ color: 'red' }}>
        {SVGICON.HelpHeart}
      </span>
                                </Link>
                            </div>
                            <h3 className="title text-white "></h3>
                            {/* <p className="m-b30 text-white">Your financial contribution is pivotal to the success of our global initiative.</p> */}
                            <Link className="btn btn-light"  style={{ textTransform: 'none' }} onClick={handlemodal}>Start a Campaign</Link>
                        </div>
                    </div>
                </div>
                {/* <div className="col-lg-4 col-md-6 m-t30 wow fadeInUp" data-wow-delay="0.6s">
                    <div className="content-bx style-1 bg-dark text-center">
                        <div className="inner-content">
                            <h2 className="title text-white">33,986+</h2>
                            <p className="m-b30 text-white">Our campaign is powered by contributions from supporters like you</p>
                            <Link to={"/fundraiser-detail"} className="btn btn-primary">Online Voter</Link>
                        </div>
                    </div>
                </div> */}
            </div> 
                        </div>                     
                    </section>
                    
                    <section className="content-inner">
                        <div className="container">
                            <div className="row align-items-center content-bx style-2">
                            <div className="col-lg-6 m-b30 wow fadeInUp" data-wow-delay="0.2s">
                                    <div className="dz-media video-bx4 rounded">
                                        <img src={IMAGES.ProjectPic13} alt="image"/>
                                        <Link to={"#"} className="popup-youtube vedio-btn" onClick={()=> setOpen(true)} ><i className="fa-solid fa-play" ></i></Link>
                                    </div>
                                </div>
                                <div className="col-lg-6 m-b30 wow fadeInUp" data-wow-delay="0.4s">
                                    <div className="inner-content">
                                        <div className="section-head">
                                            <h2 className="title">Believe <br/> in the power of giving back</h2>
                                        </div>
                                        {/* <Link to={"/project-story"} className="btn btn-primary">Project Story</Link> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="testimonial-wrapper3 content-inner" style={{backgroundImage:"url("+ IMAGES.Background10 +")", backgroundPosition: "center"}}>
                        {/* <SuccessStoriesSlider setReadModal={setReadModal}/> */}
                        <div className="container">
                            {/* <div className="row">
                                {counterBlog.map((item, ind)=>(
                                    <div className="col-lg-3 col-6 m-b30" key={ind}>
                                        <div className="counter-style-3 text-center text-white">
                                            <span className="counter counter-num text-primary">
                                                <CountUp end={item.number} /> {item.symbal}
                                            </span>
                                            <p className="counter-text m-b0">{item.title}</p>
                                        </div>
                                    </div>
                                ))}                            
                            </div> */}
                        </div>
                    </section>
                    {/* Section-5  end*/}
                    {/* Section-6*/}
                    <section className="bg-primary form-wrapper1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 wow fadeInUp" data-wow-delay="0.2s">
                                    <div className="section-head">
                                        <h5 className="sub-title text-white"></h5>
                                        <h2 className="title text-white">Customer Support</h2>
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <form className="dzForm"  onSubmit={sendEmail}>
                                        <div className="dzFormMsg"></div>
                                        <input type="hidden" className="form-control" name="dzToDo" value="Contact" />
                                        <input type="hidden" className="form-control" name="reCaptchaEnable" value="0" />
                                        
                                        <div className="row g-4">
                                            <div className="col-md-4 col-sm-6">
                                                <input 
                                                 name="firstName"
                                                 required
                                                 type="text"
                                                 className="form-control"
                                                 placeholder="First Name"
                                                 value={formData.firstName}
                                                 onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                                            </div>
                                            <div className="col-md-4 col-sm-6">
                                                <input 
                                            name="lastName"
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder="Last Name"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-md-4 col-sm-6">
                                                <input 
                                            name="email"
                                            required
                                            type="text"
                                            className="form-control"
                                            placeholder="email@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                            </div>
                                            <div className="col-md-4 col-sm-6">
                                                <input 
                                               name="phoneNumber"
                                               required
                                               type="tel"
                                               className="form-control"
                                               placeholder="+1 987 654 321"
                                               pattern="[0-9]+"
                                               value={formData.phoneNumber}
                                               onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
                                            </div>
                                            <div className="col-md-4 col-sm-6">
                                                <input 
                                                name="message"
                                                rows="7"
                                                required
                                                className="form-control"
                                                placeholder="Message"
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                                            </div>
                                            <div className="col-md-4 col-sm-6">
                                                <button 
                                                name="submit" type="submit" value="Submit" 
                                                className="btn btn-light btn-block h-100">Submit</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Section-6  end*/}
                    {/* Section-7 */}
                    <section className="content-inner">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-8 col-md-12 wow fadeInUp" data-wow-delay="0.2s">
                                    <div className="section-head">
                                        <h2 className="title">Featured Blogs</h2>
                                    </div>
                                </div>
                                <div hidden className="col-lg-4 col-md-12 m-b30 text-end d-none d-lg-block wow fadeInUp" data-wow-delay="0.4s">
                                    <Link to={"/blog-grid"} className="btn btn-primary">All Blogs</Link>
                                </div>
                            </div>
                        </div>
                        <div className="container position-relative">
                            <LatestNewSlider />
                        </div>
                    </section>
                    {/* Section-7  end*/}
                    <hr class="container" />
                    {/* Section-8 */}
                    <section class="content-inner-3">
                        <div class="container">
                            <div class="section-head text-center m-b30 wow fadeInUp" data-wow-delay="0.2s">
                                <h2 class="title text-capitalize">Communities we serve<br /></h2>
                            </div>	
                            {/* <div class="text-center wow fadeInUp" data-wow-delay="0.4s">	
                                <Link to={"/become-a-fundraiser"} class="btn btn-primary">View All Feed</Link>
                            </div>	 */}
                        </div>
                    </section>
                    {/* Section-8  end*/}
                    <div class="clients-wrapper">
                        <div class="container">
                            <PartnershipSlider />
                        </div>
                    </div>
                </div>
                <Footer />
                <Modal className="modal fade modal-wrapper" id="read" centered show={readModal} onHide={setReadModal}> 
                    <div className="modal-body">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </Modal>
                
                {/* <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="bdBG5VO01e0" onClose={() => setOpen(false)} /> */}
                <ModalVideo channel='youtube'  isOpen={isOpen} videoId="CapnOV_nOxw" onClose={() => setOpen(false)} />
                {/* <ModalVideo channel='youtube'  isOpen={isOpen1} videoId="CapnOV_nOxw" onClose={() => setOpen1(false)} /> */}
                {/* <Link to={"#"} className={classChange} onClick={()=> setOpen(true)} ><i className="fa-solid fa-play" ></i></Link> */}
                {/* <DonateModal /> */}
        </>
    );
};

export default Home3;