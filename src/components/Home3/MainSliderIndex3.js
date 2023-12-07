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
    bgimage: IMAGES.SliderPic1,
    // bgimage: IMAGES.SliderBg2,
    style: 'banner-media2',
    title: 'Infusing the community',
    title2: '',
    // image2: IMAGES.SliderPic2,
  },
  {
    // bgimage: IMAGES.SliderBg1,
    bgimage: IMAGES.SliderPic2,
    style: 'banner-media',
    title: '',
    // title2: 'Nfusing the community',
    title2: '',
    // image2: IMAGES.SliderPic1,
  },
  {
    // bgimage: IMAGES.SliderBg1,
    bgimage: IMAGES.SliderPic3,
    style: 'banner-media',
    title: 'DISCOVER/SEARCH A CAMPAIGN',
    // title2: 'Nfusing the community',
    title2: ' ',
    // image2: IMAGES.SliderPic1,
  },

  {
    // bgimage: IMAGES.SliderBg1,
    bgimage: IMAGES.SliderPic4,
    style: 'banner-media',
    title: 'DISCOVER/SEARCH A CAMPAIGN',
    // title2: 'Nfusing the community',
    title2: '“Happiest of Holidays to You!  Here’s to 2024 being your best year yet!”',
    // image2: IMAGES.SliderPic1,
  },
];

const MainSliderIndex3 = ({ onShowDonate, handlemodal }) => {
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
        {/* backgroundColor: '#3b7bbd' */}
        {dataBlog.map((d, i) => (
          <SwiperSlide key={i}>
            <div
  className={`banner-inner ${i !== 3 ? 'bgSize' : ''} img-fluid`}
  style={{ backgroundImage: `url(${d.bgimage})`, backgroundColor: 'transparent','@media (max-width: 767px)': {
      backgroundSize: 'cover',
    }, }}
>
  <div className="container-fluid">
    <div className="row">
      <div className="col-xl-6 col-xs-12 col-md-7">
        <div className="banner-content">
          <div className="top-content pl-5">
            {/* <h5 className="sub-title text-light">{d.title}</h5> */}
            <h4 className="title">{d.title2}</h4>
            {/* <p>{d.title2}</p> */}
            <div className={`${(i === 0 || i === 1 || i === 2) ? 'btnStartdiv' : ''}`}>
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
              <Link
                onClick={handlemodal}
                className={`btn btn-light btnhover2 mt-2 textTransformIssue ${(i === 0 || i === 1 || i === 2) ? 'btnStart' : ''}`}
              >
                Start a Campaign{' '}
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
