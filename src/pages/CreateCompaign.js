import React, { useState, useEffect } from 'react';
import PageBanner from '../layouts/PageBanner';
import { Link, useNavigate } from "react-router-dom";
import bg from '../assets/images/banner/bnr3.jpg';
import axios from "axios";

const CreateCompaign = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    total_funding: 0,
    description: '',
    minimum_amount: 0,
    maximum_amount: 0,
    start_date: '',
    end_date: '',
    campaign_status: 'pending',  // Default value for campaign status
    campaign_type: 'funding',  // Default value for campaign type
    user_id: ''
  });

  const titleOptions = [
    "Select Campaign Category",
    "Medical",
    "Memorial",
    "Emergency",
    "Nonprofit",
    "Education",
    "Animals",
    "Business",
    "Community",
    "Creative",
    "Current Events",
    "Event",
    "Faith",
    "Family",
    "Sport",
    "Travel",
    "Veteran",
    "Legal",
    "General",
    "Mission",
  ];
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user._id) {
      setFormData({ ...formData, user_id: user._id });
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
    console.log('formData', formData);
    const response = await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/compaign/createCompaign`, formData)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
            window.alert(
              res?.data?.message
            );
            navigate("/my-project");
        } else {
          window.alert("Failed to create a campaign.");
        }
      })
      .catch((error) => {
        window.alert(
            error
        );
      });
  };

  

  return (
    <>
      <div className="page-content bg-white">
        <PageBanner maintitle="Project" pagetitle="Create Your Own Campaign" background={bg} />

        <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <h3>Create Your Campaign</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <div className="row">
                      <div className="col-md-6">
                        <label>Campaign Category:</label>
                        <select
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          className="form-control"
                        >
                          {titleOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label>SubTitle:</label>
                        <input
                          type="text"
                          name="subtitle"
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
                 
                  <button type="submit" className="btn btn-primary mb-5">
                    Create Campaign
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

export default CreateCompaign;
