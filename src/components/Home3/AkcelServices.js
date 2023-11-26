import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { toast,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SVGICON } from '../../constant/theme';

const servicesBlog = [
    {title:"Top-tier Fundraising Achievement", icon:SVGICON.DoubleHeart },
    {title:"National and International" , icon:SVGICON.Ring},
    {title:"Easy-To-Manage Tools To Boost Results",icon:SVGICON.HeartWindow},
    {title:" Expert Support 24/7",icon:SVGICON.HeartHelp},
    {title:"A Dedicated Smart-Dashboard",icon:SVGICON.DollerBox},
    {title:"Receive donations via all popular payment",icon:SVGICON.HeartHome},
    {title:"International Payment Support",icon:SVGICON.ThumbDoller1},
    {title:"Withdraw Funds Without Hassle", icon:SVGICON.ThumbDoller2},
];

const AkcelServices = () => {
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
    return (
        <>
            <div className="row justify-content-center">
                {servicesBlog.map((data, ind)=>(
                    <div className="col-xl-3 col-lg-4 col-sm-6" key={ind}>
                        <div className="icon-bx-wraper text-center style-4 transparent m-b30 wow fadeInUp" data-wow-delay="0.2s">
                            <div className="icon-bx-sm m-b20">
                                <Link to={"/project-categories"} className="icon-cell">
                                    {data.icon}
                                </Link>
                            </div>
                            <div className="icon-content">
                                <div className="separator"></div>
                                <p>{data.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row justify-content-center mt-0 mt-md-3 mt-xl-5">
                <div className="col-lg-4 col-md-6 m-t30 wow fadeInUp" data-wow-delay="0.2s">
                    <div className="content-bx style-1 bg-primary text-center">
                        <div className="inner-content">
                            <h2 className="title text-white">Newsletter</h2>
                            <p className="text-white">Participate in our monthly newsletter to receive the latest news and exclusive opportunities..</p>
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
                            <div className="icon-lg m-b20">
                                <Link to={"/project-categories"} className="icon-cell">
                                    {SVGICON.HelpHeart}
                                </Link>
                            </div>
                            <h3 className="title text-white">Want To Help?</h3>
                            <p className="m-b30 text-white">Your financial contribution is pivotal to the success of our global initiative.</p>
                            <Link className="btn btn-light" to={"/project"}>Donate Now</Link>
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
        </>
    );
};

export default AkcelServices;