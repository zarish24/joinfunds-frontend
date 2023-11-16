import React, { useState, useEffect } from 'react';
import PageBanner from '../layouts/PageBanner';
import { Link, useNavigate, useParams } from "react-router-dom";
import bg from '../assets/images/banner/bnr3.jpg';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EditCampaign = () => {
    const { id } = useParams();
    const [token, setToken] = useState("")
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
      category_id:'',
      title: '',
        total_funding: 0,
        description: '',
        minimum_amount: 0,
        maximum_amount: 0,
        start_date: '',
        end_date: '',
        campaign_status: 'pending',  // Default value for campaign status
        campaign_type: 'funding',  // Default value for campaign type
    });
    const [titleOptions, setTitleOptions] = useState([]);
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`, // Use Bearer authentication, replace "Bearer" if you have a different authentication method
            },
          };
          const response = await axios.get('http://44.219.245.56/api/category/getCategories',config);
          if (response.status === 200) {
            // Extract category names from the response
            const categories = response.data.categories
            console.log('categories',categories)
  
            setTitleOptions(categories);
          }
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
  
      fetchCategories();
    }, []);

  const MultipleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  useEffect(() => {
    const fetchData = async (_id,token) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Use Bearer authentication, replace "Bearer" if you have a different authentication method
          },
        };
        const response = await axios
          .get(
            `${process.env.REACT_APP_BACKEND_URL}/api/compaign/getSingleCompaign/${_id}`,config
          )
          .then((res) => {
            console.log('ressssssssssssssssss',res)
            if (res.status === 200 || res.status === 201) {
                const s_date = new Date(res?.data?.data?.doc[0].start_date);
                const s_year = s_date.getFullYear();
                const s_month = s_date.getMonth() + 1; // Month is zero-based, so add 1
                const s_day = s_date.getDate();
                // Create a new formatted date string
                const formattedStartDate = `${s_year}-${String(s_month).padStart(2, '0')}-${String(s_day).padStart(2, '0')}`;

                const date = new Date(res?.data?.data?.doc[0].end_date);
                const year = date.getFullYear();
                const month = date.getMonth() + 1; // Month is zero-based, so add 1
                const day = date.getDate();
                // Create a new formatted date string
                const formattedEndDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                setFormData({
                  category_id: res?.data?.data?.doc[0].category_id || '', // Use the values from "doc" or provide default values
                  title: res?.data?.data?.doc[0].title || '',
                total_funding: res?.data?.data?.doc[0].total_funding || 0,
                description: res?.data?.data?.doc[0].description || '',
                minimum_amount: res?.data?.data?.doc[0].minimum_amount || 0,
                maximum_amount: res?.data?.data?.doc[0].maximum_amount || 0,
                start_date:formattedStartDate || '',
                end_date: formattedEndDate || '',
                campaign_status: res?.data?.data?.doc[0].status || 'pending',
                campaign_type: res?.data?.data?.doc[0].campaign_type || 'funding',
              });
            } else {
              toast.error("Compaigns not fount due to some issue!");
            }
          })
          .catch((error) => {
            toast.error(error);
          });
      } catch (error) {
        toast.error("API request failed", error);
        console.error("API request failed", error);
      }
    };
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      setToken(user.token)
      fetchData(id,user.token);
    }
  }, []);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    };
    const option = { 
      category_id:   formData.category_id,
      title: formData.title,
      total_funding: formData.total_funding,
      description: formData.description,
      minimum_amount: formData.minimum_amount,
      maximum_amount: formData.maximum_amount,
      start_date: formData.start_date,
      end_date: formData.end_date,
      campaign_status: formData.campaign_status,
      campaign_type: formData.campaign_type
    }
    const bodyData = new FormData();
    for (var key in option) {
      bodyData.append(key, option[key]);
    }
    for (let i = 0; i < images.length; i++) {
      bodyData.append("images", images[i]);
    }
    const response = await axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/api/compaign/updateCompaign/${id}`, bodyData, config)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
            toast.success(
              res?.data?.message
            );
            navigate("/my-project");
        } else {
          toast.error("Failed to create a campaign.");
        }
      })
      .catch((error) => {
        toast.error(
            error
        );
      });
  };
  return (
    <>
      <div className="page-content bg-white">
        <PageBanner maintitle="Project" pagetitle="Edit Your Own Campaign" background={bg} />

        <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <h3>Edit Your Campaign Here</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <div className="row">
                      <div className="col-md-6">
                        <label>Campaign Category:</label>
                        <select
                          name="category_id"
                          value={formData.category_id}
                          onChange={handleChange}
                          className="form-control"
                        >
                          {titleOptions.map((option) => (
                            <option key={option._id} value={option._id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label>SubTitle:</label>
                        <input
                          type="text"
                          name="title"
                          value={formData.subtitle}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                  <div className="form-group col-md-6">
                    <label>Description:</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                        <label>Desired Amount:</label>
                        <input
                          type="number"
                          name="total_funding"
                          value={formData.total_funding}
                          onChange={handleChange}
                          className="form-control"
                          required
                          step="1"
                        />
                      </div>
                  </div>
                  <div className="form-group mb-3">
                <div className="row">
                    <div className="col-md-6">
                    <label>Campaign Status:</label>
                    <select
                        name="campaign_status disabled"
                        value={formData.campaign_status}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="pending">Pending</option>
                    </select>
                    </div>
                    <div className="col-md-6">
                    <label>Campaign Type:</label>
                    <select
                        name="campaign_type"
                        value={formData.campaign_type}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="funding">Funding</option>
                        <option value="donation">Donation</option>
                    </select>
                    </div>
                </div>
                </div>
                {formData.campaign_type==='funding' ? (<>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>Minimum Amount:</label>
                        <input
                          type="number"
                          name="minimum_amount"
                          value={formData.minimum_amount}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>Maximum Amount:</label>
                        <input
                          type="number"
                          name="maximum_amount"
                          value={formData.maximum_amount}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                  </div></>): <></>}
                  {console.log("startDate",formData.start_date)}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>Start Date:</label>
                        <input
                          type="date"
                          name="start_date"
                          value={formData.start_date}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>End Date:</label>
                        <input
                          type="date"
                          name="end_date"
                          value={formData.end_date}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Select Compaign Images</label>
                            <input type="file" onChange={(e) => MultipleFileChange(e)} className="form-control" multiple />
                        </div>
                       </div>
                  </div>
                 
                  <button type="submit" className="btn btn-primary mb-5">
                   Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EditCampaign;
