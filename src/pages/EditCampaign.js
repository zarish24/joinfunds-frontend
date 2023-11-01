import React, { useState, useEffect } from 'react';
import PageBanner from '../layouts/PageBanner';
import { Link, useNavigate, useParams } from "react-router-dom";
import bg from '../assets/images/banner/bnr3.jpg';
import axios from "axios";

const EditCampaign = () => {
    const { id } = useParams();
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
    const fetchData = async (_id) => {
      try {
        console.log("campaign_id", _id);
        const response = await axios
          .get(
            `${process.env.REACT_APP_BACKEND_URL}/api/compaign/getSingleCompaign/${_id}`
          )
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
                const s_date = new Date(res?.data?.data?.doc.start_date);
                const s_year = s_date.getFullYear();
                const s_month = s_date.getMonth() + 1; // Month is zero-based, so add 1
                const s_day = s_date.getDate();
                // Create a new formatted date string
                const formattedStartDate = `${s_year}-${String(s_month).padStart(2, '0')}-${String(s_day).padStart(2, '0')}`;

                const date = new Date(res?.data?.data?.doc.end_date);
                const year = date.getFullYear();
                const month = date.getMonth() + 1; // Month is zero-based, so add 1
                const day = date.getDate();
                // Create a new formatted date string
                const formattedEndDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                setFormData({
                title: res?.data?.data?.doc.title || '', // Use the values from "doc" or provide default values
                subtitle: res?.data?.data?.doc.subtitle || '',
                total_funding: res?.data?.data?.doc.total_funding || 0,
                description: res?.data?.data?.doc.description || '',
                minimum_amount: res?.data?.data?.doc.minimum_amount || 0,
                maximum_amount: res?.data?.data?.doc.maximum_amount || 0,
                start_date:formattedStartDate || '',
                end_date: formattedEndDate || '',
                campaign_status: res?.data?.data?.doc.status || 'pending',
                campaign_type: res?.data?.data?.doc.campaign_type || 'funding',
              });
            } else {
              window.alert("Compaigns not fount due to some issue!");
            }
          })
          .catch((error) => {
            window.alert(error);
          });
      } catch (error) {
        window.alert("API request failed", error);
        console.error("API request failed", error);
      }
    };
    fetchData(id);
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
      .put(`${process.env.REACT_APP_BACKEND_URL}/api/compaign/updateCompaign/${id}`, formData)
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
                  </div>
                 
                  <button type="submit" className="btn btn-primary mb-5">
                    Edit Campaign
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
