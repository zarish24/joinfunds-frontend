import React from 'react';
import { Link } from "react-scroll";

import PageBanner from '../layouts/PageBanner';
//images
import bg from '../assets/images/banner/bnr5.jpg';
import UpdateBlog from '../components/Home/UpdateBlog';

const Privacy = () => {
    return (
        <>
	        <div className="page-content bg-white">
                <PageBanner maintitle="Home" pagetitle="Privacy Policy" background={bg} />
                <div className="content-inner-2">
                    <div className="container">
                        <div className="row dz-terms">
                            <div className="col-xl-4 col-lg-5 m-b40">
                                <aside className="side-bar sticky-top">
                                    <div className="dz-terms-list">
                                        <ul className="navbar-nav navbar-scroll">
                                            <li><Link to="scrollNavSection01" className="nav-link scroll">Acceptance</Link></li>
                                            <li><Link to="scrollNavSection02" className="nav-link scroll">What information we collect</Link></li>
                                            <li><Link to="scrollNavSection03" className="nav-link scroll">How we use your information</Link></li>
                                            <li><Link to="scrollNavSection04" className="nav-link scroll">Disclosure of your information</Link></li>
                                            <li><Link to="scrollNavSection05" className="nav-link scroll">Cookie Policy</Link></li>
                                            <li><Link to="scrollNavSection06" className="nav-link scroll">Data security</Link></li>
                                            <li><Link to="scrollNavSection07" className="nav-link scroll">Children’s Privacy </Link></li>
                                            <li><Link to="scrollNavSection08" className="nav-link scroll">Accessing and correcting your personal information</Link></li>
                                            {/* <li><Link to="scrollNavSection09" className="nav-link scroll">Feedback</Link></li> */}
                                            {/* <li><Link to="scrollNavSection10" className="nav-link scroll">Contact</Link></li> */}
                                        </ul>
                                    </div>
                                </aside>
                            </div>
                            <div className="col-xl-8 col-lg-7">					
                                <div className="dz-terms-content" id="scrollNavSection01">
                                    <h4 className="title">Acceptance</h4>
                                    <ul>
                                        <p>We have created this Privacy Policy (the “Policy”) because we value users’ privacy. The Policy describes the types of information we may collect from you, or that you may provide, when you access www.JoinFund-me.com (the “Site”). This Policy does not apply to information collected by any third party, including through any external website that may link to or be accessible from the Site. Please check directly with each such third party to avoid unfair surprises and misunderstandings.
Your use of this Site constitutes your acceptance of this Privacy Policy. If you do not agree with this Privacy Policy, you may not use our Site. This Policy may change from time to time.   Your continued use of this Site after we revise this Policy is deemed to be acceptance of the revisions, so please check this page from time to time for updates. 
 
</p>
                                    </ul>
                                </div>                                
                                <div className="dz-terms-content" id="scrollNavSection02">
                                    <h4 className="title">What information we collect</h4>
                                    <ul>
                                        <p>We may collect several types of information from and about users of our Site, including the following:
Personal Data: Name, address, email, IP addresses. 
Payment Data: Credit card information. 
Voluntary Data: Information you voluntarily provide to the Site or when you contact us for any reason.
We collect this information:
Directly from you when you provide it to us (e.g. when you contact us for any reason).
Automatically as you navigate through the Site, via services such as Google Analytics. 

</p>
                                    </ul>
                                </div>                                    
                                <div className="dz-terms-content" id="scrollNavSection03">
                                    <h4 className="title">How we use your information</h4>
                                    <ul>
                                        <p>We use information that we collect about you or that you provide to us, including any personal information:
To provide the services you requested.
To notify you about changes to our Site or any services we offer or provide though it.
To carry out our obligations and enforce our rights.
In any other way we may describe when you provide the information.

</p>
                                    </ul>
                                </div>                                    
                                <div className="dz-terms-content" id="scrollNavSection04">
                                    <h4 className="title">Disclosure of your information</h4>
                                    <ul>
                                       <p>We may disclose personal information that we collect or you provide as described in this Policy:
To fulfill the purpose for which you provide it. 
To contractors, service providers and other third parties we use to support our business.
To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution or other sale or transfer of some or all of the Site's assets, whether as a going concern or as part of bankruptcy, liquidation or similar proceeding, in which personal information about our Site users is among the assets transferred.
We may, without restriction, disclose aggregated information about our users and information that does not identify any individual. 
For any other purpose disclosed by us when you provide the information.
We may also disclose your personal information:
To comply with any court order, law or legal process, including to respond to any government or regulatory request.
If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of the Site, our customers or others. 
</p>
                                    </ul>
                                </div>                                
                                <div className="dz-terms-content" id="scrollNavSection05">
                                    <h4 className="title">Cookie Policy</h4>
                                    <ul>
                                    Cookies are small text files which a website may put on your computer or mobile device when you first visit a site or page. The cookie will help our Site, or another website, to recognize your device the next time you visit. For example, cookies can help us to remember your username and preferences, analyze how well our Site is performing, or even allow us to recommend content we believe will be most relevant to you. 
We may use cookies for the following reasons and purposes:
To provide the service you have asked for. Some cookies are essential so you can navigate through the website and use its features. Without these cookies, we would not be able to provide the services you’ve requested. For example, some cookies allow us to identify subscribers and ensure they can access the subscription only pages. If a subscriber opts to disable these cookies, the user will not be able to access all of the content that a subscription entitles them to. These cookies don't gather information about you that could be used for marketing or remembering where you've been on the internet. Essential cookies keep you logged in during your visit, ensure that when you add something to the online shopping basket, it's still there when you get to the checkout and make it possible to navigate through the website smoothly (session cookies).
To improve your browsing experience. These cookies allow the website to remember choices you make, such as your language or region and they provide improved features. These cookies will help remembering your preferences and settings, including marketing preferences, remembering if you've filled in certain forms, so you're not asked to do it again, remembering if you've been to the site before and restricting the number of times you're shown a particular advertisement. We might also use these cookies to highlight Site services that we think will be of interest to you based on your usage of the Site. 
Analytics. To improve your experience on our Site, we like to keep track of what pages and links are popular and which ones don't get used so much to help us keep our sites relevant and up to date. It's also very useful to be able to identify trends of how people navigate (find their way through) our sites and if they get error messages from web pages. This group of cookies, often called “analytics cookies” are used to gather this information. These cookies don't collect information that identifies you. The information collected is anonymous and is grouped with the information from everyone else’s cookies. We can then see the overall patterns of usage rather than any one person’s activity. Analytics cookies only record activity on the site you are on and they are only used to improve how a website works.
We may also use “affiliate” cookies. Some of our web pages will contain promotional links to other companies’ sites. If you follow one of these links and then register with or buy something from that other site, a cookie is sometimes used to tell that other site that you came from one of our sites. That other site may then pay us a small amount for the successful referral.
Our emails may contain a single, campaign-unique “web beacon pixel” to tell us whether our emails are opened and verify any clicks through to links or advertisements within the email. We may use this information for purposes including determining which of our emails are more interesting to users, to query whether users who do not open our emails wish to continue receiving them and to inform our advertisers in aggregate how many users have clicked on their advertisements. The pixel will be deleted when you delete the email. If you do not wish the pixel to be downloaded to your device, you should select to receive emails from us in plain text rather than HTML.
Most browsers allow you to turn off cookies. Switching off cookies may restrict your use of the website and/or delay or affect the way in which it operates. 

                                    </ul>
                                </div>                                
                                <div className="dz-terms-content" id="scrollNavSection06">
                                    <h4 className="title">Data security</h4>
                                    <p>Personal information you provide to us is stored on a password protected server accessible only by administrator. However, we cannot guarantee the security of your personal information transmitted to our Site because any transmission of information over the Internet has its inherent risks. Any transmission of personal information is at your own risk. We are not responsible for circumvention of any privacy settings or security measures contained on the Site. You are responsible for keeping your login credentials, if any, confidential.</p>
                                </div>                                
                                <div className="dz-terms-content" id="scrollNavSection07">
                                    <h4 className="title">Children’s Privacy</h4>
                                    <p>Our site is not directed to children under the age of 13. We do not knowingly collect any personal information about children under the age of 13. If we obtain actual knowledge that we have collected personal information about a child under the age of 13, that information will be immediately deleted from our database. 
If a parent believes that his or her child has submitted personal information to us, he or she can contact us via e-mail at info@JoinFund-me.com. We will promptly delete the information upon learning that it relates to a child under the age of 13. Please note that it is possible some of this information may remain archived in web logs and back-up archives after we delete the information from our active database.

.</p>
                                    
                                </div>                                
                                <div className="dz-terms-content" id="scrollNavSection08">
                                    <h4 className="title">Accessing and correcting your personal information</h4>
                                    <p>Please send us an e-mail to info@JoinFund-me.com to request access to, correct or delete any personal information that you have provided to us or to ask questions about this Privacy Policy. We reserve the right to refuse a request if we believe it would violate any law or cause the information to be incorrect.
</p>
                                </div>                                
                                {/* <div className="dz-terms-content" id="scrollNavSection09">
                                    <h4 className="title">Feedback</h4>
                                    <p>Nfuse’ is committed to full compliance with all applicable laws and regulations regarding Anti- Money Laundering (“AML”). Nfuse’s policy is to prevent people engaged in money laundering, fraud, and other financial crimes, including terrorist financing, from using Nfuse's services. Our third party payment processor has robust policies and procedures to detect, prevent and report suspicious activity. To comply with OFAC (Office of Foreign Asset Control) requirements, and global sanctions, they screen customer accounts against government watch lists. In addition, they may request that our users provide them with documentation to help prove their identity or for business verification purposes. They will report suspicious transactions to the financial intelligence unit in the respective country.</p>
                                </div>                                
                                <div className="dz-terms-content" id="scrollNavSection10">
                                    <h4 className="title">Contact</h4>
                                    <p>If you have any questions about these Terms, the practices of this site, or your dealings with this Website or complaints, please contact us at support@Nfuse.com or at address: Attention or Subject Line: Terms of Use/Legal Department.
             Nfuse LLC
             ATTN: Terms of Use/Legal Department
             8 The Green, STE A
             Dover, DE 19901 <strong><a className="text-dark gmail" target="_blank" rel="noreferrer" href="#">info@nfuse-me.com</a></strong></p>
                                </div>                                 */}
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


export default Privacy;