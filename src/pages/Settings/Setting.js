import { React, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, Button, Tabs, Tab } from '../../../node_modules/@mui/material/index';
import styles from './styles.module.scss';
import editIcon from '../../assets/images/editIcon.svg';
import HeaderUser from '../../assets/images/header_user.svg';
import axios from '../../../node_modules/axios/index';
import { ThreeDots } from '../../../node_modules/react-loader-spinner/dist/index';
import { useFormik } from 'formik';
import { ValidationPassword } from '../../pages/schema/index';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import countriesData from './CountryCode'
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const initialValues = {
    currentPassword: '',
    confirmPassword: '',
    newPassword: ''
};
// const CountrySelect = ({ value, onChange }) => {
//     const options = countriesData.map(country => ({
//       label: ` ${country.name}`,
//       value: country.dial_code,
//     }));
  
//     return (
//       <Select
//         value={options.find(option => option.value === value)}
//         onChange={(selectedOption) => onChange(selectedOption.value)}
//         options={options}
//         styles={{
//           control: (provided, state) => ({
//             ...provided,
//             width: '100px', // Adjust the width as needed
//             height: '35px',
//             borderRadius: '5px', // Add rounded corners
//             border: state.isFocused ? '1px solid #297EFF' : '1px solid #CED4DA', // Add focus border
//             boxShadow: state.isFocused ? '0 0 5px rgba(41, 126, 255, 0.5)' : 'none', // Add focus shadow
//           }),
//           option: (provided, state) => ({
//             ...provided,
//             backgroundColor: state.isFocused ? '#297EFF' : 'white', // Highlight focused option
//             color: state.isFocused ? 'white' : 'black', // Set text color for focused option
//           }),
//         }}
//         isSearchable
//       />
//     );
//   };
  
