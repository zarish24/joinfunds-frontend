import React from 'react';
import {Link} from 'react-router-dom';
import { Accordion } from 'react-bootstrap';

import PageBanner from './../layouts/PageBanner';
import bgImage from './../assets/images/banner/bnr4.jpg';
import project3 from './../assets/images/IMG-20231128-WA0004.jpg';
import project2 from './../assets/images/IMG-20231128-WA0004.jpg';
import project6 from './../assets/images/IMG-20231128-WA0004.jpg';
import UpdateBlog from '../components/Home/UpdateBlog';


const accordBlog = [
    // {
    //     title: "How does the money I raise get to my account?",
    //     paragraph: "Nfuse uses Stripe as our payment processor. When you create your campaign, you'll add a Stripe email address so that donations go directly to your account." +
    //     "You or the campaign recipient will add your personal details and banking information to your Stripe Account, which is separate from Nfuse. Once your Stripe account is set up, any donations made to your campaign will go straight to your Stripe account, and then to your bank account." +
    //     "Stripe charges a fee of 2.9% + $0.30 per transaction - this goes to Stripe, Nfuse does not receive any part of that transaction cost.<br>"
    // },
    {
        title: "How much campaign will cost?",
        paragraph:
            "JoinFunds.com is a crowdfunding platform that operates on the charitable contributions of our campaign owners and supporters, ensuring that users are never prompted to make payments directly to us. Presently, our third-party payment processor imposes a transaction fee of 5%  per transaction, which is deducted from the total contribution amount during payment processing."
    },
    {
        title: "Are my funds secure?",
        paragraph:
            "Yes, your funds are secure. Join Funds employs robust security measures to ensure the safety of all transactions through SSL encryption and also donors information."
    },
    {
        title: "Does Join Funds disclose my personal information?",
        paragraph: `
        Join Funds takes user privacy seriously and adheres to strict privacy policies. Your personal information is not disclosed to third parties without your consent, except as required by law. 
        `
    },
    {
        title: "Are my funds eligible for tax deduction? ",
        paragraph:
            "Funds raised on Join Funds are generally not tax-deductible unless you are giving directly to a 501(c) 3 non-profit organization with a government issued EIN Tax ID #. Please consult your own tax adviser on any giving you may do on Join Funds.      "
    },
    {
        title: "What if I think that Campaign is deceptive? ",
        paragraph:
            "If you believe a campaign is fraud, please click here or contact our support team immediately. We take all reports of deceptive practices seriously and will investigate accordingly."
    }
];

