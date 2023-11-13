import React from 'react';
import {Link} from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
//import "swiper/css";
import { Autoplay } from "swiper";

//Images
import project1 from './../../assets/images/project/project1/pic1.jpg';
import project2 from './../../assets/images/project/project1/pic2.jpg';
import project3 from './../../assets/images/project/project1/pic3.jpg';
import project4 from './../../assets/images/project/project1/pic4.jpg';
import project5 from './../../assets/images/project/project1/pic5.jpg';
import avat1 from './../../assets/images/avatar/avatar1.jpg';
import avat2 from './../../assets/images/avatar/avatar2.jpg';
import avat3 from './../../assets/images/avatar/avatar3.jpg';


// const dataBlog = [
// 	{title:"He Created the Web. Now He’s Out to Remake", subtitle:"EDUCATION", image: project1, image2:avat1, autor:"Adam Jordon", progres:"50%"},
// 	{title:"Online legal advice for asylum seekers in Greece", subtitle:"HEALTH", image: project2, image2: avat2, autor:"KK Sharma", progres:"70%"},
// 	{title:"Things parents learned for they jids in 2020", subtitle:"TECHNOLOGY", image: project3, image2: avat3, autor:"Tom wilson", progres:"90%"},
// 	{title:"He Created the Web. Now He’s Out to Remake", subtitle:"EDUCATION", image: project4, image2: avat1, autor:"Adam Jordon", progres:"60%"},
//     {title:"Online legal advice for asylum seekers in Greece", subtitle:"HEALTH", image: project5, image2: avat2, autor:"KK Sharma", progres:"70%"},
// ];

const TrendingSlider2 = (props) => {
    const dataBlog = props.campaigns
    const calculateDaysLeft = (startDateString, endDateString) => {
        const today = new Date();
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);
    
        if (isNaN(startDate) || isNaN(endDate)) {
          return null; // Invalid date format
        } else if (today > endDate) {
          return 0; // Campaign has ended
        } else if (today < startDate) {
          const timeDiff = startDate - today;
          return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Days until the campaign starts
        } else {
          const timeDiff = endDate - today;
          return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Days left for the ongoing campaign
        }
      };
      
    return (
        <> 
            <Swiper className="recent-blog2"
				speed= {1500}
				//parallax= {true}
				slidesPerView= {5}
				spaceBetween= {30}
				loop={true}
				autoplay= {{
				   delay: 3000,
				}}
				modules={[ Autoplay ]}
				breakpoints = {{
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
				{dataBlog?.map((d,i)=>(
					<SwiperSlide key={i}>	
                    {console.log("value of d",d)}
                        <div className="dz-card style-5">
                            <div className="dz-media">
                                <Link to={`/fundraiser-detail/${d?._id}`}><img src={d?.campaign_images[0]?.url} alt="" /></Link>
                            </div>
                            <div className="dz-info">
                                <ul className="dz-category">
                                    <li><Link to={"#"}>{d?.subtitle}</Link></li>
                                </ul>                                
                                <h5 className="dz-title"><Link to={`/fundraiser-detail/${d?._id}`}>{d?.title} </Link></h5>  
                                <ul className="dz-meta">
                                    <li className="author-wrappper author-wrappper-sm mt-0">
                                        <div className="author-media">
                                            <img src={d?.campaignuserDetails?.profileImage} alt="" /> 
                                        </div>
                                        <span>{d?.campaignuserDetails?.firstName} {d?.campaignuserDetails?.lastName}</span>
                                    </li>
                                    <li key={d._id} className="dz-date">
                                    <i className="fa-solid fa-calendar"></i>
                                    <span>
                                        {calculateDaysLeft(d.start_date, d.end_date) !== null
                                        ? `  ${calculateDaysLeft(d.start_date, d.end_date)} Days left`
                                        : 'Invalid date format'}
                                    </span>
                                    </li>
                                    {/* <li className="dz-date">
                                        <i className="fa-solid fa-calendar"></i>
                                        {" "}<span>45 Days left</span>
                                    </li> */}
                                </ul>
                                {/* <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex..</p>  */}
                                <div className="progress-bx style-2">
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style={{width:d?.progres}}>
                                            <span className="progress-value">{d.progres}</span>
                                        </div>
                                    </div>
                                    <ul className="progress-tag">
                                        <li className="raised">Raised: <span className="text-primary">${d?.raised}</span></li>
                                        <li className="goal">Goal: <span className="text-primary">${d?.total_funding}</span></li>
                                    </ul>
                                </div> 
                            </div>
                        </div>									
					</SwiperSlide>
				))}				
			</Swiper>
        </>
    );
};


export default TrendingSlider2;