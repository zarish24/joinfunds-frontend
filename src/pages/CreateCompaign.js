import React, { useState, useEffect } from 'react';
import PageBanner from '../layouts/PageBanner';
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import Box from '@mui/material/Box';
import bg from '../assets/images/banner/bnr3.jpg';
import axios from "axios";
import { ThreeDots } from '../../node_modules/react-loader-spinner/dist/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShareButtons, generateShareIcon } from 'react-share';

const CreateCompaign = () => {
  const [token, setToken] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category_id:'',
    title: '',
    // subtitle: '',
    total_funding: 0,
    description: '',
    minimum_amount: 0,
    maximum_amount: 0,
    start_date: '',
    end_date: '',
    campaign_status: 'pending',  
    campaign_type: 'funding',  
    user_id: ''
  });
  //   console.log('formData',formData)

  const [titleOptions, setTitleOptions] = useState([]);
  
  //   console.log('titleOptions',titleOptions)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Use Bearer authentication, replace "Bearer" if you have a different authentication method
          },
        };
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/category/getCategories`,config);
        if (response.status === 200) {
          // Extract category names from the response
          const categories = response.data.categories
          //   console.log('categories',categories)

          setTitleOptions(categories);
        }
      } catch (error) {
        //   console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user._id) {
      setToken(user?.token)
      setFormData({ ...formData, user_id: user._id });
    }
  }, []);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('name',name)
    console.log('value',value)
   
    //   console.log('name',name);
    //   console.log('value',value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const isStartDateValid = (startDate, endDate) => {
    const today = new Date().toISOString().split('T')[0];
    return startDate >= today && startDate !== endDate;
  };

  const isEndDateValid = (startDate, endDate) => {
    const today = new Date().toISOString().split('T')[0];
    return endDate >= today && startDate !== endDate;
  };

  const MultipleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
   
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Use Bearer authentication, replace "Bearer" if you have a different authentication method
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
      campaign_type: formData.campaign_type, 
      user_id: formData.user_id
    }
    const areFieldsFilled = Object.values(option).every(
      (value) => value !== undefined && value !== ''
    );
  
    if (!areFieldsFilled) {
      setLoading(false);
      toast.error('Please fill in all required fields.');
      return; // Stop further processing if fields are not filled
    }
  
   
    const startDateIsValid = isStartDateValid(option.start_date, option.end_date);
    const endDateIsValid = isEndDateValid(option.start_date, option.end_date);
    const getDaysDifference = (startDate, endDate) => {
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const start = new Date(option.start_date);
      const end = new Date(option.end_date);
      const diffDays = Math.round(Math.abs((start - end) / oneDay));
      return diffDays;
    };
    if (!startDateIsValid || !endDateIsValid) {
      setLoading(false);
    
      
      if (option.start_date === option.end_date) {
        toast.error('Start and end date cannot be the same.');
      } else if (startDateIsValid && endDateIsValid) {
        toast.error('Start and end date must be present or future.');
      } else if (getDaysDifference(option.start_date, option.end_date) > 90) {
        toast.error('Campaign Can only be valid for 90 days select a date between them  ');
      }
    
      return; 
    }


    
    const bodyData = new FormData();
        for (var key in option) {
          bodyData.append(key, option[key]);
        }
        for (let i = 0; i < images.length; i++) {
          bodyData.append("images", images[i]);
        }
    const response = await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/compaign/createCompaign`, bodyData, config,
      {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      }
        )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setLoading(false);
            toast.success(
              res?.data?.message
            );
            navigate("/my-project");
        } else {
          toast.error("Failed to create a campaign.");
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message || error);
      });
  };
  return (
    <>
      <div className="page-content bg-white">
        <PageBanner maintitle="Campaign" pagetitle="Create Your Own Campaign" background={bg} />

        <section className="section-padding">
        {loading ? (
                            <Box className={styles.bars}>
                                <ThreeDots color="#121E31" width={50} height={50} />
                            </Box>
                        ) :
                        <>
                        <div className="container">
            <div className="row mt-5">
              <div className="col-lg-8 mx-auto">
                {/* <h3>Create Your Campaign</h3> */}
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <div className="row">
                      <div className="col-md-6">
                        <label> Category</label>
                        <select
                          name="category_id"
                          value={formData.category_id}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                            <option value="" disabled>
    Select Campaign Category
  </option>
                          {titleOptions.map((option) => (
                            <option key={option._id} value={option._id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label>Title</label>
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
                        required
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
                  </div>
                  <div className="col-6">
                        <div className="form-group">
                            <label>Select Compaign Images</label>
                            <input type="file" onChange={(e) => MultipleFileChange(e)} className="form-control" multiple />
                        </div>
                       </div>
                   
                  <button type="submit" className="btn btn-primary mb-5">
                    Create Campaign
                  </button>
                </form>
              </div>
            </div>
          </div>
                        </>
        }
          
        </section>
      </div>
    </>
  );
};

export default CreateCompaign;