const Faq = () => {
    function isScrolledIntoView(elem){
        const spliBox = document.querySelectorAll(elem);        
        spliBox.forEach(myFunction);
        function myFunction(item, index) {
            //   console.log('splitbox',item);
            const docViewTop = window.scrollY;
            const docViewBottom = docViewTop + window.innerHeight;
            let elemTop = item.getBoundingClientRect().top + docViewTop;
            const elemBottom = elemTop + item.offsetHeight;
            if((elemBottom <= docViewBottom) && (elemTop >= docViewTop)){                
                item.classList.add('split-active');
            }
        }
         
    }
    window.addEventListener("scroll", () => {
        isScrolledIntoView('.split-box');
    });   
    return (
        <>
            <div className="page-content bg-white">
                <PageBanner maintitle="Home" pagetitle="FAQ" background={bgImage} />
                <section className="content-inner" hidden>
                    <div className="container">
                        <div className="row align-items-center flex-column-reverse flex-lg-row">
                            <div className="col-lg-6 align-self-center">
                                <div className="section-head m-b30">
                                    <h2 className="title">What Is JoinFund ?</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                </div>
                                <Accordion className="accordion dz-accordion accordion-sm" id="accordionFaq1">
                                    {accordBlog.map((item, index)=>(
                                        <Accordion.Item className="accordion-item" key={index} eventKey={index}>
                                            <Accordion.Header as="h2"  id="headingOne1">
                                                {item.title}
                                                <span className="toggle-close"></span>
                                            </Accordion.Header>
                                            <div id="collapseOne1" className="accordion-collapse " eventKey={index}>
                                                <Accordion.Body >
                                                    <p className="m-b0">Vestibulum nibh risus, lobortis in neque eleifend, varius vulputate sem. Donec maximus, sapien id auctor ornare, odio mi luctus massa, id rhoncus velit purus eu turpis onec aliquet mauris est.</p>
                                                </Accordion.Body>
                                            </div>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </div>
                            <div className="col-lg-6 order-lg-2 order-1 m-b30">
                                <div className="dz-media split-box rounded" >
                                    <div>
                                        <img src={project3} alt="FAQ Image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-light content-inner" hidden>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 m-b30">
                                <div className="dz-media split-box rounded">
                                    <div>
                                        <img src={project2} alt="FAQ Image" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 align-self-center m-b10">
                                <div className="section-head m-b30">
                                    <h2 className="title">My donation secure?</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                </div>
                                <Accordion className="accordion dz-accordion accordion-sm" id="accordionFaq1">
                                    {accordBlog.map((item, index)=>(
                                        <Accordion.Item className="accordion-item" key={index} eventKey={index}>
                                            <Accordion.Header as="h2"  id="headingOne1">
                                                {item.title}
                                                <span className="toggle-close"></span>
                                            </Accordion.Header>
                                            <div id="collapseOne1" className="accordion-collapse " eventKey={index}>
                                                <Accordion.Body >
                                                    <p className="m-b0">Vestibulum nibh risus, lobortis in neque eleifend, varius vulputate sem. Donec maximus, sapien id auctor ornare, odio mi luctus massa, id rhoncus velit purus eu turpis onec aliquet mauris est.</p>
                                                </Accordion.Body>
                                            </div>
                                        </Accordion.Item>
                                    ))}

                                </Accordion>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content-inner-2">
                    <div className="container">
                        <div className="row align-items-center flex-column-reverse flex-lg-row">
                            <div className="col-lg-6 align-self-center">
                                <div className="section-head m-b30">
                                    <h2 className="title">Most Frequent Question</h2>
                                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
                                </div>
                                <Accordion className="accordion dz-accordion accordion-sm" id="accordionFaq1">
                                    <Accordion.Item className="accordion-item" key="1" eventKey="1">
                                        <Accordion.Header as="h2"  id="headingOne1">
                                        How much campaign will cost? 
                                            <span className="toggle-close"></span>
                                        </Accordion.Header>
                                        <div id="collapseOne1" className="accordion-collapse " eventKey="1">
                                            <Accordion.Body >
                                                <p className="m-b0">
                                                JoinFunds.com is a crowdfunding platform that operates on the charitable contributions of our campaign owners and supporters, ensuring that users are never prompted to make payments directly to us. Presently, our third-party payment processor imposes a transaction fee of 5%  per transaction, which is deducted from the total contribution amount during payment processing.
                                                </p>
                                                {/* <p className="m-b0 mt-2">
                                                Stripe charges a fee of 2.9% + $0.30 per transaction - this goes to Stripe, JoinFund does not receive any part of that transaction cost.
                                                </p>
                                                <p className="m-b0 mt-2">
                                                After the first donation, the initial transfer from your Stripe account to your bank account will occur after 7 days. Subsequent transfers will occur every 2 days after that. You can check your account to know when the next transfer is scheduled. If your campaign is closed and has reached its desired amount or has some desired funds, you can request a payout. Follow these steps: First, log in to your JoinFund account and navigate to the "My Campaigns" section. Then, open the relevant campaign. If the campaign has a closed status and has reached the desired amount, you will see a "payout-request" button. Click on it to submit a payout request. After the admin approves it, the amount will be transferred to your bank account as the campaign owner. You can view the total holding amount in the "dashboard" tab if you are managing one or multiple campaigns.
                                                </p> */}
                                            </Accordion.Body>
                                        </div>
                                    </Accordion.Item>
                                    {/* <Accordion.Item className="accordion-item" key="2" eventKey="2">
                                        <Accordion.Header as="h2"  id="headingOne1">
                                            Are there any fees on donations made to my campaign?
                                            <span className="toggle-close"></span>
                                        </Accordion.Header>
                                        <div id="collapseOne2" className="accordion-collapse " eventKey="2">
                                            <Accordion.Body >
                                                <p className="m-b0">
                                                Nfuse does not charge any fees, we rely on voluntary donations. Stripe, the payment processor, takes 2.9% + $0.30 for each transaction.
                                                </p>
                                            </Accordion.Body>
                                        </div>
                                    </Accordion.Item> */}
                                    <Accordion.Item className="accordion-item" key="3" eventKey="3">
                                        <Accordion.Header as="h2"  id="headingOne1">
                                            Are there any fees on donations made to my campaign?
                                            <span className="toggle-close"></span>
                                        </Accordion.Header>
                                        <div id="collapseOne3" className="accordion-collapse " eventKey="3">
                                            <Accordion.Body >
                                                <p className="m-b0">
                                                JoinFund does not charge any fees, we rely on voluntary donations. Stripe, the payment processor, takes 2.9% + $0.30 for each transaction.
                                                </p>
                                            </Accordion.Body>
                                        </div>
                                    </Accordion.Item>
                                    <Accordion.Item className="accordion-item" key="4" eventKey="4">
                                        <Accordion.Header as="h2"  id="headingOne1">
                                        Are my funds secure?
                                            <span className="toggle-close"></span>
                                        </Accordion.Header>
                                        <div id="collapseOne4" className="accordion-collapse " eventKey="4">
                                            <Accordion.Body >
                                                <p className="m-b0">
                                                Yes, your funds are secure. Join Funds employs robust security measures to ensure the safety of all transactions through SSL encryption and also donors information. 

                                                </p>
                                               
                                            </Accordion.Body>
                                        </div>
                                    </Accordion.Item>
                                    <Accordion.Item className="accordion-item" key="5" eventKey="5">
                                        <Accordion.Header as="h2"  id="headingOne1">
                                        Does Join Funds disclose my personal information? 
                                            <span className="toggle-close"></span>
                                        </Accordion.Header>
                                        <div id="collapseOne5" className="accordion-collapse " eventKey="5">
                                            <Accordion.Body >
                                                <p className="m-b0">
                                                Join Funds takes user privacy seriously and adheres to strict privacy policies. Your personal information is not disclosed to third parties without your consent, except as required by law
                                                </p>
                                            </Accordion.Body>
                                        </div>
                                    </Accordion.Item>
                                    <Accordion.Item className="accordion-item" key="6" eventKey="6">
                                        <Accordion.Header as="h2"  id="headingOne1">
                                        Are my funds eligible for tax deduction? 
                                            <span className="toggle-close"></span>
                                        </Accordion.Header>
                                        <div id="collapseOne5" className="accordion-collapse " eventKey="5">
                                            <Accordion.Body >
                                                <p className="m-b0">
                                                Funds raised on Join Funds are generally not tax-deductible unless you are giving directly to a 501(c) 3 non-profit organization with a government issued EIN Tax ID #. Please consult your own tax adviser on any giving you may do on Join Funds. 
                                                </p>
                                            </Accordion.Body>
                                        </div>
                                    </Accordion.Item>
                                    <Accordion.Item className="accordion-item" key="7" eventKey="7">
                                        <Accordion.Header as="h2"  id="headingOne1">
                                        What if I think that Campaign is deceptive?
                                            <span className="toggle-close"></span>
                                        </Accordion.Header>
                                        <div id="collapseOne5" className="accordion-collapse " eventKey="5">
                                            <Accordion.Body >
                                                <p className="m-b0">
                                                If you believe a campaign is fraud, please click here or contact our support team immediately. We take all reports of deceptive practices seriously and will investigate accordingly.
                                                </p>
                                            </Accordion.Body>
                                        </div>
                                    </Accordion.Item>
                                    <Accordion.Item className="accordion-item" key="8" eventKey="8">
                                        <Accordion.Header as="h2"  id="headingOne1">
                                        What if I think that Campaign is deceptive?
                                            <span className="toggle-close"></span>
                                        </Accordion.Header>
                                        <div id="collapseOne5" className="accordion-collapse " eventKey="5">
                                            <Accordion.Body >
                                                <p className="m-b0">
                                                If you believe a campaign is fraud, please click here or contact our support team immediately. We take all reports of deceptive practices seriously and will investigate accordingly.
                                                </p>
                                            </Accordion.Body>
                                        </div>
                                    </Accordion.Item>
                                    <Accordion.Item className="accordion-item" key="9" eventKey="9">
                                        <Accordion.Header as="h2"  id="headingOne1">
                                        When can I expect to receive the funds I've raised? 
                                            <span className="toggle-close"></span>
                                        </Accordion.Header>
                                        <div id="collapseOne5" className="accordion-collapse " eventKey="5">
                                            <Accordion.Body >
                                                <p className="m-b0">
                                                Funds raised through campaign are typically disbursed according to the platform's disbursement schedule, which may vary depending on factors such as payment processing times and fundraising goals reached. Simply login and set up your transfers and bank accounts.
                                                </p>
                                            </Accordion.Body>
                                        </div>
                                    </Accordion.Item>
                                    <Accordion.Item className="accordion-item" key="10" eventKey="10">
                                        <Accordion.Header as="h2"  id="headingOne1">
                                        What information should I know regarding taxation?  
                                            <span className="toggle-close"></span>
                                        </Accordion.Header>
                                        <div id="collapseOne5" className="accordion-collapse " eventKey="5">
                                            <Accordion.Body >
                                                <p className="m-b0">
                                                We recommend consulting with a tax professional for personalised advice. 
                                                </p>
                                            </Accordion.Body>
                                        </div>
                                    </Accordion.Item>
                                    <Accordion.Item className="accordion-item" key="11" eventKey="11">
                                        <Accordion.Header as="h2"  id="headingOne1">
                                        Am I going to be provided with a 1099-K, and what are the necessary steps to take with it?   
                                            <span className="toggle-close"></span>
                                        </Accordion.Header>
                                        <div id="collapseOne5" className="accordion-collapse " eventKey="5">
                                            <Accordion.Body >
                                                <p className="m-b0">
                                                Depending on your fundraising activities, you may receive a 1099-K form from Join Funds. It's important to report any income accurately on your tax returns and consult with a tax professional for guidance on how to handle the 1099-K.  
                                                </p>
                                            </Accordion.Body>
                                        </div>
                                    </Accordion.Item>
                                    <Accordion.Item className="accordion-item" key="12" eventKey="12">
                                        <Accordion.Header as="h2"  id="headingOne1">
                                        What should I do if I can't remember my password?   
                                            <span className="toggle-close"></span>
                                        </Accordion.Header>
                                        <div id="collapseOne5" className="accordion-collapse " eventKey="5">
                                            <Accordion.Body >
                                                <p className="m-b0">
                                                If you can't remember your password, you can use the "Forgot Password" feature on the login page to reset it. Follow the instructions provided to regain access to your account. You can also email us for any query at info@joinfunds.com. 
  
                                                </p>
                                            </Accordion.Body>
                                        </div>
                                    </Accordion.Item>
                                    <Accordion.Item className="accordion-item" key="13" eventKey="13">
                                        <Accordion.Header as="h2"  id="headingOne1">
                                        Are there fees associated with using fundraising websites?    
                                            <span className="toggle-close"></span>
                                        </Accordion.Header>
                                        <div id="collapseOne5" className="accordion-collapse " eventKey="5">
                                            <Accordion.Body >
                                                <p className="m-b0">
                                                Yes, there may be fees associated with using fundraising websites, such as processing fees or platform fees. These fees help cover the costs of operating the platform and providing support services.  
                                                </p>
                                            </Accordion.Body>
                                        </div>
                                    </Accordion.Item>
                                    <Accordion.Item className="accordion-item" key="14" eventKey="14">
                                        <Accordion.Header as="h2"  id="headingOne1">
                                        Is there a minimum or maximum amount I can raise?    
                                            <span className="toggle-close"></span>
                                        </Accordion.Header>
                                        <div id="collapseOne5" className="accordion-collapse " eventKey="5">
                                            <Accordion.Body >
                                                <p className="m-b0">
                                                There is typically no minimum or maximum amount you can raise on Join Funds. However, individual campaigns may set fundraising goals or limits based on specific needs or objectives.  
                                                </p>
                                            </Accordion.Body>
                                        </div>
                                    </Accordion.Item>
                                    <Accordion.Item className="accordion-item" key="15" eventKey="15">
                                        <Accordion.Header as="h2"  id="headingOne1">
                                        How can I promote my fundraising campaign?    
                                            <span className="toggle-close"></span>
                                        </Accordion.Header>
                                        <div id="collapseOne5" className="accordion-collapse " eventKey="5">
                                            <Accordion.Body >
                                                <p className="m-b0">
                                                You can promote your fundraising campaign through various channels, including social media, email newsletters, personal networks, and community events. Utilize the tools and resources provided by Join Funds to maximize your outreach efforts.   
                                                </p>
                                            </Accordion.Body>
                                        </div>
                                    </Accordion.Item>
                                    <Accordion.Item className="accordion-item" key="16" eventKey="16">
                                        <Accordion.Header as="h2"  id="headingOne1">
                                        Is there customer support available if I encounter issues?     
                                            <span className="toggle-close"></span>
                                        </Accordion.Header>
                                        <div id="collapseOne5" className="accordion-collapse " eventKey="5">
                                            <Accordion.Body >
                                                <p className="m-b0">
                                                Yes, customer support is available to assist you with any issues or questions you may have. You can reach customer support 24/7. This support is usually available via email, phone, or live chat, and response times may vary for nature of the inquiry.   
                                                </p>
                                            </Accordion.Body>
                                        </div>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="col-lg-6 order-lg-2 order-1 m-b30">
                                <div className="dz-media split-box rounded" >
                                    <div>
                                        <img src={project6} alt="FAQ Image" />
                                    </div>
                                </div>
                            </div>
                        </div>
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


export default Faq;