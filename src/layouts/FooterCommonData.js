import React from 'react';
import {Link} from 'react-router-dom';
import { IMAGES } from "../constant/theme";
const FooterCommonData = ({logoImage, iconStyle}) => {
    return (
        <>
            <div className="col-xl-4 col-lg-12 col-md-12">
                <div className="widget widget_about">
                <div className="footer-logo logo-white">
    <Link to={"/"}>
        <img src={logoImage} alt="" style={{ height: '105px', width: '150px' }} />
    </Link>
                    <p style={{align:'justify'}}>Nfuse is a donation platform with a simple mission of supporting freedom-loving people and projects. We support freedom for everyone. </p>
</div>
                    <div className="dz-social-icon style-1">
                        <ul>
                            <li><a target="_blank" className="fab fa-facebook-f"  rel="noreferrer" href="https://www.facebook.com/"></a></li>
                            {" "}<li><a target="_blank" className="fab fa-instagram"  rel="noreferrer" href="https://www.instagram.com/"></a></li>
                            {" "}<li><a target="_blank" className="fab fa-twitter"  rel="noreferrer" href="https://twitter.com/"></a></li>
                            {" "}<li><a target="_blank" className="fab fa-youtube"  rel="noreferrer" href="https://youtube.com/"></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-3 col-6">
                <div className="widget widget_services">
                    <h5 className="footer-title">Resources</h5>
                    <ul>
                        {/* <li><Link to={"/how-it-works"}>How It Works</Link></li> */}
                        {/* <li><Link to={"#"}>Ask A Question</Link></li> */}
                        <li><Link to={"/contact-us"}>Help center</Link></li>
                        {/* to={"/mission"} */}
                        <li><Link to={"/blog-details1"} >Blogs</Link></li>
                        {/* <li><Link to={"#"}>Careers</Link></li> */}
                        <li><Link to={"/terms-and-condition"}>Terms And Conditions</Link></li>
                        <li><Link to={"/privacy-policy"}>Privacy Policy </Link></li>
                    </ul>
                </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-3 col-6">
                <div className="widget widget_services">
                    <h5 className="footer-title">Company</h5>
                    <ul>
                        <li><Link to={"/about-us"}>About Us</Link></li>
                        {/* <li><Link to={"/volunteer"}>Volunteer</Link></li> */}
                        <li><Link to={"/happy-clients"}>success stories</Link></li>
                        {/* <li><Link to={"/project"}>Project</Link></li> */}
                        {/* <li><Link to={"/contact-us"}>Contact Us</Link></li> */}
                        <li><Link to={"/faq"}>FAQ</Link></li>
                        <li><Link to={"/contact-us"}>Contact us </Link></li>
                        
                    </ul>
                </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="widget widget_getintuch">
                    <h5 className="footer-title">Get in touch with us</h5>
                    <ul>
                        {/* <li>
                            {iconStyle   ? 
                                <i className="fas fa-map-marker-alt text-primary"></i>
                                :  
                                <i className="fas fa-map-marker-alt"></i>
                            }
                            <span>832  Thompson Drive, San Fransisco CA 94107, United States</span>
                        </li> */}
                        <li>
                            {/* {iconStyle   ? 
                                <i className="fa-solid fa-phone text-primary"></i>
                                :
                                <i className="fa-solid fa-phone"></i>
                            }
                            <span>*******</span> */}
                        </li>
                        <li>
                            {iconStyle   ? 
                                <i className="fa fa-envelope text-primary"></i> 
                                :
                                <i className="fa fa-envelope"></i> 
                            }
                            <span>info@nfuse-me.com</span>
                        </li>
                    </ul>
                </div>
            </div> 
        </>
    );
};

export default FooterCommonData;
