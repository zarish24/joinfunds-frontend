import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, { Navigation, Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { IMAGES } from '../../constant/theme';

// Initialize Swiper modules
SwiperCore.use([Navigation, Autoplay, Pagination]);

const dataBlog = [
  { image: IMAGES.BlogGrid1, image2: IMAGES.Avatar1 },
  { image: IMAGES.BlogGrid2, image2: IMAGES.Avatar2 },
  { image: IMAGES.BlogGrid3, image2: IMAGES.Avatar3 },
];

const LatestNewSlider = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  useEffect(() => {
    // Initialize Swiper after rendering
    const swiper = new SwiperCore('.recent-blog1', {
      speed: 1500,
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 3000,
      },
      navigation: {
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
      },
      pagination: { clickable: true },
      breakpoints: {
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
      },
    });
  }, []);

  return (
    <>
      <div className="resize-wrapper">
        <Swiper className="recent-blog1">
            <SwiperSlide>
              <div className="dz-card style-4 " style={{ backgroundImage: 'url(' + IMAGES.BlogGrid2 + ')' }}>
                <div className="dz-info">
                  <div className="dz-meta">
                    <ul>
                      <li className="post-author">
                        <img src={IMAGES.Avatar2} alt="" /> 
                      </li>
                      {/* <li className="post-comments">5 Comments</li> */}
                      <li className="post-date">
                        <span className="day">24</span>
                        <span className="month">November</span>
                      </li>
                    </ul>
                  </div>
                  <h5 className="dz-title">
                    <Link to="/blog-details">How You Can Make a Difference This December</Link>
                  </h5>
                  <p>Amidst the joyous festivities and gift-giving rituals of the holiday season, it's easy to get swept away in the whirl wind of preparations</p>
                  <Link to="/blog-details" className="btn btn-primary">
                    Read More
                  </Link>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="dz-card style-4 " style={{ backgroundImage: 'url(' + IMAGES.BlogGrid1 + ')' }}>
                <div className="dz-info">
                  <div className="dz-meta">
                    <ul>
                      <li className="post-author">
                        <img src={IMAGES.Avatar1} alt="" />
                      </li>
                      {/* <li className="post-comments">5 Comments</li> */}
                      <li className="post-date">
                        <span className="day">22</span>
                        <span className="month">November</span>
                      </li>
                    </ul>
                  </div>
                  <h5 className="dz-title">
                    <Link to="/blog-details1">A Grateful Harvest: Giving Back on Thanksgiving</Link>
                  </h5>
                  <p>As the aroma of roasting turkey and the warmth of family gatherings fill the air, Thanksgiving serves as a poignant reminder to express gratitude</p>
                  <Link to="/blog-details1" className="btn btn-primary">
                    Read More
                  </Link>
                </div>
              </div>
            </SwiperSlide>
        </Swiper>
        <div className="swiper-btn swiper-btn-center-lr">
          <div className="swiper-button-prev btn-prev style-2" ref={navigationPrevRef}>
            <i className="flaticon-left-arrow-1"></i>
          </div>
          <div className="swiper-button-next btn-next style-2" ref={navigationNextRef}>
            <i className="flaticon-next"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestNewSlider;
