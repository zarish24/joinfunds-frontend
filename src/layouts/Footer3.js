import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { toast,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  FooterCommonData from './FooterCommonData';
import {IMAGES} from '../constant/theme';

const Footer3 = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = async (e) => {
        e.preventDefault();
    const payload = {
      email:email
    }
        try {
          const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/subscribe/subscribeForm`,  payload );
         
         
          //   console.log('Subscription successful:', response.data);
    toast.success('Subscription successful')
         
        //   setSubscribeMsg('Subscription successful');
    
          setEmail('');
    
        } catch (error) {
         
          //   console.error('Error subscribing:', error);
          toast.error("Email is already subscribed")
         
        //   setSubscribeMsg('Error subscribing. Please try again.');
        }
      };
    return (
        <>
            <footer className="site-footer style-3 background-luminosity overlay-black-dark" onSubmit={handleSubscribe} style={{backgroundImage: "url("+ IMAGES.SliderBg2 +")"}}>
                <div className="footer-subscribe-wrapper">
                    <div className="container">
                        <div className="wrapper-inner">
                            <div className="row align-items-center">
                                <div className="col-xl-6 col-lg-9 wow fadeInUp" data-wow-delay="0.2s">
                                    <h2 className="title text-white m-b0">Don’ttt miss our weekly updates about donations</h2>
                                </div>
                                <div className="col-xl-6 col-lg-9 wow fadeInUp" data-wow-delay="0.4s">
                                    <form className="dzSubscribe" action="script/mailchamp.php" method="post">
                                        <div className="dzSubscribeMsg text-white"></div>
                                        <div className="input-group">
                                            <input 
                                            name="dzEmail" 
                                            required="required" 
                                            type="email" 
                                            className="form-control transparent m-r20" 
                                            placeholder="Enter your email address..." 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <button name="submit" value="Submit" type="submit" className="btn btn-primary">
                                                <span>SUBSCRIBE</span>
                                                <i className="fa-solid fa-paper-plane"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                           <FooterCommonData logoImage={IMAGES.logo3} iconStyle={true}/>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="text-center">
                            <span className="copyright-text">Nfu$e Crowdfunding & Charity Website  -  © 2023  </span> 
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer3;