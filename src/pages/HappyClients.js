import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import axios from "axios";
import PageBanner from '../layouts/PageBanner';
//images
import { toast } from 'react-toastify';
import bg from './../assets/images/banner/bnr2.jpg';
import img from './../assets/images/IMG-20231128-WA0014.jpg';
import test1 from './../assets/images/testimonials/large/pic1.jpg';
import test2 from './../assets/images/testimonials/large/pic2.jpg';
import test3 from './../assets/images/testimonials/large/pic3.jpg';
import test4 from './../assets/images/testimonials/large/pic1.jpg';
import shape1 from './../assets/images/pattern/shape1.png';
import shape2 from './../assets/images/pattern/shape2.png';
import shape3 from './../assets/images/pattern/shape3.png';
import shape5 from './../assets/images/pattern/shape5.png';
import shape6 from './../assets/images/pattern/shape6.png';

function LeftImage({sideimage, paraModal}){
   
    return(
        <>
            <div className="col-lg-10 m-b50">
                <div className="testimonial-3">
                    <div className="testimonial-media">
                        <img src={img} alt="" />
                    </div>
                    <div className="testimonial-content">
                        <h5 className="testimonial-title">Support Local HomeLess </h5>
                        <p className="testimonial-text">Nfuse helped me raise a campaign to support local homeless shelters. I always wanted to help by funding for clothing and blankets. With the help of the Nfuse, I was able to share my campaign with convenience to my friends and family. <Link to={"#"} onClick={()=>paraModal(true)} >Read More</Link></p>
                        <div className="testimonial-info">
                            <div className="quotes">
                                <i className="fa-solid fa-quote-left"></i>
                            </div>
                            <div className="clearfix">
                                <h5 className="testimonial-name">Syeda Rizvi</h5>
                                <span className="testimonial-position">Sr. IT Manager</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function RightImage({ mainImage, paraModal }) {
    const RecordsPerPage = 6;
    const [Story, setStory] = useState([]);
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const payload = {
            items_per_page: RecordsPerPage,
            page: page,
          };
  
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/campaign-story/getAllCampaignSuccessStories`,
            payload
          );
  
          if (response.status === 200 || response.status === 201) {
            console.log("all-res", response);
            setStory(response?.data?.successStories || []);
          } else {
            // toast.error("Compaigns not fount due to some issue!");
          }
        } catch (error) {
          toast.error("API request failed", error);
          // console.error("A/PI request failed", error);
        }
      };
  
      const user = JSON.parse(localStorage.getItem("user"));
  
      fetchData();
    }, [currentPage]);
  
    return (
      <>
        <div>
          {Story &&
            Story.map((story) => (
              <div key={story._id} className="col-lg-10 offset-lg-2 m-b50">
                <div className="testimonial-3 right">
                  <div className="testimonial-content">
                    <h5 className="testimonial-title">{story.campaign_title}</h5>
                    <p className="testimonial-text">{story.successStoryMessage}</p>
                    <div className="testimonial-info">
                      <div className="quotes">
                        <i className="fa-solid fa-quote-left"></i>
                      </div>
                      <div className="clearfix">
                        <h5 className="testimonial-name">{`${story.firstName} ${story.lastName}`}</h5>
                        <span className="testimonial-position">{story.designation}</span>
                      </div>
                    </div>
                  </div>
                  <div className="testimonial-media">
                    <img src={story.campaign_image} alt="" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </>
    );
  }
  

const HappyClients = () => {
    const [paraModal, setParaModal] = useState(false);

    // const showModal = () =>{
    //     setParaModal(true);
    // }
    const hideModal = () =>{
        setParaModal(false);
    }

    return (
        <>
            <div className="page-content bg-white">
                <PageBanner maintitle="Home" pagetitle="Happy Clients" background={bg}/>
                <section className="content-inner bg-light section-pattren1">
                    <div className="container">
                        <div className="row">
                            <LeftImage  paraModal={setParaModal} sideimage={test1}/>
                            <RightImage paraModal={setParaModal} mainImage={test2}/>
                            {/* <LeftImage  paraModal={setParaModal} sideimage={test3}/> */}
                            {/* <RightImage paraModal={setParaModal} mainImage={test4}/> */}
                            {/* <LeftImage  paraModal={setParaModal} sideimage={test2}/>                        */}
                        </div>
                    </div>
                    <img src={shape1} className="shape-1 move-1" alt="shape"/>
                    {/* <img src={shape2} className="shape-2 move-2" alt="shape"/> */}
                    {/* <img src={shape3} className="shape-3 move-1" alt="shape"/> */}
                    {/* <img src={shape5} className="shape-4 rotating" alt="shape"/> */}
                    {/* <img src={shape6} className="shape-5 rotating" alt="shape"/> */}
                    {/* <img src={shape6} className="shape-6 rotating" alt="shape"/> */}
                </section>
            </div>
            <Modal className="modal fade modal-wrapper" id="read" show={paraModal} onHide={hideModal} centered> 
                <div className="modal-body">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
            </Modal>
        </>
    );
};



export default HappyClients;