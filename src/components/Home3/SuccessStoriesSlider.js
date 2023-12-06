import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, { Navigation, Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { IMAGES } from '../../constant/theme';

// Initialize Swiper modules
SwiperCore.use([Navigation, Autoplay, Pagination]);

const dataBlog = [
  { image: IMAGES.largePic1 },
  { image: IMAGES.largePic2 },
  { image: IMAGES.largePic3 },
];

const SuccessStoriesSlider = ({ setReadModal }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  return (
    <>
      <div className="container">
        <div className="row align-items-center wow fadeInUp" data-wow-delay="0.2s">
          <div className="col-md-8 col-sm-8 col-9">
            <div className="section-head">
              <h5 className="sub-title">What people are saying</h5>
              <h2 className="title text-white">Success Stories</h2>
            </div>
          </div>
          <div className="col-md-4 col-sm-4 col-3">
            <div className="swiper-btn float-sm-end m-b40">
              <div className="test-swiper-prev btn-prev text-white" ref={navigationPrevRef}>
                <i className="flaticon-left-arrow-1"></i>
              </div>
              <div className="test-swiper-next btn-next text-white" ref={navigationNextRef}>
                <i className="flaticon-next"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="resize-wrapper">
        <Swiper
          className="testimonial-swiper3 m-b30"
          speed={1500}
          slidesPerView={2}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 3000,
          }}
          navigation={{ prevEl: navigationPrevRef.current, nextEl: navigationNextRef.current }}
          pagination={{ clickable: true }}
          breakpoints={{
            1800: {
              slidesPerView: 8,
            },
            1600: {
              slidesPerView: 5,
            },
            1281: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 3,
            },
            767: {
              slidesPerView: 2,
            },
            320: {
              slidesPerView: 1,
            },
          }}
        >
          {dataBlog.map((d, i) => (
            <SwiperSlide key={i}>
              <div className="testimonial-3">
                <div className="testimonial-media">
                  <img src={d.image} alt="" />
                </div>
                <div className="testimonial-content">
                  <h5 className="testimonial-title">Heroes like you helped my son win his battle.</h5>
                  <p className="testimonial-text">
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
                    in some form, or randomised words which{' '}
                    <Link to={'#'} onClick={() => setReadModal(true)}>
                      Read More
                    </Link>
                  </p>
                  <div className="testimonial-info">
                    <div className="quotes">
                      <i className="fa-solid fa-quote-left"></i>
                    </div>
                    <div className="clearfix">
                      <h5 className="testimonial-name">Lindsay S.</h5>
                      <span className="testimonial-position">Community Engagement</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Link to={'/become-a-fundraiser'} className="btn btn-primary m-r15 m-b15">
          Start A Fundraiser For Free
        </Link>
        <Link to={'/contact-us'} className="btn btn-light m-b15">
          Talk To Us
        </Link>
      </div>
    </>
  );
};

export default SuccessStoriesSlider;
