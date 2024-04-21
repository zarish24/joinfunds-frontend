import React from "react";
import { Link } from "react-router-dom";

import PageBanner from "./../layouts/PageBanner";

//images
import bgImage from "./../assets/images/banner/bnr1.jpg";
import pic1 from "./../assets/images/IMG-20231128-WA0006.jpg";
import about from "./../assets/images/about/pic1.jpg";
import signature from "./../assets/images/about/signature.png";
import bg4 from "./../assets/images/background/bg4.jpg";

//import shape1 from './../assets/images/pattern/shape1.png';
//import shape2 from './../assets/images/pattern/shape2.png';
//import shape3 from './../assets/images/pattern/shape3.png';
//import shape5 from './../assets/images/pattern/shape5.png';
//import shape6 from './../assets/images/pattern/shape6.png';
import NewsSlider from "../components/Home/NewsSlider";
import UpdateBlog from "../components/Home/UpdateBlog";
import OurMission from "../components/OurMission";
import { IMAGES } from "../constant/theme";

const iconBlog = [ { title: "Responsibility" }];

const wrapperBlog = [
  { icon: "flaticon-vr-glasses", title: "Quo Maxime Qui Impedit Odio Soluta" },
  {
    icon: "flaticon-transformation",
    title: "Ut Nisi Ea Vero Itaque Error Magnam",
  },
  { icon: "flaticon-doctor-bag", title: "Quaerat Nobis Est" },
  { icon: "flaticon-open-book", title: "Deleniti Iure Ipsa Eos Eaque Under" },
];

const AboutUs = () => {
  return (
    <>
      <div className="page-content bg-white">
        <PageBanner
          maintitle="Home"
          pagetitle="About Us"
          background={bgImage}
        />
        <section className="content-inner section-wrapper5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="section-head">
                  <h5 className="sub-title">Who We Are</h5>
                  <h2>Join Funds - Uniting Hearts and Changing Lives! </h2>
                  <p className="m-t20">
                  Join Funds serves as a catalyst for change, linking passionate individuals and organisation with impactful causes, empowering them to pave the way towards a liberated and promising future. 
{" "}
                  </p>
                  <p>
                  JoinFund is here for ALL.
                  </p>
                  <p>
                  By having a large reach of potential donors, JoinFund can do so much more than an individual or small group of people can do.
                  </p>
                </div>

                {iconBlog.map((data, index) => (
                  <div
                    className="icon-bx-wraper box-hover style-2 m-b30"
                    key={index}
                  >
                    <div className="icon-lg">
                      <Link to={"#"} className="icon-cell">
                        <i className="flaticon-shield"></i>
                      </Link>
                    </div>
                    <div className="icon-content">
                      <h5 className="dz-tilte m-b5 text-capitalize">
                        {data.title}
                      </h5>
                      <p>
                      At Join Funds, we are on a mission where we believe in the power of giving, drive freedom and positive change in our community. We believe in the transformative power of unity, where every hand joined symbolises not just an act of giving, but a promise of individuals brighter tomorrows. {" "}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-lg-5 m-b30">
                <div className="dz-media">
                  <img src={pic1} alt="image" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          hidden
          className="content-inner-2 overlay-primary-dark about-wrapper2 bg-img-fix"
          style={{
            backgroundImage: "url(" + bg4 + ")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container">
            <div className="about-bx2">
              <div className="row g-0">
                <div className="col-lg-4">
                  <div className="dz-media">
                    <img src={about} alt="image" />
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="dz-info">
                    <h2 className="title m-b30 m-md-b20">
                      Fundraising is the gentle art of teaching the joy of
                      giving
                    </h2>
                    <p className="text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim exercitation ullamco laboris nisi
                      ut aliquip ex ea commodo consequat. Duis aute irure dolor
                      in reprehenderit in voluptate velit esse cillum dolore eu
                      fugiat nulla pariatur.
                    </p>
                    <div className="signature">
                      <img src={signature} alt="image" />
                      <p className="text-dark m-t15 mb-0">William Durant</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="content-inner">
          <div className="container">
            <div className="section-head text-center">
              {/* <h5 className="sub-title">CATEGORIES</h5> */}
              <h1 className="m-b20">Why choose JoinFund?</h1>
              <p>
              The pursuit of freedom for individuals is a constitutional and universal aspiration. This spirit of inspiration, when combined with the ingrained human desire to help others, can make a real difference in the community. If you're interested in nurturing and embracing your instinct for freedom, we invite you to partner with us in meaningful ways that ensure your fundraising efforts have a far-reaching, lasting impact. Join and become a significant part of something truly extraordinary!
              </p>
              {/* <p>
              FIND YOUR PURPOSE.  Get Nufsed.  Live free.
              </p> */}
            </div>
            <div className="row" hidden>
              {wrapperBlog.map((item, ind) => (
                <div className="col-lg-6 col-md-12 col-sm-12" key={ind}>
                  <div className="icon-bx-wraper box-hover style-2 m-b30">
                    <div className="icon-lg">
                      <Link to={"/services-details"} className="icon-cell">
                        <i className={item.icon}></i>
                      </Link>
                    </div>
                    <div className="icon-content">
                      <h5 className="dz-tilte m-b10 text-capitalize">
                        {item.title}
                      </h5>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do labore et dolore magna aliqua.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section hidden className="content-inner-2 bg-light section-pattren1">
          <div className="container">
            <div className="row about-bx3 align-items-center">
              <OurMission />
            </div>
          </div>
          <img src={IMAGES.Shape1} className="shape-1 move-1" alt="shape" />
          <img src={IMAGES.Shape2} className="shape-2 move-2" alt="shape" />
          <img src={IMAGES.Shape3} className="shape-3 move-1" alt="shape" />
          <img src={IMAGES.Shape5} className="shape-4 rotating" alt="shape" />
          <img src={IMAGES.Shape6} className="shape-5 rotating" alt="shape" />
          <img src={IMAGES.Shape6} className="shape-6 rotating" alt="shape" />
        </section>
        <section hidden className="content-inner-2">
          <div className="container">
            <div className="section-head text-center">
              <h2 className="title">Nfu$e News</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
            </div>
            <NewsSlider />
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

export default AboutUs;
