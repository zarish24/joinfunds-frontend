import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, { Navigation, Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { IMAGES } from '../../constant/theme';
import DonateModal from '../Modal/DonateModal';

// Initialize Swiper modules
SwiperCore.use([Navigation, Autoplay, EffectFade]);

const dataBlog = [
  {
    bgimage: IMAGES.SliderBg1,
    style: 'banner-media',
    title: 'DISCOVER/SEARCH A CAMPAIGN',
    title2: 'Both for individual and Business',
    image2: IMAGES.SliderPic1,
  },
  {
    bgimage: IMAGES.SliderBg2,
    style: 'banner-media2',
    title: 'INNOVATIONS IN TECHNOLOGY',
    title2: 'We Help Surface Innovations',
    image2: IMAGES.SliderPic2,
  },
];

const MainSliderIndex3 = ({ onShowDonate }) => {
  const modalRef = useRef(null);

  return (
    <>
      <Swiper
        className="main-slider"
        speed={1500}
        slidesPerView={1}
        effect="fade"
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 3000,
        }}
        navigation
      >
        {dataBlog.map((d, i) => (
          <SwiperSlide key={i}>
            <div
              className="banner-inner"
              style={{ backgroundImage: `url(${d.bgimage})` }}
            >
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xl-6 col-md-5">
                    <div className={d.style}>
                      <img src={d.image2} alt="" />
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-7">
                    <div className="banner-content">
                      <div className="top-content">
                        <h5 className="sub-title text-light">{d.title}</h5>
                        <h1 className="title">{d.title2}</h1>
                        <p>
                        Did you know you can create a campaign for individuals or for businesses?   Take a look at our categories!   get Enthused, Get Nfused!
                        </p>
                        <div className="d-flex align-items-center">
                          {/* <Link
                            to={'#'}
                            className="btn btn-primary btnhover1"
                            onClick={() => {
                              modalRef.current.handleModalOpen();
                            }}
                          >
                            <span>Donate</span>
                            <i className="flaticon-heart ms-3" />
                          </Link> */}
                          <Link to={'/about-us'} className="btn btn-light btnhover2">
                            Learn More{' '}
                            <i className="flaticon-right-arrow ms-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="bottom-wrapper">
          <div className="btn-wrapper">
            <div className="main-btn main-btn-prev">
              <i className="flaticon-left-arrow-1" />
            </div>
            <div className="main-btn main-btn-next">
              <i className="flaticon-next" />
            </div>
          </div>
        </div>
      </Swiper>
      <DonateModal ref={modalRef} />
    </>
  );
};

export default MainSliderIndex3;