const Setting = (props) => {
    const navigate = useNavigate();
    const [item, setItems] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setphone] = useState("");
    const [link, setlink] = useState("");
    const [country, setcountry] = useState("");
    const [city, setcity] = useState("");
    const [zip, setzip] = useState("");
    const [countryCode, setCountryCode] = useState("");
   
    const [email, setEmail] = useState();
    const [bio, setBio] = useState('');
    const [pic, setPic] = useState('');
    const [urlImage, setUrlImage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [valueTab, setValueTab] = useState(0);
    const [passwordType, setPasswordType] = useState('password');
    const [passwordTypeNew, setPasswordTypeNew] = useState('password');
    const [loading, setLoading] = useState(false);
    const [passwordTypeConfirm, setPasswordTypeConfirm] = useState('password');
   

   
    //   console.log('CountryCode',countriesData);    
   
   
    
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: ValidationPassword,
        
        onSubmit: async (values, action) => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 5000);
            action.resetForm();
            const items = JSON.parse(localStorage.getItem('user'));
            const token = items?.token;
            const userId = items?._id;
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`, // Use Bearer authentication, replace "Bearer" if you have a different authentication method
                },
              };

           
            let data = {
                newPassword: values.newPassword,
                currentPassword: values.currentPassword
              };
              
             
              if (values.confirmPassword !== values.newPassword) {
              
                toast.error("New password and confirm password do not match");
                
              }
            let result = await axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/changePassword`, data,config)
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        toast.success(
                            res?.data?.data?.message
                              ? res?.data?.data?.message
                              : res?.data?.message
                          );
                        // navigate('/login');
                    } else {
                        toast.error(
                            'Current Password is not Correct'
                          );
                        // setErrorMessage('Current Password is not Correct');
                        // setTimeout(() => {
                        //     setErrorAlert(false);
                        // }, 5000);
                    }
                })
                .catch((e) => {
                    toast.error(
                        e.response.data.message
                          );
                    // setErrorMessage(e.response.data.message);
                    // setErrorAlert(true);
                    // setTimeout(() => {
                    //     setErrorAlert(false);
                    // }, 5000);
                });
        }
    });
    
  
       useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        const token = items?.token;
        const userId = items?._id;
        const fetchProfileDetails = async () => {

const config = {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  };
            try {

                
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/getProfileDetails`,config,);
                if (response.status === 200) {
                    //   console.log('Error fetching profile details:', response);
                    const data = await response.json();
                    const data1 = data.user_details;
                    setEmail(data1.email);
                    setphone(data1.phoneNumber);
                    setLastName(data1.lastName);
                    setlink(data1.socialMediaProfile);
                    setFirstName(data1.firstName);
                    setcity(data1.city);
                    setzip(data1.zipcode);
                    setcountry(data1.country);
           
                    setUrlImage(data1.profileImage);
                    //   console.log('Profile details fetched successfully:', data1);
                  }
            } catch (error) {
                //   console.error('Error fetching profile details:', error);
            }
        };

        fetchProfileDetails();
    }, []); 

   
    const fetchProfileDetails = async () => {
        const items = JSON.parse(localStorage.getItem('user'));
        const token = items?.token;
        const userId = items?._id;
        const config = {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          };
          try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/getProfileDetails`, config);
            if (response.status === 200) {
              //   console.log('Error fetching profile details:', response);
              const data = await response.json();
              const data1 = data.user_details;
              setEmail(data1.email);
              setphone(data1.phoneNumber);
              setLastName(data1.lastName);
              setlink(data1.socialMediaProfile);
              setFirstName(data1.firstName);
              setcity(data1.city);
              setzip(data1.zipcode);
              setcountry(data1.country);
     
              setUrlImage(data1.profileImage);
              //   console.log('Profile details fetched successfully:', data1);
            }
          } catch (error) {
            //   console.error('Error fetching profile details:', error);
          }
                };
        


    const hiddenFileInput = useRef(null);
    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setUrlImage(url);
        setPic(file);
    };
    
    const updateProfile = async () => {
        const items = JSON.parse(localStorage.getItem('user'));
        const token = items?.token;
        const userId = items?._id;
       
        setLoading(true);
        //   console.log("formData",pic)
        const config = {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          };
        const option = {
            firstName:firstName,
            lastName:lastName,
            email: email,
            country:country,
            city:city,
            zipcode:zip,
            phoneNumber: `${countryCode} ${phone}`,
            socialMediaProfile:link,
            profileImage: pic,
            bio: 'sada'
        }
        const formData = new FormData();
        for (var key in option) {
            formData.append(key, option[key]);
        }
        //   console.log("formDaxxxta",formData)
        await axios
            .put(`${process.env.REACT_APP_BACKEND_URL}/api/user`, formData, config
            )
            .then((res) => {
               if ((res.status === 200 || res.status === 201)) {
                    localStorage.removeItem('user');
                    localStorage.setItem(
                        'user',
                        JSON.stringify({
                            token: token,
                            // firstName: res.data.data.doc.firstName,
                            // lastName: res.data.data.doc.lastName,
                            // city: res.data.data.doc.city,
                            // country: res.data.data.doc.country,
                            // phone: res.data.data.doc.phoneNumber,
                            // link: res.data.user.doc.socialMediaProfile,
                            // zip: res.data.data.doc.zipcode,
                            // role: res.data.data.doc.role,
                            // email: res.data.data.doc.email,
                            // bio: res.data.data.doc.bio,
                            // profileImage: res.data.data.doc.profileImage
                        })
                    );
                    setUrlImage(res.data.data.doc.profileImage);
                    fetchProfileDetails();
                    setLoading(false);
                    toast.success(
                        "Profile updated successfully! "
                      );
                    // setAlert(true);
                    // setTimeout(() => {
                    //     setAlert(false);
                    // }, 2500);
                    // setUserHeaderProfileImage(urlImage);
                } else {
                    setLoading(false);
                    toast.error(
                        "Something went wrong! "
                      );
                    
                    // setErrorMessage('Something went wrong');
                    // setErrorAlert(true);
                    // setTimeout(() => {
                    //     setErrorAlert(false);
                    // }, 5000);
                }
            })
            .catch((e) => {
                setLoading(false);
                // toast.error(
                //     e.response.data.message || e.response.data
                //   );
                // setErrorMessage(e.response.data.message || e.response.data);
                // setErrorAlert(true);
                // setTimeout(() => {
                //     setErrorAlert(false);
                // }, 5000);
            });
    };
    const togglePassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
            return;
        }
        setPasswordType('password');
    };
    const togglePasswordNew = () => {
        if (passwordTypeNew === 'password') {
            setPasswordTypeNew('text');
            return;
        }
        setPasswordTypeNew('password');
    };
    const togglePasswordConfirm = () => {
        if (passwordTypeConfirm === 'password') {
            setPasswordTypeConfirm('text');
            return;
        }
        setPasswordTypeConfirm('password');
    };
    const handleTabChange = (event, newValue) => {
        setValueTab(newValue);
    };
    return (
        <Box className={styles.mainProfile}>
            {alert ? (
                <Box className={`${styles.alert} ${styles.show}`}>
                    <Typography variant="h1">Success!</Typography>
                    <Typography variant="h2">Profile updated successfully! </Typography>
                </Box>
            ) : (
                <Box className={`${styles.alert} ${styles.hide}`}>
                    <Typography variant="h1">Success!</Typography>
                    <Typography variant="h2">Profile updated successfully! </Typography>
                </Box>
            )}
            {errorAlert ? (
                <Box className={`${styles.errorAlert} ${styles.show}`}>
                    <Typography variant="h1">Invalid!</Typography>
                    <Typography variant="h2">{errorMessage}</Typography>
                </Box>
            ) : (
                <Box className={`${styles.errorAlert} ${styles.hide}`}>
                    <Typography variant="h1">Invalid!</Typography>
                    <Typography variant="h2">{errorMessage}</Typography>
                </Box>
            )}
            <Box sx={{ pl: { xs: 2, sm: 1.6 }, pt: 1.8, pr: 2 }}>
                {/* <Typography variant="h2">Profile</Typography> */}
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: { xs: 3.5, sm: 2.5, md: 0 } }}>
                    <Tabs className={styles.tabbing} value={valueTab} onChange={handleTabChange} aria-label="basic tabs example">
                        <Tab className={styles.tab1} sx={{ p: 0, fontFamily: 'poppins' }} label="Personal Information" {...a11yProps(0)} />
                        <Tab className={styles.tab2} sx={{ p: 0, fontFamily: 'poppins' }} label="Change Password" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={valueTab} className={styles.profileTab} index={0}>
                    <Box sx={{ mt: { xs: 1.5, sm: 2 } }} className={styles.profile}>
                        {loading ? (
                            <Box className={styles.bars}>
                                <ThreeDots color="#E6007C" width={50} height={50} />
                            </Box>
                        ) : (
                            <Grid container sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                <Grid item sx={12} md={2.5} lg={2.5} xl={3}>
                                    <Box className={styles.RoundedBox}>
                                        <Box sx={{ pt: 6, ml: { xl: 6, lg: 2 } }}>
                                            <Box className={styles.profileImg}>
                                                <form>
                                                    <input
                                                        style={{ display: 'none' }}
                                                        ref={hiddenFileInput}
                                                        type="file"
                                                        size="600"
                                                        onChange={(e) => handleFileUpload(e)}
                                                    />
                                                </form>
                                                {urlImage ? (
                                                    <Box className={styles.RoundedAvatar}>
                                                        <img loading="lazy" src={urlImage} alt="Profile" />
                                                    </Box>
                                                ) : (
                                                    <Box className={styles.RoundedAvatar}>
                                                        {/* <img loading="lazy" src={HeaderUser} alt="Profile" /> */}
                                                    </Box>
                                                )}
                                                <Box onClick={handleClick}>
                                                    <img loading="lazy" className={styles.editIcon} src={editIcon} alt="edit Icon" />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={5}
                                    lg={6}
                                    xl={7.5}
                                    sx={{ pl: { lg: 2, xl: 0 }, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}
                                >
      <Box sx={{ px: 3 }} className={styles.profileForm}>
    <Grid container spacing={3}>
        <Grid hidden item xs={6}>
           
        </Grid>
        <Grid hidden item xs={6}>
           
        </Grid>



        <Grid item xs={6}>
        <form>
                <label htmlFor="fname">First Name</label>
                <br />
                <input
                    type="text"
                    name="firstName"
                    id="fname"
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                />
            </form>
        </Grid>
        <Grid item xs={6}>
        <form>
                <label htmlFor="lname">Last Name</label>
                <br />
                <input
                    type="text"
                    name="lastName"
                    id="lname"
                    value={lastName}
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                />
            </form>
        </Grid>
        <Grid item xs={6}>
            <form>
                <label htmlFor="email">Email</label>
                <br />
                <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </form>
        </Grid>
        <Grid item xs={6}>
        <form>
    <label htmlFor="phone" style={{ marginLeft: '5px' }}>
      Phone
    </label>
  <div style={{ display: 'flex', alignItems: 'center' }}>
   

   
  <input
    type="text"
    name="phone"
    placeholder='e.g:+920342366456'
    id="phone"
    value={phone}
    onChange={(e) => {
      if (e.target.value.length <= 14) {
        setphone(e.target.value);
      }
    }}
  />
  </div>
  <br />
  {phone.length < 13 && (
    <p style={{ color: 'red' }}>
      Phone number must be at least 13 digits long.
    </p>
  )}
</form>
        </Grid>
        <Grid item xs={6}>
            <form>
                <label htmlFor="zip">Zip Code</label>
                <br />
                <input
                    type="text"
                    name="zip"
                    id="zip"
                    value={zip}
                    onChange={(e) => {
                        setzip(e.target.value);
                    }}
                />
            </form>
        </Grid>
        <Grid item xs={6}>
            <form>
                <label htmlFor="city">City</label>
                <br />
                <input
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    onChange={(e) => {
                        setcity(e.target.value);
                    }}
                />
            </form>
        </Grid>
        <Grid item xs={6}>
            <form>
                <label htmlFor="country">Country</label>
                <br />
                <input
                    type="text"
                    name="country"
                    id="country"
                    value={country}
                    onChange={(e) => {
                        setcountry(e.target.value);
                    }}
                />
            </form>
        </Grid>
        <Grid item xs={6}>
            <form>
                <label htmlFor="link">Social Media Link</label>
                <br />
                <input
                    type="text"
                    name="link"
                    id="link"
                    value={link}
                    onChange={(e) => {
                        setlink(e.target.value);
                    }}
                />
            </form>
        </Grid>
    </Grid>

    <Box sx={{ mt: 4 }}>
        <form>
            <Button className={styles.profileBtn} onClick={updateProfile}>
                Save
            </Button>
        </form>
    </Box>
</Box>


                                </Grid>
                            </Grid>
                        )}
                    </Box>
                </TabPanel>
                <TabPanel value={valueTab} className={styles.PassTab} index={1}>
                    <Box className={styles.mainPass} sx={{ display: 'flex', justifyContent: 'center', mt: 2, pt: 6, pb: 9 }}>
                        {loading ? (
                            <Box className={styles.bars}>
                                <ThreeDots color="#E6007C" width={50} height={50} />
                            </Box>
                        ) : (
                            <Box className={styles.passForm} sx={{ pt: 2.6 }}>
                                <Box>
                                    <label htmlFor="currentPassword">Current Password</label>
                                    <Box className={styles.profilePassword}>
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                type={passwordType}
                                                name="currentPassword"
                                                id="currentPassword"
                                                value={values.currentPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </form>
                                        <Box onClick={togglePassword} sx={{ pr: 2, cursor: 'pointer' }}>
                                            {passwordType === 'password' ? (
                                                <AiOutlineEye style={{ color: '#ababab', marginTop: '5px', fontSize: '18px' }} />
                                            ) : (
                                                <AiOutlineEyeInvisible style={{ color: '#ababab', marginTop: '5px', fontSize: '18px' }} />
                                            )}
                                        </Box>
                                    </Box>
                                    {errors.currentPassword && touched.currentPassword ? (
                                        <p className={styles.passErrors}>{errors.currentPassword}</p>
                                    ) : null}
                                </Box>
                                <Box sx={{ my: 3 }}>
                                    <label htmlFor="newPassword">New Password</label>
                                    <Box className={styles.profilePassword}>
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                type={passwordTypeNew}
                                                name="newPassword"
                                                id="newPassword"
                                                value={values.newPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </form>
                                        <Box onClick={togglePasswordNew} sx={{ pr: 2, cursor: 'pointer' }}>
                                            {passwordTypeNew === 'password' ? (
                                                <AiOutlineEye style={{ color: '#ababab', marginTop: '5px', fontSize: '18px' }} />
                                            ) : (
                                                <AiOutlineEyeInvisible style={{ color: '#ababab', marginTop: '5px', fontSize: '18px' }} />
                                            )}
                                        </Box>
                                    </Box>
                                    {errors.newPassword && touched.newPassword ? (
                                        <p className={styles.passErrors}>{errors.newPassword}</p>
                                    ) : null}
                                </Box>
                                <Box>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Box className={styles.profilePassword}>
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                type={passwordTypeConfirm}
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </form>
                                        <Box onClick={togglePasswordConfirm} sx={{ pr: 2, cursor: 'pointer' }}>
                                            {passwordTypeConfirm === 'password' ? (
                                                <AiOutlineEye style={{ color: '#ababab', marginTop: '5px', fontSize: '18px' }} />
                                            ) : (
                                                <AiOutlineEyeInvisible style={{ color: '#ababab', marginTop: '5px', fontSize: '18px' }} />
                                            )}
                                        </Box>
                                    </Box>
                                    {errors.confirmPassword && touched.confirmPassword ? (
                                        <p className={styles.passErrors}>{errors.confirmPassword}</p>
                                    ) : null}
                                </Box>
                                <Box sx={{ mt: 4 }}>
                                    <form onSubmit={handleSubmit}>
                                        <Button type="submit" className={styles.passBtn}>
                                            Save
                                        </Button>
                                    </form>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </TabPanel>
            </Box>
        </Box>
    );
};

export default Setting;
