import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import  large from '../assets/images/IMG-20231205-WA0004.jpg';
import  blog2 from '../assets/images/IMG-20231128-WA0006.jpg';
import  blog1 from '../assets/images/blog/blog-grid/pic1.jpg';
import  test from '../assets/images/testimonials/pic2.jpg';
import avat1 from '../assets/images/avatar/avatar1.jpg';
import avat2 from '../assets/images/avatar/avatar2.jpg';
import avat3 from '../assets/images/avatar/avatar3.jpg';
import avat4 from '../assets/images/avatar/avatar4.jpg';
import "./styles.module.scss"
import {img} from '../../src/assets/images/IMG-20231128-WA0012.jpg'
export const CommentBlog = (props) => {
    const [replying, setReplying] = useState(false);
    const [replyText, setReplyText] = useState('');
  
    const handleReply = () => {
      setReplying(true);
    };
  
    const handleCancelReply = () => {
      setReplying(false);
      setReplyText(''); // Clear the reply text when canceled
    };
  
    const handleReplySubmit = async (e) => {
        e.preventDefault();
        try {
        const user = JSON.parse(localStorage.getItem("user"));
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`, // Use Bearer authentication, replace "Bearer" if you have a different authentication method
          },
        };
        const data = {
          comment_id: props.commentId,
          user_id: props.user_id,
          reply_message: replyText
        }
        const response = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/api/compaign/commentReply`,
          data, config
        )
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            if(props.reply===true)
            {
               props.setReply(false)
            }
            else
            {
              props.setReply(true)
            }
            
            setReplying(false);
            setReplyText('');
          } else {
            // window.alert(res.message);
          }
        })
        .catch((error) => {
          console.error("API request failed", error);
          window.alert(error?.response?.data?.message);
        });
       // setCampaigns(response.data); // Set the campaign data in state
        } catch (error) {
          window.alert("API request failed", error);
          console.error("API request failed", error.message);
        }
      };
  
    return (
      <>
        <div className="comment-body">
          <div className="comment-author vcard">
            <img className="avatar photo" src={props.image} alt="" />
            <cite className="fn">{props.title}</cite>
          </div>
          <p>{props.comment_message}</p>
          {props.showReply === false ? null :
          <div className="reply">
          <button
            onClick={handleReply}
            style={{
              backgroundColor: 'transparent', // Transparent background
              border: 'none', // No border
              fontSize: '16px', // Adjust font size
              color: '#007bff', // Text color
              cursor: 'pointer', // Change cursor to a pointer on hover
              padding: '0', // Remove padding
              margin: '0', // Remove margin
            }}
          >
            <i className="fa fa-reply"></i> {/* Add your icon here */}
          </button>
        </div>
          }
          
        </div>
  
        {replying && (
          <div className="comment-reply-form">
            <textarea
              rows={3} // Set this to the number of rows you desire
              placeholder="Write your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              style={{
                height: "43px",
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
              }}
            />
            <div className="button-container">
              <button
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  cursor: "pointer",
                  marginRight: "10px",
                  marginBottom: "10px",
                }}
                onClick={handleReplySubmit}
              >
                Submit Reply
              </button>
  
              <button
                style={{
                  backgroundColor: "#ccc",
                  color: "#333",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
                onClick={handleCancelReply}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </>
    );
  };
