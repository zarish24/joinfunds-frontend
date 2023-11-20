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
                                            <li><Link to="scrollNavSection01" className="nav-link scroll">ACCEPTANCE OF TERMS/TERMS OF SERVICE</Link></li>
                                            <li><Link to="scrollNavSection02" className="nav-link scroll">INTRODUCTION</Link></li>
                                            <li><Link to="scrollNavSection03" className="nav-link scroll">COMMUNICATION</Link></li>
                                            <li><Link to="scrollNavSection04" className="nav-link scroll">Nfuse.COM ACCOUNTS</Link></li>
                                            <li><Link to="scrollNavSection05" className="nav-link scroll">DEFINITIONS</Link></li>
                                            <li><Link to="scrollNavSection06" className="nav-link scroll">Nfuse IS A VENUE/WHAT WE DO</Link></li>
                                            <li><Link to="scrollNavSection07" className="nav-link scroll">ANTI MONEY LAUNDERING AND </Link></li>
                                            {/* <li><Link to="scrollNavSection08" className="nav-link scroll">Communications Not Confidential</Link></li> */}
                                            <li><Link to="scrollNavSection09" className="nav-link scroll">Feedback</Link></li>
                                            <li><Link to="scrollNavSection10" className="nav-link scroll">Contact</Link></li>
                                        </ul>
                                    </div>
                                </aside>
                            </div>
                            <div className="col-xl-8 col-lg-7">					
                                <div className="dz-terms-content" id="scrollNavSection01">
                                    <h4 className="title">ACCEPTANCE OF TERMS/TERMS OF SERVICE</h4>
                                    <ul>
                                        <p>These Terms of Service govern your use of the Nfuse website and services (referred to hereafter as the Service"). By using the Service, in any way, you are agreeing to be bound and to comply with these Terms of Service (Agreement), our Privacy Policy, and all applicable laws. Nfuse may amend this Agreement at any time by posting a revised version of this Agreement on our website without any notice to you. As a user of the Site you understand and are held responsible for periodically reviewing the terms of this User Agreement. Your access to or continued use of the Service after the effective date of the revised Agreement constitutes your acceptance of the modified Agreement. Should you object to any term or condition of this Agreement, any guidelines, any future changes, or become dissatisfied with Nfuse in any way, your sole recourse is to immediately discontinue the use of Nfuse. This Agreement constitutes the complete and entire understanding between Nfuse and you in connection with your use of this Website, content and software displayed on the Website, and hyperlinks to the Website. This Agreement supersedes any prior agreements, proposals, and or understandings between you and Nfuse, including but not limited to prior versions of the Agreement. The failure of Nfuse to exercise or enforce any right or provision of the Agreement shall not constitute a waiver of such right or provision. If any provision of the Agreement is found by a court of competent jurisdiction to be invalid, the parties nevertheless agree that the court should endeavor to give effect to the parties intentions as reflected in the provision, and the other provisions of the Agreement remain in full force and effect. You agree that regardless of any statute or law to the contrary, any claim or cause of action arising out of or related to use of the Service or the Agreement must be filed within one 60 days after such claim or cause of action arose or be forever barred.</p>
                                    </ul>
                                </div>                                
                                <div className="dz-terms-content" id="scrollNavSection02">
                                    <h4 className="title">INTRODUCTION</h4>
                                    <ul>
                                        <p>These Terms and Conditions may only be modified by an authorized executive of Nfuse LLC These Terms and Conditions will be binding upon and will inure to the benefit of the parties, their successors and permitted assigns.
Nfuse.com processes payment transactions through 3rd-party payment solutions. Nfuse is not a chartered banking entity. All funds that are not part of a fee paid to Nfuse.com are paid directly to 3rd-party payment solutions.
You will not hold Nfuse liable or responsible for any funds or tax obligations on those funds paid to 3rd-party payment solutions.
Givers and Campaign Owners agree not to involve Nfuse in any litigation that occurs due to using the website.
Nfuse.com is owned by Nfuse LLC. Nfuse will not be held liable for any loss or damage due to failure to comply to the terms of this agreement.</p>
                                    </ul>
                                </div>                                    
                                <div className="dz-terms-content" id="scrollNavSection03">
                                    <h4 className="title">COMMUNICATION</h4>
                                    <ul>
                                        <p>Electronic communications from Nfuse will be sent to Users to inform them of a variety of events that inform them about the state of their fund. You agree to allow Nfuse to send these communications to your email address. You also agree that Nfuse is not liable for any user generated content that is sent to you as a part of these communications. You agree that you are liable for any communications you send to potential Givers promoting your Campaign. These communications include, but are not limited to, emails sent through the Nfuse.com website and communications sent outside of the Nfuse system.</p>
                                    </ul>
                                </div>                                    
                                <div className="dz-terms-content" id="scrollNavSection04">
                                    <h4 className="title">Nfuse.COM ACCOUNTS</h4>
                                    <ul>
                                       <p>Nfuse reserves the right to delete Campaign Owner Campaigns at our discretion. You are fully responsible for any content you post as a User or a Giver. You agree by becoming a Campaign Owner or Giver that you will not:
1) Use sexually explicit content, obscenities, copyrighted material, or abusive/hateful language in any area of the site
2) Use your Nfuse account for any illegal purposes.
3) Provide information that is not complete and accurate.
4) Attempt to bypass or otherwise circumvent the designated method of payment as provided by Nfuse.
Nfuse has the right to, though will not be obligated to, in Nfuse's sole discretion, to remove any content or block any individual or entity for any reason.
Nfuse will have no obligation to provide a refund of any amounts previously paid.
Nfuse does not and can not review all the material posted to the Nfuse.com system.
By visiting Nfuse.com you are responsible for protecting yourself from content that is offensive or harmful that may have been posted on the website by another user.
By visiting Nfuse.com you are responsible for protecting your equipment (computer, etc.) from any harm resulting from a visit to the website.
As a Nfuse user, the online donation page you publish will be publicly available on the internet, for all to see, including search engines like Google and Yahoo. There are no private or hidden Nfuse donation pages. Your activity is public.
Nfuse may attempt to verify your identity and other information you provided to us, and we may delay, withhold, reverse or refund any Contributions or other amounts without notice or liability in the event we are unable to verify any information to our satisfaction.
Nfuse requires all Campaign Owners to sign up for an account by completing all required fields on the relevant registration pages on the Site. As part of the registration process, you agree to provide:
(a) information about yourself that is truthful, current, complete and accurate; and
(b) update this information so as to maintain its accuracy.
You are solely responsible for maintaining the confidentiality of your password, username and all uses of your Campaign Account regardless of whether you have authorized such uses. You shall not share your account with anyone else. You agree not to use the account, username or password of anyone else. You shall not disclose your password to anyone else.
All of your registration information must be accurate and truthful. You agree to notify Nfuse immediately if you discover that your User account has been used without your authorization or there has been any other breach of your User account's security. You also agree to provide additional information we may reasonably request and to answer truthfully and completely any questions we might ask you in order to verify your identity.</p>
                                    </ul>
                                </div>                                
                                <div className="dz-terms-content" id="scrollNavSection05">
                                    <h4 className="title">DEFINITIONS</h4>
                                    <ul>
                                    In this Agreement the following phrases are defined as: Service: Nfuse.com the website and its functions.
