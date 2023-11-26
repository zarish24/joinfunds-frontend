import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { toast,  } from 'react-toastify';
import swal from "sweetalert";
import bgimage from './../../assets/images/background/bg1.jpg';
const UpdateBlog = () =>{
    const form = useRef();
    const [email, setEmail] = useState('');
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('gmail', 'YOUR_TEMPLATE_ID', e.target, 'd9b2e0f5fc72cb94792110e8ff2028f3-us16')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset()
          swal('Good job!', 'form successfuly submmited', "success");
          //alert('form suucessfult submmit');
     };
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
          toast.error("Email is already subscribed");
          setEmail('');
        //   setSubscribeMsg('Error subscribing. Please try again.');
        }
      };
    return(
        <>
            <div className="inner-action overlay-primary-dark" style={{backgroundImage:"url("+ bgimage + ")"  ,backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
                <div className="row inner-content justify-content-center">
                    <div className="col-xl-6 col-lg-9">
                        <div className="section-head text-center">
                            <h2 className="title text-white">Don’t miss our weekly updates about donations</h2>
                        </div>
                        <form className="dzSubscribe" ref={form} onSubmit={handleSubscribe}>
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
                                <div className="input-group-addon">
                                    <button type="submit" value="submit" className="btn btn-secondary btn-rounded-lg text-white">
                                        <span>SUBSCRIBE</span>
                                        <i className="fa-solid fa-paper-plane"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UpdateBlog;