const BlogDetailsLeftBar = () => {
    return (
        <>
            <div className="dz-card blog-single sidebar">
                <div className="dz-media">
                    <img src={large} alt="" />
                </div>
                <div className="dz-info">
                    {/* <div className="dz-meta">
                        <ul>
                            <li className="post-date"><i className="fa-solid fa-calendar-days"></i> 7 March, 2022</li>
                            <li className="post-author"><Link to={"#"}><i className="fa-solid fa-user"></i> By Johne Doe</Link></li>
                        </ul>
                    </div> */}
                    <div className="dz-post-text">
                        <h1 className="dz-title">How You Can Make a Difference This December</h1>
                        <p>Amidst the joyous festivities and gift-giving rituals of the holiday season, it's easy to get swept away in the whirl wind of preparations and lose sight of the true essence of this particular time. The holidays are not just about material possessions and external celebrations; they are a profound opportunity to reflect on our blessings, express gratitude, and extend kindness to those in need.</p>
                        <ul className="wp-block-gallery ">
                            {/* <li className="blocks-gallery-item"><img alt="" src={blog2} /></li> */}
                            {/* <li className="blocks-gallery-item"><img alt="" src={blog1} /></li> */}
                        </ul>
                        <p>This year, let us make a conscious effort to revert our focus to the core values that underpin the holiday spirit – giving, donating, crowdfunding, safeguarding freedom of speech, and upholding the sound of freedom. By extending our generosity and compassion, not only we can bring joy and relief to others but also enrich our own lives and contribute to a more just and compassionate world.</p>
                        <blockquote hidden className="block-quote style-1">
                            <p>“You can make anything look good. Only a quarter of young adults are financially literate. You don’t want to overwhelm them with terrible advice.”</p>
                            <cite> Akcel </cite>
                        </blockquote>
                        <p hidden>Aliquam in laoreet dui. Aliquam blandit nisl lacus, sed suscipit massa pulvinar vitae. Proin non dui eros. Mauris lobortis arcu a quam tincidunt, at consectetur urna dapibus. Curabitur sagittis nisl vel dolor porta, eu fringilla est accumsan. Donec eleifend dignissim risus a tempor. Sed suscipit ultrices viverra.</p>
                        <ul>
                            <li>Donate to the Cause You Care About</li>
                            <li>Volunteer Your Time and Talents.</li>
                            <li>Compassionate connection with Homeless.</li>
                            <li>Spread Kindness in Your Neighborhood</li>
                            <li>Support Local Businesses</li>
                        </ul>
                        <p>This holiday season, from donations to volunteering for needy, homeless, and low-income people, Nfuse has made it easy to spread joy and compassion to those around you. Nfuse can help to fundraise campaigns so we can all work together to make the future brighter and more hopeful. Sign up for a cause that matters to bring a difference in the community this holiday season. Remember, even the slightest acts of kindness can give birth to a ripple effect and create a more positive world.</p>
                    </div>
                </div>
                <div className="dz-share-post" hidden>
                    <div className="dz-social-icon">
                        <h6 className="title">Share:</h6>
                        <ul>
                            <li><Link to={"#"} className="fab fa-facebook-f"></Link></li>
                            <li><Link to={"#"} className="fab fa-instagram"></Link></li>
                            <li><Link to={"#"} className="fab fa-twitter"></Link></li>
                        </ul>
                    </div>
                    <div className="post-tags">
                        <Link to={"#"}>#Mobile</Link>
                        <Link to={"#"}>#Software</Link>
                        <Link to={"#"}>#Technology</Link>
                    </div>
                </div>
            </div>  
            <div className="author-box blog-user m-b60" hidden>
                <div className="author-profile-info">
                    <div className="author-profile-pic">
                        <img src={test} alt="Profile Pic" />
                    </div>
                    <div className="author-profile-content">
                        <h4>Jake Johnson</h4>
                        <p>We were making our way to the Rila Mountains, where we were visiting the Rila Monastery where we enjoyed.</p>
                        <ul className="list-inline m-b0">
                            <li><a href="https://www.facebook.com" target="_blank"  rel="noreferrer"  className="btn-link"><i className="fab fa-facebook-f"></i></a></li>
                            <li><a href="https://www.twitter.com" target="_blank"  rel="noreferrer"  className="btn-link"><i className="fab fa-twitter"></i></a></li>
                            <li><a href="https://www.google.com" target="_blank"  rel="noreferrer"  className="btn-link"><i className="fab fa-google-plus"></i></a></li>
                            <li><a href="https://www.youtube.com" target="_blank"  rel="noreferrer"  className="btn-link"><i className="fab fa-youtube"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div> 
            <div className="clear" id="comment-list" hidden>
                <div className="comments-area" id="comments">
                    <div className="widget-title style-1">
                        <h4 className="title">Comments</h4>
                    </div>
                    <div className="clearfix">
                        <ol className="comment-list">
                            <li className="comment">
                                <CommentBlog title="Celesto Anderson"  image={avat1}/>
                                <ol className="children">
									<li className="comment odd parent"></li>
                                    <CommentBlog title="Jake Johnson" image={avat2}/>
                                </ol>
                            </li>
                            <li className="comment">
                                <CommentBlog title="John Doe" image={avat3}/>
                            </li>
                            <li className="comment">
                                <CommentBlog title="Celesto Anderson" image={avat4}/>
                            </li>
                        </ol>
                        <div className="comment-respond" id="respond">
							<div className="widget-title style-1">
                                <h4 className="title" id="reply-title">Leave Your Comment
                                    <small><Link to={"#"} style={{display:"none"}} id="cancel-comment-reply-link" rel="nofollow">Cancel reply</Link></small>
                                </h4>
                            </div>
                            <form className="comment-form" id="commentform">
                                <p className="comment-form-author">
                                    <label for="author">Name <span className="required">*</span></label>
                                    <input type="text" name="Author"  placeholder="Author" id="author" />
                                </p>
                                <p className="comment-form-email">
                                    <label for="email">Email <span className="required">*</span></label>
                                    <input type="text" placeholder="Email" name="email" id="email" />
                                </p>
                                <p className="comment-form-comment">
                                    <label for="comment">Comment</label>
                                    <textarea rows="8" name="comment" placeholder="Comment" id="comment"></textarea>
                                </p>
                                <p className="form-submit">
                                    <button type="submit" className="btn btn-primary" id="submit">SUBMIT</button>
                                </p>
                            </form>
                        </div>
                    </div>    
                
                </div>    
            </div>    
        </>
    );
};

export default BlogDetailsLeftBar;