Campaign Owners: Those using the Service to raise funds.
Campaigns: The fundraising campaigns.
Users: Campaign Owners, Givers, and other visitors to the Service.
Givers: An individual or entity that contributes to a fund or posts a comment to a fund
Contributions: Funds contributed by a Giver to Campaign Owners.
                                    </ul>
                                </div>                                
                                <div className="dz-terms-content" id="scrollNavSection06">
                                    <h4 className="title">Nfuse IS A VENUE/WHAT WE DO</h4>
                                    <p>Nfuse is an online Christian fundraising/crowdfunding website that provides fundraising tools to individuals and non-profit organizations seeking to raise money for their own Campaigns and to contribute to the Campaigns of others. Campaign causes and projects can include: neighborhoods in need, memorial/funeral expenses, medical expenses, tuition assistance, adoption fundraising, funding for mission trips, legal expenses and other causes. Each Campaign Owner who creates an active account receives a personal fundraising profile page where they can share their fundraising mission, post photos and videos about their mission, as well as receive credit card contributions. Each Campaign allows Givers to donate money toward a specified goal, established by the Campaign Owner. Users use the Service at their own risk.</p>
                                </div>                                
                                <div className="dz-terms-content" id="scrollNavSection07">
                                    <h4 className="title">COMMUNITY GUIDELINES</h4>
                                    <p>Nfuse.com is not a place for hatred, abuse, disrespect, profanity, meanness, harassment, or spam Do not: use the Service to promote violence, degradation, subjugation, discrimination or hatred against individuals or groups based on race, ethnic origin, religion, disability, gender, age, veteran status;
post images or videos that are sexually explicit or post links to sites that contain sexually explicit material or show people or animals being hurt or degraded;
spam the comments sections or other Users with offers of goods and services or inappropriate messages;
engage in any activity that interferes with or disrupts the proper working of the Service or any activities conducted on the Service; or
take any action that imposes, in Nfuse's sole discretion, an unreasonable load on our infrastructure.
We reserve the right to remove Campaigns and terminate User accounts for such activities.</p>
                                    
                                </div>                                
                                <div className="dz-terms-content" id="scrollNavSection08">
                                    <h4 className="title">ANTI MONEY LAUNDERING AND COUNTER TERRORIST FINANCING STATEMENT</h4>
                                    <p>We do not guarantee the confidentiality of any communications made by you through CareerExplorer. We do not guarantee the security of data transmitted over the Internet or public networks in connection with your use of CareerExplorer.</p>
                                </div>                                
                                <div className="dz-terms-content" id="scrollNavSection09">
                                    <h4 className="title">Feedback</h4>
                                    <p>Nfuse’ is committed to full compliance with all applicable laws and regulations regarding Anti- Money Laundering (“AML”). Nfuse’s policy is to prevent people engaged in money laundering, fraud, and other financial crimes, including terrorist financing, from using Nfuse's services. Our third party payment processor has robust policies and procedures to detect, prevent and report suspicious activity. To comply with OFAC (Office of Foreign Asset Control) requirements, and global sanctions, they screen customer accounts against government watch lists. In addition, they may request that our users provide them with documentation to help prove their identity or for business verification purposes. They will report suspicious transactions to the financial intelligence unit in the respective country.</p>
                                </div>                                
                                <div className="dz-terms-content" id="scrollNavSection10">
                                    <h4 className="title">Contact</h4>
                                    <p>If you have any questions about these Terms, the practices of this site, or your dealings with this Website or complaints, please contact us at support@Nfuse.com or at address: Attention or Subject Line: Terms of Use/Legal Department.
             Nfuse LLC
             ATTN: Terms of Use/Legal Department
             8 The Green, STE A
             Dover, DE 19901 <strong><a className="text-dark gmail" target="_blank" rel="noreferrer" href="info@nfuse-me.com
">dexignzones@gmail.com</a></strong></p>
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