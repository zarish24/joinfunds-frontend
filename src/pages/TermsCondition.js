import React from 'react';
import { Link } from "react-scroll";

import PageBanner from '../layouts/PageBanner';
//images
import bg from '../assets/images/banner/bnr5.jpg';
import UpdateBlog from '../components/Home/UpdateBlog';

const TermsCondition = () => {
    return (
        <>
	        <div className="page-content bg-white">
                <PageBanner maintitle="Home" pagetitle="Terms And Condition" background={bg} />
                <div className="content-inner-2">
                    <div className="container">
                        <div className="row dz-terms">
                            <div className="col-xl-4 col-lg-5 m-b40">
                                <aside className="side-bar sticky-top">
                                    <div className="dz-terms-list">
                                        <ul className="navbar-nav navbar-scroll">
                                            <li><Link to="scrollNavSection01" className="nav-link scroll">Terms And CareerExplorer</Link></li>
                                            <li><Link to="scrollNavSection02" className="nav-link scroll">User Account</Link></li>
                                            <li><Link to="scrollNavSection03" className="nav-link scroll">Electronic Communication</Link></li>
                                            <li><Link to="scrollNavSection04" className="nav-link scroll">User Data And Privacy</Link></li>
                                            <li><Link to="scrollNavSection05" className="nav-link scroll">Ownership Of CareerExplorer</Link></li>
                                            <li><Link to="scrollNavSection06" className="nav-link scroll">Additional Terms</Link></li>
                                            <li><Link to="scrollNavSection07" className="nav-link scroll">Your Responsibilities</Link></li>
                                            <li><Link to="scrollNavSection08" className="nav-link scroll">Communications Not Confidential</Link></li>
                                            <li><Link to="scrollNavSection09" className="nav-link scroll">Feedback</Link></li>
                                            <li><Link to="scrollNavSection10" className="nav-link scroll">Contact</Link></li>
                                        </ul>
                                    </div>
                                </aside>
                            </div>
                            <div className="col-xl-8 col-lg-7">					
                                <div className="dz-terms-content" id="scrollNavSection01">
                                    <h4 className="title">Changes To These Member Terms And Career Explorer</h4>
                                    <ul>
                                        <li>The Privacy Policy describes CareerExplorer's policies and procedures regarding the personal information and other data collected through the CareerExplorer Site. By using the CareerExplorer Site, you consent to the terms of this Privacy Policy.</li>
                                        <li>We reserve the right to change CareerExplorer at any time, without notice. We may, at our discretion, suspend your access to or use of CareerExplorer or any component thereof: (i) for scheduled maintenance; (ii) if you violate any provision of these Member Terms; or (iii) to address any emergency security concerns.</li>
                                    </ul>
                                </div>                                
                                <div className="dz-terms-content" id="scrollNavSection02">
                                    <h4 className="title">User Account</h4>
                                    <ul>
                                        <li>To access certain features of CareerExplorer, you will be required to successfully sign up for a user account using the available interfaces of CareerExplorer, and be issued with a username and password login credentials (the “User ID”). </li>
                                        <li>If you are issued with a User ID, you will keep your User ID secure and will not grant access to or otherwise share your User ID with any other person. </li>
                                        <li>We reserve the right to disable any User ID issued to you at any time in our sole discretion. If we disable access to a User ID issued to you, you may be prevented from accessing CareerExplorer.</li>
                                        <li>Sokanu is entitled to act on instructions received through your account. Sokanu is not responsible for any actions taken or transactions made to or from your account by any other party using your User ID.</li>
                                    </ul>
                                </div>                                    
                                <div className="dz-terms-content" id="scrollNavSection03">
                                    <h4 className="title">Electronic Communication</h4>
                                    <ul>
                                        <li>When you use or view CareerExplorer or send e-mails, texts or other electronic messages to us, you are communicating with us electronically and you consent to receive communications from us electronically. We will communicate with you by e-mail or by posting notices on CareerExplorer. You agree that all agreements, notices, disclosures and other communications that we provide to you electronically satisfy any legal requirement that such communications be in writing.</li>
                                        <li>By creating an account to access CareerExplorer, you acknowledge and agree that Sokanu will send you service-related e-mails relating to your account, including service updates. These communications can be managed through user features made available through CareerExplorer from time to time.</li>
                                        <li>If you are a member of our mailing list you will also receive email communications from us regarding our products, services and initiatives (including collaborations and partnerships). If you do not wish to receive these communications, you can unsubscribe from such promotional e-mails at any time by clicking on the unsubscribe link in any of our e-mail communications.</li>
                                        <li>If you sign up through Sokanu to receive special offers regarding products and services from our partners, you authorize us to share your email address and other Personal Information you authorize (as defined in Section 4(d)) with the partner whose offer you wish to receive. If you request these special offers, you acknowledge the partner may also send you future offers that may interest you. You can opt out of future communications from Sokanu by changing your user settings or emailing contact@akcel.com; you can unsubscribe from future partner communications by following their unsubscribe and opt out instructions. You do not have to agree to participate in these offers in order to use CareerExplorer. You understand that Sokanu may receive financial remuneration in exchange for sharing your email address and other Personal Information you authorize with partners if you choose to sign up for an offer. Once you sign up for an offer, you can change your mind at any time, but if the partner or Sokanu has already relied on your authorization to share your email or other Personal Information for a particular offer, any action already taken cannot be undone.</li>
                                    </ul>
                                </div>                                    
                                <div className="dz-terms-content" id="scrollNavSection04">
                                    <h4 className="title">User Data And Privacy</h4>
                                    <ul>
                                        <li>You grant to us an irrevocable, worldwide, non-exclusive, royalty-free, transferable and sublicensable license to access, collect, store and use any data, information, records or files that you load, transmit to or enter into, or that we collect from, CareerExplorer (collectively, “User Data”): (i) to develop, enhance and make available CareerExplorer; and (ii) to produce data, information, or other materials that are not identified as relating to a particular individual or company (such data, information and materials, the “Aggregated Information”). We are free to create, use and disclose Aggregated Information during and after the Term for any purpose and without obligations of any kind. </li>
                                        <li>Please review our current Privacy Policy, available at which contains important information about our practices in collecting, storing, using and disclosing information about identifiable individuals (“Personal Information”), and which is hereby incorporated into and forms a part of these Member Terms.</li>
                                        <li>If you are a member of our mailing list you will also receive email communications from us regarding our products, services and initiatives (including collaborations and partnerships). If you do not wish to receive these communications, you can unsubscribe from such promotional e-mails at any time by clicking on the unsubscribe link in any of our e-mail communications.</li>
                                    </ul>
                                </div>                                
                                <div className="dz-terms-content" id="scrollNavSection05">
                                    <h4 className="title">Ownership Of CareerExplorer</h4>
                                    <ul>
                                        <li>All right, title and interest, including intellectual property rights, in CareerExplorer and all other materials provided by us hereunder, and any updates, adaptation, translation, customization or derivative works thereof, will remain the sole property of Sokanu (or our third-party suppliers, if applicable). </li>
                                        <li>CareerExplorer and all materials provided by us hereunder are made available or licensed and not “sold” to you. </li>
                                        <li>CareerExplorer and all other materials provided by us hereunder, including content we make available through or in CareerExplorer, are protected by copyright in Canada, the United States and elsewhere in the world pursuant to the Berne Convention.  You are prohibited from modifying, copying, reproducing, publishing, posting, transmitting, distributing, creating derivative works from, decompiling, transferring or selling any of CareerExplorer, the Software or other materials provided by us hereunder, or sharing or granting access in any of the foregoing to any third party for any purpose.</li>
                                        <li>All rights not expressly granted to you in these Member Terms are reserved by Sokanu.</li>
                                    </ul>
                                </div>                                
                                <div className="dz-terms-content" id="scrollNavSection06">
                                    <h4 className="title">Additional Terms</h4>
                                    <p>Your access to and use of certain functionalities provided in or through CareerExplorer may be subject to additional terms and conditions presented to you by Sokanu or its service providers. Such additional terms and conditions are incorporated herein by reference.  If there is a conflict or inconsistency between the terms and conditions of such additional terms and these Member Terms, then the provisions of these Member Terms will govern to the extent of such conflict or inconsistency, unless the conflicting term in the additional terms expressly states that the conflicting term in these Member Terms do not apply. If you do not accept and agree to such additional terms and conditions, you may not be able to, and you should not, access or use those functionalities.</p>
                                </div>                                
                                <div className="dz-terms-content" id="scrollNavSection07">
                                    <h4 className="title">Your Responsibilities</h4>
                                    <p>You agree to:</p>
                                    <ul>
                                        <li>keep your User IDs and all other login information confidential;</li>
                                        <li>monitor and control all activity conducted through your account in connection with CareerExplorer;</li>
                                        <li>promptly notify us if you become aware or reasonably suspect any illegal or unauthorized activity or a security breach involving your account, including any loss, theft, or unauthorized disclosure or use of a User ID or account;</li>
                                        <li>upload and disseminate only data to which you own all required rights under law and do so only consistent with applicable law;</li>
                                        <li>use reasonable efforts to prevent unauthorized access to or use of CareerExplorer; and</li>
                                        <li>comply with all applicable laws and regulations, including, but not limited to, all intellectual property, data, privacy any export control laws.</li>
                                    </ul>
                                </div>                                
                                <div className="dz-terms-content" id="scrollNavSection08">
                                    <h4 className="title">Communications Not Confidential</h4>
                                    <p>We do not guarantee the confidentiality of any communications made by you through CareerExplorer. We do not guarantee the security of data transmitted over the Internet or public networks in connection with your use of CareerExplorer.</p>
                                </div>                                
                                <div className="dz-terms-content" id="scrollNavSection09">
                                    <h4 className="title">Feedback</h4>
                                    <p>You agree that any suggestion or idea provided by you (such as suggestions or ideas, “Feedback”) will not be treated as confidential, and nothing in these Member Terms will restrict our right to use, profit from, disclose, publish or otherwise exploit any Feedback, without compensation to you.</p>
                                </div>                                
                                <div className="dz-terms-content" id="scrollNavSection10">
                                    <h4 className="title">Contact</h4>
                                    <p>If you have any questions or comments regarding these Member Terms, please contact us at <strong><a className="text-dark gmail" target="_blank" rel="noreferrer" href="mailto:dexignzones@gmail.com">dexignzones@gmail.com</a></strong></p>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="call-action style-1 content-inner-1">
			        <div className="container">
                        <UpdateBlog />
                    </div>
                </div>
            </div>
        </>
    );
};


export default TermsCondition;