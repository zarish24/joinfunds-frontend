import React, { useRef, useEffect,useState } from 'react';
import {Link,useParams} from 'react-router-dom';
import NewsSlider from '../components/Home/NewsSlider';
import UpdateBlog from '../components/Home/UpdateBlog';
import BlogDetailsLeftBar from '../components/BlogDetailsLeftBar';
import { IMAGES } from '../constant/theme';

const widgetBlog = [
    {title:"New vaccine for cattle calf loss learned.", image:IMAGES.Recentblog1},
    {title:"He Created the Web. Now He’s Out to Remake.", image:IMAGES.Recentblog2},
    {title:"Partnering to create a community.", image:IMAGES.Recentblog3},
    {title:"Best & Less published their supplier lists.", image:IMAGES.Recentblog4},
];

const tagData = [
    { title:"Business"},
    { title:"Corporate"},
    { title:"Blog"},
    { title:"Marketing"},
    { title:"Creative"},
    { title:"Web"},
    { title:"Workers"},
    { title:"Modern"},
];
const BlogDetails = () => {
    const { Id } = useParams();
    const [blogDetails, setBlogDetails] = useState(null);
console.log("id", Id)
useEffect(() => {
    console.log('id:2', Id);
}, [Id]);
    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/user/getSingleBlog/${Id}`;  // Replace with your actual API endpoint

                const response = await fetch(apiUrl);
console.log('BlogDetails response',response)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setBlogDetails(data.blog);  

            } catch (error) {
                console.error("Error fetching blog details:", error);
            }
        };

        fetchBlogDetails();

    }, [Id]);
    return (
        <>
            <div className="page-content bg-white">
                <section className="content-inner-2">
                    <div className="container">			
                        <div className="row ">
                            <div className="col-xl-12 col-lg-12 m-b30">
                                <BlogDetailsLeftBar blogDetails={blogDetails} />
                            </div>
                            <div className="col-xl-4 col-lg-4" hidden>
                                <aside className="side-bar sticky-top">
							
                                    <div className="widget style-1">
                                        <div className="widget-title">
                                            <h5 className="title">Search</h5>
                                        </div>
                                        <div className="search-bx">
                                            <form role="search">
                                                <div className="input-group">
                                                    <input name="text" className="form-control" placeholder="Search Here..." type="text" />
                                                    <span className="input-group-btn">
                                                        <button type="submit" className="btn btn-primary sharp radius-no"><i className="la la-search scale3"></i></button>
                                                    </span> 
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="widget style-1 widget_categories">
                                        <div className="widget-title">
                                            <h5 className="title">Categories</h5>
                                        </div>
                                        <ul>
                                            <li className="cat-item"><Link to={"#"}>business (10)</Link></li>
                                            <li className="cat-item"><Link to={"#"}>Case Study (13)</Link></li>
                                            <li className="cat-item"><Link to={"#"}>Insights (9)</Link></li>
                                            <li className="cat-item"><Link to={"#"}>World (3)</Link></li>
                                            <li className="cat-item"><Link to={"#"}>Tax Solutions (12)</Link></li> 
                                            <li className="cat-item"><Link to={"#"}>Creative (6)</Link></li> 
                                        </ul>
                                    </div>
                                    <div className="widget style-1 recent-posts-entry">
                                        <div className="widget-title">
                                            <h5 className="title">Recent Post</h5>
                                        </div>
                                        <div className="widget-post-bx">
                                            {widgetBlog.map((item, ind)=>(
                                                <div className="widget-post clearfix" key={ind}>
                                                    <div className="dz-media"> 
                                                        <img src={item.image} alt=""/>
                                                    </div>
                                                    <div className="dz-info">
                                                        <h6 className="title"><Link to={"/blog-details"}>{item.title}</Link></h6>
                                                        <div className="dz-meta">
                                                            <ul>
                                                                <li className="post-date"><i className="fa-solid fa-calendar-days"></i> 7 March, 2022</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="widget style-1 widget_tag_cloud">
                                        <div className="widget-title">
                                            <h5 className="title">Popular Tags</h5>
                                        </div>
                                        <div className="tagcloud"> 
                                            {tagData.map((item, ind)=>(
                                                <Link to={"#"} key={ind}>{item.title}</Link>
                                            ))}                                            
                                        </div>
                                    </div>
                                    
                                </aside>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content-inner-2" hidden>
                    <div className="container">
                        <div className="section-head">
                            <h2 className="title">Related Articles</h2>
                        </div>
                        <NewsSlider />
                    </div>
                </section>
                <div className="call-action style-1 content-inner-1" hidden>
				    <div className="container">
                        <UpdateBlog />
                    </div>
                </div>
            </div>
           
        </>
    );
};

export default BlogDetails;