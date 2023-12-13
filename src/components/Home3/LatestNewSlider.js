import React, { useRef, useEffect,useState } from 'react';
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
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const postData = {
      items_per_page: 13,
      page: 1,
    };

    const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/user/getAllBlogs`;

    fetch(apiUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received:", data);
        setBlogs(data.blogs);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

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
        1600: { slidesPerView: 5 },
        1281: { slidesPerView: 4 },
        1024: { slidesPerView: 3 },
        767: { slidesPerView: 2 },
        320: { slidesPerView: 1 },
      },
    });
  }, []);
  const truncateText = (text, count) => {
    const words = text.split(" ");
    return words.length > count
      ? words.slice(0, count).join(" ") + "..."
      : text;
  };
  return (
    <>
     <div className="resize-wrapper">
      <Swiper className="recent-blog1">
        {blogs.map((blog) => (
          <SwiperSlide key={blog._id}>
            <div className="dz-card style-4" style={{ backgroundImage: `url(${blog.blog_images[0]?.url || IMAGES.DefaultImage})`, height: '90vh' }}>
              <div className="dz-info">
              <div className="dz-meta">
              <ul>
            <li className="post-date">
              <span className="day">{new Date(blog.createdAt).getDate()}</span>
              <span className="month">{new Date(blog.createdAt).toLocaleString('en-us', { month: 'long' })}</span>
            </li>
          </ul>
                  </div>
                <h5 className="dz-title">
                  <Link to={`/blog-details/${blog._id}`}>{blog?.title}</Link>
                </h5>
                <p className="blogDetail1"> {truncateText(blog?.description, 30)}</p><br />
                <Link to={`/blog-details/${blog._id}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
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
