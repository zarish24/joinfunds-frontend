import React from 'react';
import {Link} from 'react-router-dom';
import { Accordion } from 'react-bootstrap';

import PageBanner from './../layouts/PageBanner';
import bgImage from './../assets/images/banner/bnr4.jpg';
import project3 from './../assets/images/project/pic3.jpg';
import project2 from './../assets/images/project/pic2.jpg';
import project6 from './../assets/images/project/pic6.jpg';
import UpdateBlog from '../components/Home/UpdateBlog';


const accordBlog = [
    {
        title: "How does the money I raise get to my account?",
        paragraph: `
            Nfuse utilizes Stripe as its third-party payment processor. When setting up a campaign, you will link a Stripe account to it, and contributions will be directed straight to your connected Stripe account.<br>
            It's important to note that your Stripe account operates independently of your Nfuse account. Refer to Stripe's terms of use for guidance, as they apply to any transactions conducted through Stripe via Nfuse.<br>
        `
    },
    {
        title: "Are there any fees on donations made to my campaign?",
        paragraph:
            "Nfuse does not charge any fees, we rely on voluntary donations. Stripe, the payment processor, takes 2.9% + $0.30 for each transaction."
    },
    {
        title: "What happens if I don’t reach my campaign goal? Do I lose the donations?",
        paragraph:
            "Nfuse operates on the concept of “KEEP IT ALL”.  Campaign owners quickly receive the money donated, so even if you don't hit your goal you'll keep whatever you raise."
    },
    {
        title: "How can I make sure my fundraiser is successful?",
        paragraph: `
            While there is no way to guarantee success, there are a few things you can do to make it more likely that your campaign will succeed.<br>
            1. First, make sure you have a compelling and detailed description. People are not likely to donate unless they understand who you are, who the beneficiary is, what happened, and why help is needed..<br>
            2. Add clear and descriptive pictures. Videos are even better!<br>
            3. Send personal emails, texts, or messages containing the link to as many of your close friends and family as you believe would be interested in helping the campaign.<br>
            4. Show urgency by defining the specific thing that you need to raise money for and when you need it by.<br>
            5. Keep in contact with your donors and let them know how much you appreciate the support.
        `
    },
    {
        title: "What if my campaign ends and I want to continue fundraising?",
        paragraph:
            "Nfuse campaigns are set to run for 90 days and will automatically end.  Should you need to extend your campaign, please send a message to info@nfuse-me.com and explain your situation.  The requires will be reviewed case by case."
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
                                    <h2 className="title">What Is Nfuse ?</h2>
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
                                            How does the money I raise get to my account?
                                            <span className="toggle-close"></span>
                                        </Accordion.Header>
                                        <div id="collapseOne1" className="accordion-collapse " eventKey="1">
                                            <Accordion.Body >
                                                <p className="m-b0">
                                                    Nfuse utilizes Stripe as its third-party payment processor. When setting up a campaign, you will link a Stripe account to it, and contributions will be directed straight to your connected Stripe account.
                                                </p>
                                                <p className="m-b0 mt-2">
                                                    It's important to note that your Stripe account operates independently of your Nfuse account. Refer to Stripe's terms of use for guidance, as they apply to any transactions conducted through Stripe via Nfuse.
                                                </p>
                                            </Accordion.Body>
                                        </div>
                                    </Accordion.Item>
                                    <Accordion.Item className="accordion-item" key="2" eventKey="2">
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
                                    </Accordion.Item>
                                    <Accordion.Item className="accordion-item" key="3" eventKey="3">
                                        <Accordion.Header as="h2"  id="headingOne1">
                                            Are there any fees on donations made to my campaign?
                                            <span className="toggle-close"></span>
                                        </Accordion.Header>
                                        <div id="collapseOne3" className="accordion-collapse " eventKey="3">
                                            <Accordion.Body >
                                                <p className="m-b0">
                                                Nfuse does not charge any fees, we rely on voluntary donations. Stripe, the payment processor, takes 2.9% + $0.30 for each transaction.
                                                </p>
                                            </Accordion.Body>
                                        </div>
                                    </Accordion.Item>
                                    <Accordion.Item className="accordion-item" key="4" eventKey="4">
                                        <Accordion.Header as="h2"  id="headingOne1">
                                            How can I make sure my fundraiser is successful?
                                            <span className="toggle-close"></span>
                                        </Accordion.Header>
                                        <div id="collapseOne4" className="accordion-collapse " eventKey="4">
                                            <Accordion.Body >
                                                <p className="m-b0">
                                                While there is no way to guarantee success, there are a few things you can do to make it more likely that your campaign will succeed.
                                                </p>
                                                <p className="m-b0">
            1. First, make sure you have a compelling and detailed description. People are not likely to donate unless they understand who you are, who the beneficiary is, what happened, and why help is needed.
                                                </p>
                                                <p className="m-b0">
            2. Add clear and descriptive pictures. Videos are even better!
     
                                                </p>
                                                <p className="m-b0">
                                         
            3. Send personal emails, texts, or messages containing the link to as many of your close friends and family as you believe would be interested in helping the campaign.
                                                </p>
                                                <p className="m-b0">
            4. Show urgency by defining the specific thing that you need to raise money for and when you need it by.
                                                </p>
                                                <p className="m-b0">
            5. Keep in contact with your donors and let them know how much you appreciate the support.
                                                </p>
                                            </Accordion.Body>
                                        </div>
                                    </Accordion.Item>
                                    <Accordion.Item className="accordion-item" key="5" eventKey="5">
                                        <Accordion.Header as="h2"  id="headingOne1">
                                            What if my campaign ends and I want to continue fundraising?
                                            <span className="toggle-close"></span>
                                        </Accordion.Header>
                                        <div id="collapseOne5" className="accordion-collapse " eventKey="5">
                                            <Accordion.Body >
                                                <p className="m-b0">
                                                    Nfuse campaigns are set to run for 90 days and will automatically end.  Should you need to extend your campaign, please send a message to info@nfuse-me.com and explain your situation.  The requires will be reviewed case by case.
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