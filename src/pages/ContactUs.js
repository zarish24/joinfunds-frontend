import React, { useRef,useState } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import swal from "sweetalert";
import {Link, useNavigate} from 'react-router-dom';

import PageBanner from '../layouts/PageBanner';
import PartnershipSlider from './../components/Home/PartnershipSlider';
import UpdateBlog from './../components/Home/UpdateBlog';

import bg from '../assets/images/banner/bnr1.jpg';
import shape1 from '../assets/images/pattern/shape1.png';
import shape3 from '../assets/images/pattern/shape3.png';
import shape5 from '../assets/images/pattern/shape5.png';
import shape6 from '../assets/images/pattern/shape6.png';
import shape7 from '../assets/images/pattern/shape7.png';
import { toast,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cardBlog = [
    {title:"Mail", subtitle:"info@nfuse-me.com", icon:"flaticon-email"},
    // {title:"", subtitle:"", },
    // {title:"Our Address", subtitle:"832  Thompson Drive, San Fransisco, United States", icon:"flaticon-pin"},
];

const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
      });
    
      const sendEmail = async (e) => {
        e.preventDefault();
    
        // Validation || !phoneNumber.trim() 
        const { firstName, lastName, email, phoneNumber, message } = formData;
        console.log('formData',formData);
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !message.trim()) {
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
            <div className="page-content bg-white">
                <PageBanner maintitle="Contact" pagetitle="Contact Us" background={bg}/>
                <section className="content-inner-1 bg-light section-pattren1">
                    <div className="container">
                        <div className="row justify-content-center">
                            {cardBlog.map((item, ind)=>(
                                <div className="col-lg-4 col-md-6 m-b20" key={ind}>
                                    <div className="icon-bx-wraper box-hover style-3">
                                        <div className="icon-lg"> 
                                            <Link to={"/services-details"} className="icon-cell">
                                                <i className={item.icon}></i>
                                            </Link> 
                                        </div>
                                        <div className="icon-content">
                                            <h5 className="dz-tilte m-b5 text-capitalize">{item.title}</h5>
                                            <span>{item.subtitle}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                    {/* <img src={shape1} className="shape-1 move-1" alt="shape" />
                    <img src={shape3} className="shape-3 move-1" alt="shape" />
                    <img src={shape5} className="shape-4 rotating" alt="shape"/>
                    <img src={shape6} className="shape-5 rotating" alt="shape"/> */}
                </section>
                <section className="content-inner map-wrapper1">
                    <div className="container-fluid">
                        <div className="map-iframe style-1">
                            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14448.884443175983!2d75.81853095!3d25.128214449999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f835fcc2a9e43%3A0x69e74069e551d77d!2sRajasthan%20Technical%20University%2C%20Kota!5e0!3m2!1sen!2sin!4v1645506412870!5m2!1sen!2sin" style={{border:"0"}} allowfullscreen="" loading="lazy"></iframe> */}
                            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50921.957033264225!2d-95.75409074959893!3d37.090301341761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2s!4v1700467956131!5m2!1sen!2s" style={{border:"0"}} allowfullscreen="" loading="lazy" ></iframe> */}
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-8 col-sm-12">
                                <div className="contact-info form-wrapper style-1">
                                    <h2 className="title">Write us a message</h2>
                                    <div className="contact-area">
                                    <form className="dz-form dzForm contact-bx" onSubmit={sendEmail}>
            <div className="dzFormMsg"></div>
            <input type="hidden" className="form-control" name="dzToDo" value="Contact" />
            <div className="row sp15">
                <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <div className="input-group">
                        <input
                            name="firstName"
                            required
                            type="text"
                            className="form-control"
                            // placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <div className="input-group">
                        <input
                           name="lastName"
                           required
                           type="text"
                           className="form-control"
                        //    placeholder="Deo"
                           value={formData.lastName}
                           onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Email address</label>
                    <div className="input-group">
                        <input
                            name="email"
                            required
                            type="text"
                            className="form-control"
                            // placeholder="info@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <div className="input-group">
                        <input
                            name="phoneNumber"
                            // required
                            type="tel"
                            className="form-control"
                            // placeholder="+1 987 654 321"
                            pattern="[0-9]+"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        />
                    </div>
                </div>
                <div className="col-md-12">
                    <label className="form-label">Message</label>
                    <div className="input-group">
                        <textarea
                            name="message"
                            rows="7"
                            required
                            className="form-control"
                            // placeholder="Dear Sir/Madam"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        ></textarea>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="input-recaptcha">
                        {/* Add your reCAPTCHA component here */}
                    </div>
                </div>
                <div className="col-md-12">
                    <button name="submit" type="submit" value="Submit" className="btn btn-secondary text-white">
                        Submit Now
                    </button>
                </div>
            </div>
        </form>
                                    </div>	
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <img src={shape5} className="shape-2 move-2" alt="shape"/>
                    <img src={shape7} className="shape-1 move-2" alt="shape"/>
                    <img src={shape6} className="shape-3 move-2" alt="shape"/> */}
                </section>
                <section className="clients-wrapper p-0">
                    <div className="container">
                        <div className="section-head text-center">
                            <h3 className="title">Our Partnerships</h3>
                        </div>
                        <PartnershipSlider />
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

export default ContactUs;