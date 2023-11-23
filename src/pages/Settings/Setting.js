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

    const [legalIdentity, setLegalIdentity] = useState("");   
    const [legalFirstName, setLegalFirstName] = useState("");   
    const [legalLastName, setLegalLastName] = useState("");      
    const [legalEmail, setLegalEmail] = useState("");       
    const [legalPhoneNumber, setLegalPhoneNumber] = useState("");   
    const [legalSocailMedia, setLegalSocailMedia] = useState("");   
    const [legalAddress, setLegalAddress] = useState("");
    const [legalCity, setLegalCity] = useState("");             
    const [legalState, setLegalState] = useState("");          
    const [legalPostal, setLegalPostal] = useState("");
    const [legalCountry, setLegalCountry] = useState("");      
    const [legalSecurityNumber, setLegalSecurityNumber] = useState("");      
    const [legalDay, setLegalDay] = useState("");           
    const [legalMonth, setLegalMonth] = useState("");                      
    const [legalYear, setLegalYear] = useState("");
    const [legalCheckingAccountNumber, setLegalCheckingAccountNumber] = useState("");    
    const [legalRoutingNumber, setLegalRoutingNumber] = useState("");
    const [legalConfirmCheckingAccountNumber, setLegalConfirmCheckingAccountNumber] = useState("");                                  

   
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

    const saveRecipientDetails = async () => {
        const items = JSON.parse(localStorage.getItem('user'));
        const token = items?.token;       
        setLoading(true);
        const config = {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
        };

        const option = {
            identity: legalIdentity,
            firstName: legalFirstName,
            lastName: legalLastName,
            email: legalEmail,
            phoneNumber: legalPhoneNumber,
            socialMediaLink: legalSocailMedia,
            address: legalAddress,
            city: legalCity,
            state: legalState,
            postalCode: legalPostal,
            country: legalCountry,
            socialSecurityNumber: legalSecurityNumber,
            dateOfBirth: `${legalDay} ${legalMonth} ${legalYear}`,
            accountNumber: legalCheckingAccountNumber,
            routingNumber: legalRoutingNumber
        } 
        // const option = {
        //     identity: "MySelf",
        //     firstName: "Bilal",
        //     lastName: "Aslam",
        //     email: "bilal.aslam@amcoitsystems.com",
        //     phoneNumber: "+1234567890",
        //     socialMediaLink: "http://localhost:3000/project",
        //     address: "123 Main St",
        //     city: "Anytown",
        //     state: "CA",
        //     postalCode: "12345",
        //     country: "America",
        //     socialSecurityNumber: "123-45-6789",
        //     dateOfBirth: "1990-01-01",
        //     accountNumber: "acct_1OBtGpPCrk1ywUjk",
        //     routingNumber: "123456789"
        // }
        const formData = new FormData();
        for (var key in option) {
            formData.append(key, option[key]);
        }
        console.log("formData Recipent >>>>> ", formData);
        await axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/bank-details/createBankAccountDetails`, formData, config
            )
            .then((res) => {
                if ((res.status === 200 || res.status === 201)) {
                    localStorage.removeItem('user');
                    localStorage.setItem(
                        'user',
                        JSON.stringify({
                            token: token,
                        })
                    );
                    fetchProfileDetails();
                    setLoading(false);
                    toast.success(
                        "Bank Account Details successfully Stored"
                      );
                } else {
                    setLoading(false);
                    toast.error(
                        "Something went wrong!"
                      );
                }
            })
            .catch((e) => {
                setLoading(false);
            });
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
                            <>
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
                                            <Grid hidden item xs={6}></Grid>
                                            <Grid hidden item xs={6}></Grid>
                                            <Grid item xs={6}>
                                                <form>
                                                    <label className="mb-1" htmlFor="fname">First Name</label>
                                                    <br />
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        className="form-control"
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
                                                    <label className="mb-1" htmlFor="lname">Last Name</label>
                                                    <br />
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        className="form-control"
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
                                                    <label className="mb-1" htmlFor="email">Email</label>
                                                    <br />
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        className="form-control"
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
                                                    <label className="mb-1" htmlFor="phone" style={{ marginLeft: '5px' }}>Phone</label>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>                                                                
                                                        <input
                                                            type="text"
                                                            name="phone"
                                                            className="form-control"
                                                            placeholder='e.g:+920342366456'
                                                            id="phone"
                                                            value={phone}
                                                            onChange={(e) => {
                                                            // if (e.target.value.length <= 14) {
                                                                setphone(e.target.value);
                                                            // }
                                                            }}
                                                        />
                                                        </div>
                                                    {/* {phone.length < 13 && (
                                                        <small style={{ color: 'red' }}>
                                                        Phone number must be at least 13 digits long.
                                                        </small>
                                                    )} */}
                                                </form>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <form>
                                                    <label className="mb-1" htmlFor="zip">Zip Code</label>
                                                    <br />
                                                    <input
                                                        type="text"
                                                        name="zip"
                                                        className="form-control"
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
                                                    <label className="mb-1" htmlFor="city">City</label>
                                                    <br />
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        id="city"
                                                        className="form-control"
                                                        value={city}
                                                        onChange={(e) => {
                                                            setcity(e.target.value);
                                                        }}
                                                    />
                                                </form>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <form>
                                                    <label className="mb-1" htmlFor="country">Country</label>
                                                    <br />
                                                    <input
                                                        type="text"
                                                        name="country"
                                                        id="country"
                                                        className="form-control"
                                                        value={country}
                                                        onChange={(e) => {
                                                            setcountry(e.target.value);
                                                        }}
                                                    />
                                                </form>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <form>
                                                    <label className="mb-1" htmlFor="link">Social Media Link</label>
                                                    <br />
                                                    <input
                                                        type="text"
                                                        name="link"
                                                        id="link"
                                                        className="form-control"
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
                            <Grid container sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                <Grid item sx={12} md={2.5} lg={2.5} xl={3}></Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={5}
                                    lg={6}
                                    xl={7.5}
                                    sx={{ pl: { lg: 2, xl: 0 }, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}
                                >
                                    <form
                                        style={{ gap: "10px", marginTop: "10px", }}
                                    >
                                    <h2> Recipient Details</h2>
                                    <small>
                                        Nfuse will attempt to verify your identity and other information you provide and we may delay, withhold, reverse or refund any contributions or other amounts without notice or 
                                        liability in the event that we are unable to verify any information to our satistaction.
                                    </small>
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gap: "10px",
                                            marginTop: "20px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "grid",
                                                gridTemplateColumns: "1fr ",
                                                gap: "10px",
                                            }}
                                        >
                                            <label className="mt-0">Identity<span className="text-danger">*</span></label>
                                            <div style={{ height: '100%' }} className="input-group mb-2">
                                                <select
                                                    className="form-control"
                                                    name="chain_id"           
                                                    value={legalIdentity}
                                                    onChange={(e) => {
                                                        setLegalIdentity(e.target.value);
                                                    }}           
                                                    style={{ 
                                                        height: "fit-content",
                                                        paddingTop: "2%",
                                                        border: "2px solid rgb(204, 204, 204)",
                                                        paddingBottom: "1%" 
                                                    }}
                                                    >
                                                    <option value="myselft">Myself</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                display: "grid",
                                                gridTemplateColumns: "1fr ",
                                                gap: "10px",
                                            }}
                                        >
                                        <label className="mt-2">Legal First Name<span className="text-danger">*</span>
                                        <input
                                            type="text"
                                            value={legalFirstName}
                                            onChange={(e) => {
                                                setLegalFirstName(e.target.value);
                                            }}
                                            style={{
                                                width: "100%",
                                                padding: "6px 6px",
                                                borderRadius: "5px",
                                                border: "2px solid #ccc",
                                            }}
                                            required
                                        />
                                        </label>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: "10px",
                                        marginTop: "10px",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "1fr ",
                                            gap: "10px",
                                        }}
                                    >
                                    <label>Legal Last Name<span className="text-danger">*</span>
                                    <input
                                        type="text"
                                        value={legalLastName}
                                        onChange={(e) => {
                                            setLegalLastName(e.target.value);
                                        }}
                                        style={{
                                            width: "100%",
                                            padding: "6px 6px",
                                            borderRadius: "5px",
                                            border: "2px solid #ccc",
                                        }}
                                        required
                                    />
                                    </label>
                                </div>
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr ",
                                        gap: "10px",
                                    }}
                                >
                                <label>Email<span className="text-danger">*</span>
                                <input
                                    type="email"
                                    value={legalEmail}
                                    onChange={(e) => {
                                        setLegalEmail(e.target.value);
                                    }}
                                    style={{
                                        width: "100%",
                                        padding: "6px 6px",
                                        borderRadius: "5px",
                                        border: "2px solid #ccc",
                                    }}
                                    required
                                />
                                </label>
                            </div>
                        </div>
                        <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "10px",
                            marginTop: "20px",
                        }}
                        >
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr ",
                                gap: "10px",
                            }}
                        >
                        <label>Phone Number<span className="text-danger">*</span>
                        <div style={{ display: "flex" }}>
                            <div className="input-group-prepend">
                                <div 
                                    className="input-group-text text-white"
                                    style={{
                                    background: '#adadad',
                                    borderTopLeftRadius: "5px",
                                    borderBottomLeftRadius: "5px",
                                    borderTopRightRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                    padding: "7px 7px",
                                    }}
                                >&nbsp; &nbsp; +1&nbsp; &nbsp; </div>
                            </div>
                            <input
                                type="text"
                                placeholder="111-222-3456"
                                value={legalPhoneNumber}
                                onChange={(e) => {
                                    setLegalPhoneNumber(e.target.value);
                                }}
                                style={{
                                    width: "100%",
                                    padding: "6px 6px",
                                    border: "2px solid #ccc",
                                    borderTopLeftRadius: "0px",
                                    borderBottomLeftRadius: "0px",
                                    borderTopRightRadius: "5px",
                                    borderBottomRightRadius: "5px",
                                }}
                                required
                            />
                        </div>
                        </label>
                    </div>
                    <div
                        style={{
                        display: "grid",
                        gridTemplateColumns: "1fr ",
                        gap: "10px",
                        }}
                    >
                    <label>Social Media Profile Link
                        <input
                            type="text"
                            value={legalSocailMedia}
                            onChange={(e) => {
                                setLegalSocailMedia(e.target.value);
                            }}
                            style={{
                                width: "100%",
                                padding: "6px 6px",
                                borderRadius: "5px",
                                border: "2px solid #ccc",
                            }}
                            required
                        />
                        </label>
                    </div>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "10px",
                        marginTop: "20px",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr ",
                            gap: "10px",
                        }}
                    >
                        <label>Recipient's Address<span className="text-danger">*</span>
                        <input
                            type="text"
                            value={legalAddress}
                            onChange={(e) => {
                                setLegalAddress(e.target.value);
                            }}
                            style={{
                                width: "100%",
                                padding: "6px 6px",
                                borderRadius: "5px",
                                border: "2px solid #ccc",
                            }}
                            required
                        />
                        </label>
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr ",
                            gap: "10px",
                        }}
                    >
                        <label>Recipient's City/Town/Village<span className="text-danger">*</span>
                        <input
                            type="text"
                            value={legalCity}
                            onChange={(e) => {
                                setLegalCity(e.target.value);
                            }}
                            style={{
                                width: "100%",
                                padding: "6px 6px",
                                borderRadius: "5px",
                                border: "2px solid #ccc",
                            }}
                            required
                        />
                        </label>
                    </div>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "10px",
                        marginTop: "20px",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr ",
                            gap: "10px",
                        }}
                    >
                        <label>State/Province<span className="text-danger">*</span>
                        <input
                            type="text"
                            value={legalState}
                            onChange={(e) => {
                                setLegalState(e.target.value);
                            }}
                            style={{
                                width: "100%",
                                padding: "6px 6px",
                                borderRadius: "5px",
                                border: "2px solid #ccc",
                            }}
                            required
                        />
                        </label>
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr ",
                            gap: "10px",
                        }}
                    >
                        <label>Recipient's Postal Code<span className="text-danger">*</span>
                        <input
                            type="text"
                            value={legalPostal}
                            onChange={(e) => {
                                setLegalPostal(e.target.value);
                            }}
                            style={{
                                width: "100%",
                                padding: "6px 6px",
                                borderRadius: "5px",
                                border: "2px solid #ccc",
                            }}
                            required
                        />
                        </label>
                    </div>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "10px",
                        marginTop: "20px",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr ",
                            gap: "10px",
                        }}
                    >
                        <label className="mb-0">Recipient's Country<span className="text-danger">*</span></label>
                        <div style={{ height: '100%' }} className="input-group mb-2">
                            <select
                                className="form-control"
                                name="chain_id" 
                                value={legalCountry}
                                onChange={(e) => {
                                    setLegalCountry(e.target.value);
                                }}                     
                                style={{ 
                                    height: "fit-content",
                                    paddingTop: "3%",
                                    border: "2px solid rgb(204, 204, 204)",
                                    paddingBottom: "2%" 
                                }}
                            >
                            <option value={0}>Select Country</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "10px",
                        marginTop: "20px",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr ",
                            gap: "10px",
                        }}
                    >
                        <label className="mb-1">Social Security number<span className="text-danger">*</span>
                        <input
                            type="text"
                            placeholder="123456789"
                            value={legalSecurityNumber}
                            onChange={(e) => {
                                setLegalSecurityNumber(e.target.value);
                            }}   
                            style={{
                                width: "100%",
                                padding: "6px 6px",
                                borderRadius: "5px",
                                border: "2px solid #ccc",
                            }}
                            required
                        />
                        </label>
                    </div>
                </div>
                <label className="mt-3 mb-1">Recipient's  Date of Birth<span className="text-danger">*</span></label>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr 1fr",
                        gap: "10px",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr ",
                            gap: "10px",
                        }}
                    >
                    <div style={{ height: '100%' }} className="input-group mb-2">
                        <select
                            className="form-control"
                            name="chain_id" 
                            value={legalDay}
                            onChange={(e) => {
                                setLegalDay(e.target.value);
                            }}                       
                            style={{ 
                                height: "fit-content",
                                paddingTop: "5%",
                                border: "2px solid rgb(204, 204, 204)",
                                paddingBottom: "5%" 
                            }}
                            >
                                <option disabled>Day</option>
                                <option value="01">01</option>
                                <option value="02">02</option>
                        </select>
                    </div>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "2fr ",
                        gap: "10px",
                    }}
                >                         
                <div style={{ height: '100%' }} className="input-group mb-2">
                        <select
                            className="form-control"
                            name="chain_id"              
                            value={legalMonth}
                            onChange={(e) => {
                                setLegalMonth(e.target.value);
                            }}                       
                            sty        
                            style={{ 
                                height: "fit-content",
                                paddingTop: "3%",
                                border: "2px solid rgb(204, 204, 204)",
                                paddingBottom: "2%" }}
                        >
                            <option disabled>Month</option>
                            <option value="Jan">Jan</option>
                            <option value="Feb">Feb</option>
                        </select>
                    </div>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr ",
                        gap: "10px",
                    }}
                >                     
                    <div style={{ height: '100%' }} className="input-group mb-2">
                        <select
                            className="form-control"
                            name="chain_id"         
                            value={legalYear}
                            onChange={(e) => {
                                setLegalYear(e.target.value);
                            }}                 
                            style={{ 
                                height: "fit-content",
                                paddingTop: "5%",
                                border: "2px solid rgb(204, 204, 204)",
                                paddingBottom: "5%" }}
                        >
                            <option disabled>Year</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                        </select>
                    </div>
                </div>
            </div>
            <h5 className="mb-0 mt-3">Bank Account</h5>
            <div
              style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
              }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr ",
                        gap: "10px",
                    }}
                >
                    <label>Checking Account number<span className="text-danger">*</span>
                    <input
                        type="text"
                        value={legalCheckingAccountNumber}
                        onChange={(e) => {
                            setLegalCheckingAccountNumber(e.target.value);
                        }}     
                        style={{
                            width: "100%",
                            padding: "6px 6px",
                            borderRadius: "5px",
                            border: "2px solid #ccc",
                        }}
                        required
                    />
                    </label>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr ",
                        gap: "10px",
                    }}
                >
                <label>Routing number<span className="text-danger">*</span>
                <input
                    type="text"
                    value={legalRoutingNumber}
                    onChange={(e) => {
                        setLegalRoutingNumber(e.target.value);
                    }}     
                    style={{
                        width: "100%",
                        padding: "6px 6px",
                        borderRadius: "5px",
                        border: "2px solid #ccc",
                    }}
                    required
                  />
                </label>
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr ",
                    gap: "10px",
                }}
            >
                <label>Confirm Checking Account number<span className="text-danger">*</span>
                <input
                    type="text"
                    value={legalConfirmCheckingAccountNumber}
                    onChange={(e) => {
                        setLegalConfirmCheckingAccountNumber(e.target.value);
                    }}   
                    style={{
                        width: "100%",
                        padding: "6px 6px",
                        borderRadius: "5px",
                        border: "2px solid #ccc",
                    }}
                    required
                  />
                </label>
            </div>
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                    marginTop: "2%",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr ",
                        gap: "10px",
                    }}
                >
                    <button
                        type="submit"
                        className="btn btn-primary btn-block p-2 mx-auto mb-0"
                        onClick={saveRecipientDetails}
                    >
                        Save Recipient Details
                    </button>
                </div>
            </div>
          </form>
                                </Grid>
                            </Grid>
                        </>
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
