import React, { useState, useEffect } from 'react';
import PageBanner from '../layouts/PageBanner';
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import styled from 'styled-components';
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
  const [desiredAmountError, setDesiredAmountError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [createdByError, setCreatedByError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);  
  const [imageError, setImageError] = useState(false);  
  const [urlError, setUrlError] = useState(false);  
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
    goal_type:'monthly',
    created_by:'',
    donation_to_nfuse:'1',
    campaign_url:'',
    country:'United States',
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
    // console.log('name',name)
    // console.log('value',value)
   
    //   console.log('name',name);
    //   console.log('value',value);
    if(name === 'total_funding' && value > 0){
      setDesiredAmountError(false);
    }
    if(name === 'category_id' && value !== ''){
      setCategoryError(false);
    }
    if(name === 'title' && value !== ''){
      setTitleError(false);
    }
    if(name === 'description' && value !== ''){
      setDescriptionError(false);
    }
    if(name === 'created_by' && value !== ''){
      setCreatedByError(false);
    }
    if(name === 'start_date' && value !== ''){
      setStartDateError(false);
    }
    if(name === 'end_date' && value !== ''){
      setEndDateError(false);
    }
    if(name === 'campaign_url' && value !== ''){
      setUrlError(false);
    }
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
    setImageError(false);
    setImages(files);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.total_funding){
      setDesiredAmountError(true);
    } 
    if (!formData.category_id){
      setCategoryError(true);
    } 
    if (!formData.title){
      setTitleError(true);
    } 
    if (!formData.description){
      setDescriptionError(true);
    } 
    if (!formData.created_by){
      setCreatedByError(true);
    }
    if (!formData.start_date){
      setStartDateError(true);
    }
    if (!formData.end_date){
      setEndDateError(true);
    } 
    if (!formData.campaign_url){
      setUrlError(true);
    } 
    if (images.length === 0){
      setImageError(true);
    }
    else {
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
        goal_type:formData.goal_type,
        created_by:formData.created_by,
        donation_to_nfuse:formData.donation_to_nfuse,
        campaign_url:formData.campaign_url,
        country:formData.country,
        start_date: formData.start_date,
        end_date: formData.end_date,
        campaign_status: formData.campaign_status,
        campaign_type: formData.campaign_type, 
        user_id: formData.user_id
      }
      const areFieldsFilled = Object.values(option).every(
        (value) => value !== undefined && value !== ''
      );
    // console.log('optionoption',option)
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
    // console.log('optionoption /bodyData',bodyData)
  
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
    }
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
                        {categoryError && (
                          <Error className="input feedback">Campaign Category is required</Error>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label>Title</label>
                        <input
                          type="text"
                          name="title"
                          value={formData.subtitle}
                          onChange={handleChange}
                          className="form-control"
                        />
                        {titleError && (
                          <Error className="input feedback">Title is required</Error>
                        )}
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
                    />
                    {descriptionError && (
                      <Error className="input feedback">Description is required</Error>
                    )}
                  </div>
                  <div className="col-md-6">
                        <label>Desired Amount:</label>
                        <input
                          type="number"
                          name="total_funding"
                          value={formData.total_funding}
                          onChange={handleChange}
                          className="form-control"
                          step="1"
                        />
                        {desiredAmountError && (
                          <Error className="input feedback">Desired Amount is required</Error>
                        )}
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

                <div className="row">
                  <div className="col-md-6">
                        <label>Created By</label>
                        <input
                          type="text"
                          name="created_by"
                          value={formData.created_by}
                          onChange={handleChange}
                          className="form-control"
                        />
                        {createdByError && (
                          <Error className="input feedback">Created By is required</Error>
                        )}
                      </div>
                   
                    <div className="col-md-6">
                      <label>Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="United States">USA</option>
                 
                    
                      </select>
                    </div>
                  </div>

                <div className="row">
                <div className="col-md-6">
                  <label>Donation To Nfuse:</label>
                  
                  <select
                        name="donation_to_nfuse"
                        value={formData.donation_to_nfuse}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="1">1%</option>
                        <option value="2">2%</option>
                        <option value="3">3%</option>
                        <option value="4">4%</option>
                        <option value="5">5%</option>
                    
                      </select>
                </div>
                <div className="col-md-6">
                  <label>Choose Goal Type</label>
                  <select
                    name="goal_type"
                    value={formData.goal_type}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                    <option value="daily">Daily</option>
                  </select>
                </div>
              </div>
                {/* {formData.campaign_type==='funding' ? (<>
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
                  </div></>): <></>} */}
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
                        />
                        {startDateError && (
                          <Error className="input feedback">Start Date is required</Error>
                        )}
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
                        />
                        {endDateError && (
                          <Error className="input feedback">End Date is required</Error>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                  <div className="col-6">
                        <div className="form-group">
                            <label>Select Compaign Images</label>
                            <input type="file" onChange={(e) => MultipleFileChange(e)} className="form-control" multiple />
                            {imageError && (
                              <Error className="input feedback">Compaign Images is required</Error>
                            )}
                        </div>
                       </div>
                       <div className="col-6">
                        <div className="form-group">
                            <label>Campagin Url</label>
                            <input
                          type="text"
                          name="campaign_url"
                          value={formData.campagn_url}
                          onChange={handleChange}
                          className="form-control"
                        />
                        {urlError && (
                          <Error className="input feedback">Campagin Url is required</Error>
                        )}
                        </div>
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

const Error = styled.div`
 
color: #e66e6e;
padding: 2px 0px;
font-size: 12px;
cursor:none;
`;