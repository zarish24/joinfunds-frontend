import { React, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, Button, Tabs, Tab } from '../../../node_modules/@mui/material/index';
import styles from './styles.module.scss';
import styled from 'styled-components';
import editIcon from '../../assets/images/editIcon.svg';
import HeaderUser from '../../assets/images/header_user.svg';
import { InputGroup, FormControl } from 'react-bootstrap';
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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import CitiesList from '../../layouts/CitiesList'
import validUrl from 'valid-url';
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
const Setting = (props) => {
    const navigate = useNavigate();
    const [item, setItems] = useState([]);
    const [BankAvalible, setBankAvalible] = useState(false);
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

    const [legalIdentity, setLegalIdentity] = useState("myself");
    const [legalFirstName, setLegalFirstName] = useState("");
    const [legalLastName, setLegalLastName] = useState("");
    const [legalEmail, setLegalEmail] = useState("");
    const [legalPhoneNumber, setLegalPhoneNumber] = useState("");
    const [legalSocailMedia, setLegalSocailMedia] = useState("---");
    const [legalAddress, setLegalAddress] = useState("");
    const [legalCity, setLegalCity] = useState("");
    const [legalState, setLegalState] = useState("");
    const [legalPostal, setLegalPostal] = useState("");
    const [legalCountry, setLegalCountry] = useState("USA");
    const [legalSecurityNumber, setLegalSecurityNumber] = useState("");

    const [legalCheckingAccountNumber, setLegalCheckingAccountNumber] = useState("");
    const [legalRoutingNumber, setLegalRoutingNumber] = useState("");
    const [legalConfirmCheckingAccountNumber, setLegalConfirmCheckingAccountNumber] = useState("");
    const [legalDay, setLegalDay] = useState(1);
    const [legalMonth, setLegalMonth] = useState(1);
    const [legalYear, setLegalYear] = useState(2023);
    const [legalFirstNameError, setLegalFirstNameError] = useState(false);
    const [legalLastNameError, setLegalLastNameError] = useState(false);
    const [legalLastEmailError, setLegalLastEmailError] = useState(false);
    const [legalLastPhoneNumberError, setLegalLastPhoneNumberError] = useState(false);
    const [legalSocailMediaError, setLegalSocailMediaError] = useState(false);
    const [legalStateError, setLegalStateError] = useState(false);
    const [legalCityError, setLegalCityError] = useState(false);
    const [legalPostalError, setLegalPostalError] = useState(false);

    const [legalAddressError, setLegalAddressError] = useState(false);
    const [LegalDateOfBirthError, setLegalDateOfBirthError] = useState(false);
    const [legalSecurityNumberError, setLegalSecurityNumberError] = useState(false);
    const [legalCheckingAccountNumberError, setLegalCheckingAccountNumberError] = useState(false);
    const [legalRoutingNumberError, setLegalRoutingNumberError] = useState(false);
    const [legalConfirmCheckingAccountNumberError, setLegalConfirmCheckingAccountNumberError] = useState(false);
    const [legalIdentityError, setLegalIdentityError] = useState(false);

    const [phoneError1, setPhoneError1] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);

    const [mediaLinkError, setMediaLinkError] = useState(false);
    const [passwordError1, setPasswordError1] = useState(false);
    const [passwordError2, setPasswordError2] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [zipError, setZipError] = useState(false);
    const [zipErrorLength, setZipErrorLength] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [desiredAmountError, setDesiredAmountError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [images, setImages] = useState([]);
  const [titleOptions, setTitleOptions] = useState([]);
  const [descriptionError, setDescriptionError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [createdByError, setCreatedByError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);  
  const [imageError, setImageError] = useState(false);  
    const [formData, setFormData] = useState({
        category_id:'',
        title: '',
        // subtitle: '',
        total_funding: 0,
        description: '',
        start_date: '',
        end_date: '',
        created_by:'Other',
        donation_to_nfuse:'15',
        campaign_url:'',
        country:'United States',
        campaign_status: 'pending',  
        campaign_type: 'Funding',  
        user_id: ''
      });
    console.log('link', link);

    useEffect(() => {
        if (!legalDay || !legalMonth || !legalYear) {
            const currentDate = new Date();
            setLegalDay(currentDate.getDate());
            setLegalMonth(currentDate.getMonth() + 1);
            setLegalYear(currentDate.getFullYear());
        }
    }, [legalDay, legalMonth, legalYear]);

    const MultipleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        setImageError(false);
        setImages(files);
      };
    useEffect(() => {
        const fetchCategories = async () => {
            const items = JSON.parse(localStorage.getItem('user'));
            const token = items?.token;
          try {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`, 
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
      const handleChange2 = (e) => {
        const { name, value } = e.target;
        switch (name) {
          case 'total_funding':
              if (value > 0) {
                  setDesiredAmountError(false);
              }
              break;
          case 'category_id':
              if (value !== '') {
                  setCategoryError(false);
              }
              break;
          case 'title':
              if (value !== '') {
                  setTitleError(false);
              }
              break;
          case 'description':
              if (value !== '') {
                  setDescriptionError(false);
              }
              break;
          case 'created_by':
              if (value !== '') {
                  setCreatedByError(false);
              }
              break;
          case 'start_date':
              if (value !== '') {
                  setStartDateError(false);
              }
              break;
          case 'end_date':
              if (value !== '') {
                  setEndDateError(false);
              }
              break;
          // Add cases for other fields as needed
          // case 'campaign_url':
          //   if (value !== '') {
          //     setUrlError(false);
          //   }
          //   break;
          default:
              break;
      }
    
        setFormData({
          ...formData,
          [name]: value,
        });
      };
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
                    Authorization: `Bearer ${token}`,
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
                .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/changePassword`, data, config)
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

    const isValidUrl = (url) => {
        console.log('url url', url)
        return validUrl.isUri(url);
    };
    const handleInputlinkChange = (e) => {
        const inputValue = e.target.value;
        setlink(inputValue);


    };

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


                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/getProfileDetails`, config,);
                if (response.status === 200) {
                    //   console.log('Error fetching profile details:', response);
                    const data = await response.json();
                    const data1 = data?.user_details;
                    setEmail(data1?.email);
                    setphone(data1?.phoneNumber);
                    setLastName(data1?.lastName);
                    setlink(data1?.socialMediaProfile);
                    setFirstName(data1?.firstName);
                    setcity(data1?.city);
                    setzip(data1?.zipcode);
                    setcountry(data1?.country);

                    setUrlImage(data1?.profileImage);
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

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        const phoneRegex = /^\d{10}$/;
        if (value.length <= 10) {
            setphone(value);
            setPhoneError1(false);
        }
        if (e.target.value.length > 0) {
            setPhoneError1(false);
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
    const handleSecuritynumberChange = (e) => {
        const input = e.target.value;
        const numbers = input.replace(/[^0-9]/g, '');
        if (input.length > 0) {
            setLegalLastPhoneNumberError(false);
        }
        if (numbers.length === 9) {
            // Format the SSN if it has exactly 9 digits
            const formattedSSN = numbers.substr(0, 3) + '-' + numbers.substr(3, 2) + '-' + numbers.substr(5, 4);
            setLegalSecurityNumber(formattedSSN);
            setErrorMessage('');
        } else {
            // If not exactly 9 digits, set an error message
            setLegalSecurityNumber(numbers); // Update state without formatting
            setErrorMessage('Legal security number must be 9 digits.');
        }
    };

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        const token = items?.token;
        const fetchData = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/bank-details/getBankAccountDetails`, config)
                const Data = response.data.data;
                console.log("Data >>>>>>>>>>>>>>>>>>>>>>>>>>> ", Data);
                setLegalIdentity(Data.identity)
                setBankAvalible(true);
                setLegalFirstName(Data.firstName);
                setLegalLastName(Data.lastName);
                setLegalEmail(Data.email);
                setLegalPhoneNumber(Data.phoneNumber);
                setLegalSocailMedia(Data.socialMediaLink);
                setLegalAddress(Data.address);
                setLegalCity(Data.city);
                setLegalState(Data.state);
                setLegalPostal(Data.postalCode);
                setLegalCountry(Data.country);
                setLegalSecurityNumber(Data.socialSecurityNumber);
                setLegalCheckingAccountNumber(Data.stripeConnectedAccountNumber);
                setLegalRoutingNumber(Data.routingNumber);
                // setLegalConfirmCheckingAccountNumber(Data.accountNumber);
                const dateOfBirth = Data.dateOfBirth || "";
                const dateParts = dateOfBirth.split("-");
                const day = parseInt(dateParts[2], 10);
                const month = parseInt(dateParts[1], 10);
                const year = parseInt(dateParts[0], 10);
                setLegalDay(day);
                setLegalMonth(month);
                setLegalYear(year);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();

    }, []);

    const handleCityChange = (e) => {
        const selectedCity = e.target.value;

        setcity(selectedCity);
        // setzip(CitiesList[selectedCity]); 


    };
    const isStartDateValid = (startDate, endDate) => {
        const today = new Date().toISOString().split('T')[0];
        return startDate >= today && startDate !== endDate;
      };
    
      const isEndDateValid = (startDate, endDate) => {
        const today = new Date().toISOString().split('T')[0];
        return endDate >= today && startDate !== endDate;
      };
    


    const fetchBankData = async () => {
        const items = JSON.parse(localStorage.getItem('user'));
        const token = items?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/bank-details/getBankAccountDetails`, config)
            const Data = response.data.data;


            console.log("Data >>>>>>>>>>>>>>>>>>>>>>>>>>> ", Data);

            setLegalIdentity(Data.identity)
            setBankAvalible(true)
            setLegalFirstName(Data.firstName);
            setLegalLastName(Data.lastName);
            setLegalEmail(Data.email);
            setLegalPhoneNumber(Data.phoneNumber);
            setLegalSocailMedia(Data.socialMediaLink);
            setLegalAddress(Data.address);
            setLegalCity(Data.city);
            setLegalState(Data.state);
            setLegalPostal(Data.postalCode);
            setLegalCountry(Data.country);
            setLegalSecurityNumber(Data.socialSecurityNumber);
            setLegalCheckingAccountNumber(Data.stripeConnectedAccountNumber);
            setLegalRoutingNumber(Data.routingNumber);
            // setLegalConfirmCheckingAccountNumber(Data.accountNumber);
            const dateOfBirth = Data.dateOfBirth || "";
            const dateParts = dateOfBirth.split("-");
            const day = parseInt(dateParts[2], 10);
            const month = parseInt(dateParts[1], 10);
            const year = parseInt(dateParts[0], 10);
            setLegalDay(day);
            setLegalMonth(month);
            setLegalYear(year);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    


    const saveRecipientDetails = async () => {
        setLoading(true);
        if (legalFirstName.length === 0) {
            setLegalFirstNameError(true);
            setLoading(false);
            return;
        }
        if (legalLastName.length === 0) {
            setLegalLastNameError(true);
            setLoading(false);
            return;
        }
        if (legalEmail.length === 0) {
            setLegalLastEmailError(true);
            setLoading(false);
            return;
        }
        if (legalPhoneNumber.length === 0) {
            setLegalLastPhoneNumberError(true);
            setLoading(false);
            return;
        }
        // if(legalSocailMedia.length === 0){
        //     setLegalSocailMediaError(true);
        //     setLoading(false);
        //     return;
        // }       
        if (legalState.length === 0) {
            setLegalStateError(true);
            setLoading(false);
            return;
        }
        if (legalCity.length === 0) {
            setLegalCityError(true);
            setLoading(false);
            return;
        }
        if (legalPostal.length === 0) {
            setLegalPostalError(true);
            setLoading(false);
            return;
        }
        if (legalCheckingAccountNumber.length === 0) {
            setLegalCheckingAccountNumberError(true);
            setLoading(false);
            return;
        }
        if (legalAddress.length === 0) {
            setLegalAddressError(true);
            setLoading(false);
            return;
        }

        const currentDate = new Date();
        const selectedDate = new Date(`${legalMonth} ${legalDay} ${legalYear}`);
        const ageDifference = currentDate.getFullYear() - selectedDate.getFullYear();
        if (ageDifference < 18) {
            setLegalDateOfBirthError(true);
            setLoading(false);
            return;
        }
        // if (legalRoutingNumber.length === 0) {
        //     setLegalRoutingNumberError(true);
        //     setLoading(false);
        //     return;
        // }
        // if (legalConfirmCheckingAccountNumber.length === 0) {
        //     setLegalConfirmCheckingAccountNumberError(true);

        //     setLoading(false);
        //     return;
        // }
        if (legalSecurityNumber.length === 0) {
            setLegalSecurityNumberError(true);
            setLoading(false);
            return;
        }
        if (legalIdentity.length === 0) {
            setLegalIdentityError(true);
            setLoading(false);
            return;
        }
        else {
            // console.log('Elseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', legalSecurityNumber.length);
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
                address: legalAddress,
                city: legalCity,
                state: legalState,
                postalCode: legalPostal,
                country: legalCountry,
                socialSecurityNumber: legalSecurityNumber,
                dateOfBirth: `${legalDay} ${legalMonth} ${legalYear}`,
                stripeConnectedAccountNumber: legalCheckingAccountNumber,
                // routingNumber: legalRoutingNumber
            };


            const jsonData = JSON.stringify(option);

            const formData = new FormData();
            for (var key in option) {
                formData.append(key, option[key]);
            }
            console.log("formData Recipent >>>>> ", formData);
            const apiUrl = BankAvalible
                ? `${process.env.REACT_APP_BACKEND_URL}/api/bank-details/updateBankAccountDetails`
                : `${process.env.REACT_APP_BACKEND_URL}/api/bank-details/createBankAccountDetails`;
            const axiosMethod = BankAvalible ? axios.put : axios.post;
            await axiosMethod(apiUrl, option, config)
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
                        setLegalDateOfBirthError(false)
                        setLoading(false);
                        setLegalFirstName("");
                        setLegalLastName("");
                        setLegalEmail("");
                        setLegalPhoneNumber("");
                        setLegalSocailMedia("");
                        setLegalAddress("");
                        setLegalCity("");
                        setLegalState("");
                        setLegalPostal("");
                        setLegalCountry("");
                        setLegalSecurityNumber("");
                        setLegalCheckingAccountNumber("");
                        setLegalRoutingNumber("");
                        setLegalConfirmCheckingAccountNumber("");
                        fetchBankData()
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
                    toast.error(
                        e.response.data.message
                    );
                });
        }
    };
    const updateProfile = async () => {
        // Retrieve user data from localStorage
        const items = JSON.parse(localStorage.getItem('user'));
        const token = items?.token;
        const userId = items?._id;

        // Set loading state to true
        setLoading(true);

        // Validate first name
        if (firstName.length === 0) {
            setFirstNameError(true);
            setLoading(false);
            return;
        }

        // Validate last name
        if (lastName.length === 0) {
            setLastNameError(true);
            setLoading(false);
            return;
        }

        // Validate email
        if (email.length === 0) {
            setEmailError(true);
            setLoading(false);
            return;
        }

        // Validate phone number
        const validateAmericanPhoneNumber = (phoneNumber) => {
            const numericValue = phoneNumber.replace(/\D/g, '');
            return /^(\d{3}-\d{3}-\d{4}|\d{10})$/.test(numericValue);
        };

        if (!validateAmericanPhoneNumber(phone)) {
            setPhoneError1(true);
            setLoading(false);
            return;
        }

        // Validate zip code
        if (zip.length !== 5) {
            setZipErrorLength(true);
            setLoading(false);
            return;
        }

        // Validate city
        if (city.length === 0) {
            setCityError(true);
            setLoading(false);
            return;
        }

        // Construct option object with user data
        const option = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            country: country,
            city: city,
            zipcode: zip,
            phoneNumber: phone,
            socialMediaProfile: link,
            profileImage: pic,
            bio: 'sada'
        };

        // Create FormData for the API call
        const formData = new FormData();
        for (var key in option) {
            formData.append(key, option[key]);
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {

            const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/user/updateProfile`, formData, config);

            if (res.status === 200 || res.status === 201) {
                console.log('res img', res)
                setUrlImage(res.data.data.doc.profileImage);
                fetchProfileDetails();
                setLoading(false);
                toast.success(res.data.messsage);
            } else {
                setLoading(false);
                toast.error('Something went wrong!');
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.response?.data.message);
        }
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
    const validateAmericanPhoneNumber = (phoneNumber) => {
        // Remove non-numeric characters
        const numericValue = phoneNumber.replace(/\D/g, '');

        // Check if it matches the pattern ###-###-#### or ##########
        return /^(\d{3}-\d{3}-\d{4}|\d{10})$/.test(numericValue);
    };
    const handleDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
    console.log('selectedDate',selectedDate)
        if (!isNaN(selectedDate.getTime())) {
          setLegalDay(selectedDate.getDate());
          setLegalMonth(selectedDate.getMonth() + 1);
          setLegalYear(selectedDate.getFullYear());
        }
      };


    const handlePhoneNumberChange = (e) => {
        const input = e.target.value;

        // Check validation after 7 digits have been entered
        if (input.length >= 15 && !validateAmericanPhoneNumber(input)) {
            // toast.error('Please enter a valid American phone number.');
            return;
        }
        setLegalLastPhoneNumberError(false);
        setLegalPhoneNumber(input);
    };
    const saveOtherRecipientDetails = async () => {
        console.log('other is runinig')
        setLoading(true);
        if (legalFirstName.length === 0) {
            setLegalFirstNameError(true);
            setLoading(false);
            return;
        }
        if (legalLastName.length === 0) {
            setLegalLastNameError(true);
            setLoading(false);
            return;
        }
        if (legalEmail.length === 0) {
            setLegalLastEmailError(true);
            setLoading(false);
            return;
        }
        if (legalPhoneNumber.length === 0) {
            setLegalLastPhoneNumberError(true);
            setLoading(false);
            return;
        }
        // if(legalSocailMedia.length === 0){
        //     setLegalSocailMediaError(true);
        //     setLoading(false);
        //     return;
        // }       
        // if (legalState.length === 0) {
        //     setLegalStateError(true);
        //     setLoading(false);
        //     return;
        // }
        // if (legalCity.length === 0) {
        //     setLegalCityError(true);
        //     setLoading(false);
        //     return;
        // }
        // if (legalPostal.length === 0) {
        //     setLegalPostalError(true);
        //     setLoading(false);
        //     return;
        // }
        // if (legalCheckingAccountNumber.length === 0) {
        //     setLegalCheckingAccountNumberError(true);
        //     setLoading(false);
        //     return;
        // }
        // if (legalAddress.length === 0) {
        //     setLegalAddressError(true);
        //     setLoading(false);
        //     return;
        // }

        // const currentDate = new Date();
        // const selectedDate = new Date(`${legalMonth} ${legalDay} ${legalYear}`);
        // const ageDifference = currentDate.getFullYear() - selectedDate.getFullYear();
        // if (ageDifference < 18) {
        //     setLegalDateOfBirthError(true);
        //     setLoading(false);
        //     return;
        // }
        // if (legalRoutingNumber.length === 0) {
        //     setLegalRoutingNumberError(true);
        //     setLoading(false);
        //     return;
        // }
        // if (legalConfirmCheckingAccountNumber.length === 0) {
        //     setLegalConfirmCheckingAccountNumberError(true);

        //     setLoading(false);
        //     return;
        // }
        // if (legalSecurityNumber.length === 0) {
        //     setLegalSecurityNumberError(true);
        //     setLoading(false);
        //     return;
        // }
        // if (legalIdentity.length === 0) {
        //     setLegalIdentityError(true);
        //     setLoading(false);
        //     return;
        // }
        if (!formData.category_id) {
            setCategoryError(true);
            setLoading(false);
            return;
        }
      
          if (!formData.title) {
            setTitleError(true);
            setLoading(false);
            return;
        }
        if (!formData.description) {
          setDescriptionError(true);
          setLoading(false);
          return;
      }
          if (!formData.total_funding) {
              setDesiredAmountError(true);
              setLoading(false);
              return;
          }
      
         
        
      
       
      
          if (!formData.created_by) {
              setCreatedByError(true);
              setLoading(false);
              return;
          }
      
          if (!formData.start_date) {
              setStartDateError(true);
              setLoading(false);
              return;
          }
      
          if (!formData.end_date) {
              setEndDateError(true);
              setLoading(false);
              return;
          }
          const startDateIsValid = isStartDateValid(formData.start_date, formData.end_date);
      const endDateIsValid = isEndDateValid(formData.start_date, formData.end_date);
      
      const getDaysDifference = (startDate, endDate) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffDays = Math.round(Math.abs((start - end) / oneDay));
        return diffDays;
      };
      const daysDifference = getDaysDifference(formData.start_date, formData.end_date);
          if (!startDateIsValid || !endDateIsValid || daysDifference > 90) {
            setLoading(false);
          
            if (formData.start_date === formData.end_date) {
              toast.error('Start and end date cannot be the same.');
            }  else if (daysDifference > 90) {
              toast.error('Campaign can only be valid for 90 days. Select a date range within 90 days.');
            }
           else if (startDateIsValid && endDateIsValid) {
              toast.error('Start and end date must be present or future.');
            }
          
            return;
          }
          
      
          if (images.length === 0) {
              setImageError(true);
              setLoading(false);
              return;
          }
        else {
            // console.log('Elseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', legalSecurityNumber.length);
            const items = JSON.parse(localStorage.getItem('user'));
            const token = items?.token;
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            // const option = {
            //     userDetails: {
            //       identity: legalIdentity,
            //       firstName: legalFirstName,
            //       lastName: legalLastName,
            //       email: legalEmail,
            //       phoneNumber: legalPhoneNumber,
            //       country: legalCountry,
            //     },
            //     campaignDetail: {
            //       category_id: formData.category_id,
            //       title: formData.title,
            //       total_funding: formData.total_funding,
            //       description: formData.description,
            //       created_by: formData.created_by,
            //       donation_to_nfuse: formData.donation_to_nfuse,
            //       country: formData.country,
            //       start_date: formData.start_date,
            //       end_date: formData.end_date,
            //       campaign_status: formData.campaign_status,
            //       campaign_type: formData.campaign_type,
            //     },
            //   };
            const option = {
               
                  identity: legalIdentity,
                  firstName: legalFirstName,
                  lastName: legalLastName,
                  email: legalEmail,
                  phoneNumber: legalPhoneNumber,
                  country: legalCountry,
              
               
                  category_id: formData.category_id,
                  title: formData.title,
                  total_funding: formData.total_funding,
                  description: formData.description,
                  created_by: formData.created_by,
                  donation_to_nfuse: formData.donation_to_nfuse,
                  donation_country: formData.country,
                  start_date: formData.start_date,
                  end_date: formData.end_date,
                  campaign_status: formData.campaign_status,
                  campaign_type: formData.campaign_type,
               
              };
              console.log("formData option >>>>> ", option);

            const jsonData = JSON.stringify(option);

            const bodyData = new FormData();
            for (var key in option) {
                bodyData.append(key, option[key]);
            }
            for (let i = 0; i < images.length; i++) {
                bodyData.append("images", images[i]);
            }
            console.log("formData Recipent >>>>> ", bodyData);
            const apiUrl =  `${process.env.REACT_APP_BACKEND_URL}/api/compaign/createCompaignForAnotherUser`
            const axiosMethod = axios.post;
            await axiosMethod(apiUrl, bodyData, config)
                .then((res) => {
                    if ((res.status === 200 || res.status === 201)) {
                       
                        setLegalIdentity("myself");
                        setLegalDateOfBirthError(false);
                        setLoading(false);
                        setLegalFirstName("");
                        setLegalLastName("");
                        setLegalEmail("");
                        setLegalPhoneNumber("");
                        setLegalSocailMedia("");
                        setLegalAddress("");
                        setLegalCity("");
                        setLegalState("");
                        setLegalPostal("");
                        setLegalCountry("");
                        setLegalSecurityNumber("");
                        setLegalCheckingAccountNumber("");
                        setLegalRoutingNumber("");
                        setLegalConfirmCheckingAccountNumber("");
                        setFormData({
                            category_id: '',
                            title: '',
                            total_funding: 0,
                            description: '',
                            created_by: '',
                            donation_to_nfuse: '15',
                            campaign_status: 'pending',
                            campaign_type: 'Funding',
                            start_date: '',
                            end_date: '',
                            user_id: '',
                          });
                        toast.success(
                            "Campaign created successfully"
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
                    toast.error(
                        e.response.data.message
                    );
                });
        }
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
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: { xs: 7.5, sm: 7.5, md: 0 } }}>
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
                                                            <img loading="lazy" src="https://via.placeholder.com/150" alt="Profile" />
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
                                    // sx={{ pl: { lg: 2, xl: 0 }, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}
                                    >
                                        <Box sx={{ px: 3 }} className={styles.profileForm}>
                                            <Grid container spacing={3} style={{ marginTop: "10px" }}>
                                                <Grid hidden item xs={6}></Grid>
                                                <Grid hidden item xs={6}></Grid>
                                                <Grid item xs={12} md={6} lg={6} >
                                                    <form style={{  }}>
                                                        <label className="mb-1" htmlFor="fname">First Name</label>
                                                        <br />
                                                        <input
                                                            type="text"
                                                            name="firstName"
                                                            className="form-control"
                                                            style={{
                                                                width: '100%',
                                                                border: `2px solid ${firstNameError ? 'red' : '#ccc'}`,

                                                            }}
                                                            id="fname"
                                                            value={firstName}
                                                            onChange={(e) => {
                                                                setFirstName(e.target.value);
                                                            }}
                                                            required
                                                        />
                                                        {firstNameError && (
                                                            <Error className="input feedback">First Name is required</Error>
                                                        )}
                                                    </form>
                                                </Grid>
                                                <Grid item xs={12} md={6} lg={6}>
                                                    <form style={{  }}>
                                                        <label className="mb-1" htmlFor="lname">Last Name</label>
                                                        <br />
                                                        <input
                                                            type="text"
                                                            name="lastName"
                                                            className="form-control"
                                                            id="lname"
                                                            value={lastName}
                                                            style={{
                                                                width: '100%',
                                                                border: `2px solid ${lastNameError ? 'red' : '#ccc'}`,
                                                            }}
                                                            onChange={(e) => {
                                                                setLastName(e.target.value);
                                                            }}
                                                            required
                                                        />
                                                        {lastNameError && (
                                                            <Error className="input feedback">Last Name is required</Error>
                                                        )}
                                                    </form>
                                                </Grid>
                                                <Grid item xs={12} md={6} lg={6}>
                                                    <form style={{  }}>
                                                        <label className="mb-1" htmlFor="email">Email</label>
                                                        <br />
                                                        <input
                                                            type="text"
                                                            name="email"
                                                            className="form-control"
                                                            id="email"
                                                            value={email}
                                                            style={{
                                                                width: '100%',
                                                                border: `2px solid ${emailError ? 'red' : '#ccc'}`,
                                                            }}
                                                            onChange={(e) => {
                                                                setEmail(e.target.value);
                                                            }}
                                                            required
                                                        />
                                                        {emailError && (
                                                            <Error className="input feedback">Email is required</Error>
                                                        )}
                                                    </form>
                                                </Grid>
                                                <Grid item xs={12} md={6} lg={6}>
                                                    <form style={{  }}>

                                                        <label className="mb-1" htmlFor="phone" style={{ marginLeft: '5px' }}>Phone Number</label>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <div className="input-group-prepend">
                                                                <div
                                                                    className="input-group-text text-white"
                                                                    style={{
                                                                        background: '#adadad',
                                                                        borderTopLeftRadius: "5px",
                                                                        borderBottomLeftRadius: "5px",
                                                                        borderTopRightRadius: "0px",
                                                                        borderBottomRightRadius: "0px",
                                                                        border: `2px solid ${phoneError1 ? 'red' : '#ccc'}`,
                                                                        padding: "5px 0px",
                                                                    }}
                                                                >&nbsp; &nbsp; +1&nbsp; &nbsp; </div>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                placeholder="   111-222-3456"
                                                                name="phone"
                                                                className="form-control"

                                                                id="phone"
                                                                value={phone}
                                                                onChange={handlePhoneChange}
                                                                style={{
                                                                    width: '100%',
                                                                    border: `2px solid ${phoneError1 ? 'red' : '#ccc'}`,
                                                                }}
                                                                required
                                                            />
                                                        </div>
                                                        {phoneError1 && (
                                                            <Error className="input feedback">Please enter a valid American Phone Number</Error>
                                                        )}
                                                    </form>
                                                </Grid>


                                                <Grid item xs={12}>
                                                    <form style={{  }}>


                                                        <label> Country    </label>
                                                        <br />
                                                        <select
                                                            value={country}
                                                            // onChange={(e) => setCity(e.target.value)}
                                                            onChange={(e) => setcountry(e.target.value)}
                                                            style={{
                                                                width: "100%",
                                                                padding: "8px",
                                                                borderRadius: "5px",
                                                                border: "2px solid #ccc",
                                                            }}
                                                        >
                                                            <option value="USA" >USA</option>
                                                        </select>

                                                        {/* <label className="mb-1" htmlFor="country">Country</label>
                                                    <input
                                                        type="text"
                                                        name="country"
                                                        id="country"
                                                        className="form-control"
                                                        value={country}
                                                        onChange={(e) => {
                                                            setcountry(e.target.value);
                                                        }}

                                                    /> */}
                                                    </form>
                                                </Grid>
                                                <Grid item xs={12} md={6} lg={6}>
                                                    <form style={{  }}>
                                                        <label className="mb-1" htmlFor="link">Social Media Link</label>
                                                        <br />
                                                        <input
                                                            type="url"
                                                            name="link"
                                                            id="link"
                                                            className="form-control"
                                                            value={link}
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                            onChange={handleInputlinkChange}
                                                        />
                                                    </form>
                                                    {link.trim() !== "" && !isValidUrl(link) && (
                                                        <p style={{ color: "red" }}>Please enter a valid Social Media Profile Link</p>
                                                    )}

                                                </Grid>
                                                <Grid item xs={12} md={6} lg={6}>
                                                    <form style={{  }}>

                                                        <label> State </label>
                                                        <select
                                                            value={city}
                                                            // onChange={(e) => setCity(e.target.value)}
                                                            onChange={handleCityChange}
                                                            style={{
                                                                width: "100%",
                                                                padding: "8px",
                                                                borderRadius: "5px",
                                                                border: `2px solid ${cityError ? 'red' : '#ccc'}`,
                                                            }}
                                                        >
                                                            <option value="" disabled>Select a city</option>
                                                            {Object.keys(CitiesList).map((cityName) => (
                                                                <option key={cityName} value={cityName}>
                                                                    {cityName}
                                                                </option>
                                                            ))}
                                                        </select>

                                                        {cityError && (
                                                            <Error className="input feedback">State is required</Error>
                                                        )}

                                                    </form>
                                                </Grid>
                                                <Grid item xs={12} md={6} lg={6}>
                                                    <form style={{  }}>

                                                        <label>Postal Code   </label>
                                                        <input
                                                            type="number"
                                                            value={zip}
                                                            onChange={(e) => setzip(e.target.value)}
                                                            style={{
                                                                width: "100%",
                                                                padding: "2px",
                                                                borderRadius: "5px",
                                                                border: `2px solid ${zipError ? 'red' : '#ccc'}`,
                                                            }}

                                                        />
                                                        {zipErrorLength && (
                                                            <Error className="input feedback">Postal Code Must be 5 Digits </Error>
                                                        )}

                                                    </form>
                                                </Grid>
                                            </Grid>
                                            <Box sx={{ mt: 4 }}>
                                                <form style={{  }}>
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
                                        // sx={{ pl: { lg: 2, xl: 0 }, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}
                                    >
                                        <form
                                            style={{ gap: "10px", marginTop: "10px", padding: "10px" }}
                                        >
                                            <h2> Recipient Details</h2>
                                            <small style={{ textAlign: 'justify' }}>
                                                Nfuse will attempt to verify your identity and other information you provide and we may delay, withhold, reverse or refund any contributions or other amounts without notice or
                                                liability in the event that we are unable to verify any information to our satistaction.
                                            </small>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} md={6} lg={6} style={{ marginTop: "10px" }}>
                                                    <label className="mt-0">Identity<span className="text-danger">*</span></label>

                                                    <select
                                                        className="form-control"
                                                        name="chain_id"
                                                        value={legalIdentity}
                                                        onChange={(e) => {
                                                            setLegalIdentity(e.target.value);
                                                            setLegalIdentityError(false);
                                                        }}
                                                        style={{
                                                            height: "fit-content",
                                                            // padding: "2px",
                                                            border: "2px solid rgb(204, 204, 204)",
                                                            // paddingBottom: "1%" 
                                                        }}
                                                    >
                                                        <option value="myself">Myself</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                    {legalIdentityError && (
                                                        <Error className="input feedback">Identity is required</Error>
                                                    )}

                                                </Grid>
                                                <Grid item xs={12} md={6} lg={6}>
                                                    <label className="mt-2">Legal First Name<span className="text-danger">*</span>
                                                        <input
                                                            type="text"
                                                            value={legalFirstName}
                                                            onChange={(e) => {
                                                                setLegalFirstName(e.target.value);
                                                                if (e.target.value.length > 0) {
                                                                    setLegalFirstNameError(false);
                                                                }
                                                            }}
                                                            style={{
                                                                width: "100%",
                                                                padding: "6px 6px",
                                                                borderRadius: "5px",
                                                                border: `2px solid ${legalFirstNameError ? 'red' : '#ccc'}`,
                                                            }}
                                                        />
                                                        {legalFirstNameError && (
                                                            <Error className="input feedback">Legal First Name is required</Error>
                                                        )}
                                                    </label>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={6} >
                                                    <label>Legal Last Name<span className="text-danger">*</span>
                                                        <input
                                                            type="text"
                                                            value={legalLastName}
                                                            onChange={(e) => {
                                                                setLegalLastName(e.target.value);
                                                                if (e.target.value.length > 0) {
                                                                    setLegalLastNameError(false);
                                                                }
                                                            }}
                                                            style={{
                                                                width: "100%",
                                                                padding: "6px 6px",
                                                                borderRadius: "5px",
                                                                border: `2px solid ${legalLastNameError ? 'red' : '#ccc'}`,

                                                            }}
                                                        />
                                                        {legalLastNameError && (
                                                            <Error className="input feedback">Legal Last Name is required</Error>
                                                        )}
                                                    </label>
                                                </Grid>
                                                <Grid item xs={12} md={6} lg={6} >
                                                    <label>Email<span className="text-danger">*</span></label>
                                                    <input
                                                        type="email"
                                                        value={legalEmail}
                                                        onChange={(e) => {
                                                            setLegalEmail(e.target.value);
                                                            if (e.target.value.length > 0) {
                                                                setLegalLastEmailError(false);
                                                            }
                                                        }}
                                                        style={{
                                                            width: "100%",
                                                            padding: "6px 6px",
                                                            borderRadius: "5px",
                                                            border: `2px solid ${legalLastEmailError ? 'red' : '#ccc'}`,

                                                        }}
                                                    />
                                                    {legalLastEmailError && (
                                                        <Error className="input feedback">Email is required</Error>
                                                    )}

                                                </Grid>

                                                <Grid item xs={12} md={6} lg={6} >
                                                    <label>Phone Number<span className="text-danger">*</span></label>
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
                                                            type="tel"
                                                            placeholder="111-222-3456"
                                                            value={legalPhoneNumber}
                                                            onChange={handlePhoneNumberChange}
                                                            style={{
                                                                width: "100%",
                                                                padding: "6px 6px",
                                                                border: `2px solid ${legalLastPhoneNumberError ? 'red' : '#ccc'}`,
                                                                borderTopLeftRadius: "0px",
                                                                borderBottomLeftRadius: "0px",
                                                                borderTopRightRadius: "5px",
                                                                borderBottomRightRadius: "5px",
                                                            }}
                                                        />
                                                    </div>
                                                    {legalLastPhoneNumberError && (
                                                        <Error className="input feedback">Please enter a valid American Phone number</Error>
                                                    )}

                                                </Grid>
                                                <div
                                                    style={{
                                                        display: "grid",
                                                        gridTemplateColumns: "1fr ",
                                                        gap: "10px",
                                                    }}
                                                    hidden
                                                >
                                                    <label>Social Media Profile Link
                                                        <input
                                                            type="text"
                                                            value={legalSocailMedia}
                                                            onChange={(e) => {
                                                                setLegalSocailMedia(e.target.value);
                                                                if (e.target.value.length > 0) {
                                                                    setLegalSocailMediaError(false);
                                                                }
                                                            }}
                                                            style={{
                                                                width: "100%",
                                                                padding: "6px 6px",
                                                                borderRadius: "5px",
                                                                border: `2px solid ${legalSocailMediaError ? 'red' : '#ccc'}`,

                                                            }}
                                                        />
                                                        {legalSocailMediaError && (
                                                            <Error className="input feedback">Social Media Profile Link is required</Error>
                                                        )}
                                                    </label>
                                                </div>


                                                <Grid item xs={12} md={6} lg={6} >
                                                    <label className="mb-0">Recipient Country<span className="text-danger">*</span></label>
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
                                                            <option value='United States'>USA</option>
                                                        </select>
                                                    </div>
                                                </Grid>
                                                {legalIdentity !== 'other' && (
                                                    <>
                                                <Grid item xs={12} md={6} lg={6} >
                                                    <label>State/Province<span className="text-danger">*</span></label>
                                                    <input
                                                        type="text"
                                                        value={legalState}
                                                        onChange={(e) => {
                                                            setLegalState(e.target.value);
                                                            if (e.target.value.length > 0) {
                                                                setLegalStateError(false);
                                                            }
                                                        }}
                                                        style={{
                                                            width: "100%",
                                                            padding: "6px 6px",
                                                            borderRadius: "5px",
                                                            border: `2px solid ${legalSocailMediaError ? 'red' : '#ccc'}`,

                                                        }}
                                                    />
                                                    {legalSocailMediaError && (
                                                        <Error className="input feedback">State is required</Error>
                                                    )}


                                                </Grid>


                                                <Grid item xs={12} md={6} lg={6} >
                                                    <label>Recipient City/Town/Village<span className="text-danger">*</span></label>
                                                    <input
                                                        type="text"
                                                        value={legalCity}
                                                        onChange={(e) => {
                                                            setLegalCity(e.target.value);
                                                            if (e.target.value.length > 0) {
                                                                setLegalCityError(false);
                                                            }
                                                        }}
                                                        style={{
                                                            width: "100%",
                                                            padding: "6px 6px",
                                                            borderRadius: "5px",
                                                            border: `2px solid ${legalCityError ? 'red' : '#ccc'}`,

                                                        }}
                                                    />
                                                    {legalCityError && (
                                                        <Error className="input feedback">Recipient City is required</Error>
                                                    )}

                                                </Grid>
                                                <Grid item xs={12} md={6} lg={6} >
                                                    <label>Recipient Postal Code<span className="text-danger">*</span></label>
                                                    <input
                                                        type="text"
                                                        value={legalPostal}
                                                        onChange={(e) => {
                                                            setLegalPostal(e.target.value);
                                                            if (e.target.value.length > 0) {
                                                                setLegalPostalError(false);
                                                            }
                                                        }}
                                                        style={{
                                                            width: "100%",
                                                            padding: "6px 6px",
                                                            borderRadius: "5px",
                                                            border: `2px solid ${legalPostalError ? 'red' : '#ccc'}`,

                                                        }}
                                                    />
                                                    {legalPostalError && (
                                                        <Error className="input feedback">Recipient City is required</Error>
                                                    )}

                                                </Grid>


                                                <Grid item xs={12} md={6} lg={6} >
                                                    <label>Recipient Address<span className="text-danger">*</span></label>
                                                    <input
                                                        type="text"
                                                        value={legalAddress}
                                                        onChange={(e) => {
                                                            setLegalAddress(e.target.value);
                                                            if (e.target.value.length > 0) {
                                                                setLegalAddressError(false);
                                                            }
                                                        }}
                                                        style={{
                                                            width: "100%",
                                                            padding: "6px 6px",
                                                            borderRadius: "5px",
                                                            border: `2px solid ${legalAddressError ? 'red' : '#ccc'}`,

                                                        }}
                                                    />
                                                    {legalAddressError && (
                                                        <Error className="input feedback">Recipient Address is required</Error>
                                                    )}

                                                </Grid>
                                                </>
                                                )}
                                                {legalIdentity !== 'other' && (
  <Grid item xs={12} md={6} lg={6}>
    <label className="mb-1">
      Social Security Number<span className="text-danger">*</span>
    </label>
    <input
      type="text"
      placeholder="123-45-6789"
      value={legalSecurityNumber}
      onChange={handleSecuritynumberChange}
      style={{
        width: "100%",
        padding: "6px 6px",
        borderRadius: "5px",
        border: `2px solid ${legalSecurityNumberError || errorMessage ? 'red' : '#ccc'}`,
      }}
    />
    {legalSecurityNumberError && (
      <Error className="input feedback">Social Security number is required</Error>
    )}
    {errorMessage && <Error className="input feedback">{errorMessage}</Error>}
  </Grid>
)}

 

{legalIdentity !== 'other' && (
                                                <Grid item xs={12} md={6} lg={6}>
      <label>
        Recipient Date of Birth<span className="text-danger">*</span>
      </label>
     
      
      <input
        selected={new Date(`${legalMonth} ${legalDay} ${legalYear}`)}
        className="form-control"
        style={{
          width: '100%',
          height:'7vh'
        }}
        onChange={(event) => handleDateChange(event)}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select Date"
        type="date"
        showYearDropdown
        yearDropdownItemNumber={100}
        scrollableYearDropdown
        showMonthDropdown
        // disabled={legalIdentity === 'other'}
      />
   

      {LegalDateOfBirthError && (
        <Error className="input feedback">You must be 18 or older to proceed.</Error>
      )}
    </Grid>
    )}
    {legalIdentity !== 'other' && (
        <>
                                                <Grid item xs={12} md={12} lg={12} >
                                                    <h5 className="mb-0 mt-3">Account Details</h5>
                                                    <small style={{ textAlign: 'justify' }}>
                                                    If you do not have a Stripe account, please{' '}
    <a href="https://dashboard.stripe.com/register" target="_blank" rel="noopener noreferrer">
      create one
    </a>{' '}
    to proceed with the verification process.
                                            </small>
                                                </Grid>
                                                <Grid item xs={12} md={6} lg={6} >
                                                    <label>Stripe Account Number<span className="text-danger">*</span></label>
                                                    <input
                                                        type="text"
                                                        value={legalCheckingAccountNumber}
                                                        onChange={(e) => {
                                                            setLegalCheckingAccountNumber(e.target.value);
                                                            if (e.target.value.length > 0) {
                                                                setLegalCheckingAccountNumberError(false);
                                                            }
                                                        }}
                                                        style={{
                                                            width: "100%",
                                                            padding: "6px 6px",
                                                            borderRadius: "5px",
                                                            border: `2px solid ${legalCheckingAccountNumberError ? 'red' : '#ccc'}`,

                                                        }}
                                                    />
                                                    {legalCheckingAccountNumberError && (
                                                        <Error className="input feedback">Account Number is required</Error>
                                                    )}

                                                </Grid>
                                                </>
                                                   )}
                                              
                                              {/* <div className={legalIdentity === 'other' ? "col-lg-11 mx-auto" : ""}> */}
      {legalIdentity === 'other' && (
       <form onSubmit={saveOtherRecipientDetails} style={{ marginLeft: '3vh' }}>
     <h2> Campaign </h2>
          <Grid container spacing={1} >
            <Grid item xs={12} md={6} lg={6}>
              <label>Category</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange2}
                className="form-control"
                style={{ border: `2px solid ${categoryError ? 'red' : '#ccc'}` }}
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
              {categoryError && <Error className="input feedback">Campaign Category is required</Error>}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.subtitle}
                style={{ border: `2px solid ${titleError ? 'red' : '#ccc'}` }}
                onChange={handleChange2}
                className="form-control"
              />
              {titleError && <Error className="input feedback">Title is required</Error>}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange2}
                style={{ border: `2px solid ${descriptionError ? 'red' : '#ccc'}` }}
                className="form-control"
              />
              {descriptionError && <Error className="input feedback">Description is required</Error>}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <label>Desired Amount:</label>
              <input
                type="number"
                name="total_funding"
                value={formData.total_funding}
                style={{ border: `2px solid ${desiredAmountError ? 'red' : '#ccc'}` }}
                onChange={handleChange2}
                className="form-control"
                step="1"
              />
              {desiredAmountError && <Error className="input feedback">Desired Amount is required</Error>}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <label>Created By</label>
              <select
                name="created_by"
                value={formData.created_by}
                onChange={handleChange2}
                style={{ border: `2px solid ${createdByError ? 'red' : '#ccc'}` }}
                className="form-control"
              >
                {/* <option value="MySelf">MySelf</option> */}
                <option value="Other">Other</option>
              </select>
              {createdByError && <Error className="input feedback">Created By is required</Error>}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <label>Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange2}
                className="form-control"
              >
                <option value="United States">USA</option>
              </select>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <label>Donation To Nfuse:</label>
              <select
                name="donation_to_nfuse"
                value={formData.donation_to_nfuse}
                onChange={handleChange2}
                className="form-control"
              >
                <option value="15">15%</option>
                <option value="10">10%</option>
                <option value="5">5%</option>
                <option value="0">0%</option>
              </select>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <div className="form-group">
                <label>Select Campaign Images</label>
                <input
                  type="file"
                  onChange={(e) => MultipleFileChange(e)}
                  className="form-control"
                  style={{ border: `2px solid ${imageError ? 'red' : '#ccc'}` }}
                  multiple
                />
                {imageError && <Error className="input feedback">Campaign Images is required</Error>}
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <label>Start Date:</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange2}
                className="form-control"
                min={formattedToday}
              />
              {startDateError && <Error className="input feedback">Start Date is required</Error>}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <label>End Date:</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange2}
                className="form-control"
              />
              {endDateError && <Error className="input feedback">End Date is required</Error>}
            </Grid>
            {/* <Grid item xs={12}>
              <button type="submit" className="btn btn-primary mb-5">
                Create Campaign
              </button>
            </Grid> */}
          </Grid>
        </form>
      )}
    {/* </div> */}
                                            </Grid>
                                        </form>
                                                <Grid item xs={12} md={6} lg={12} >
                                                    <div
                                                        className="btn btn-primary btn-block p-2 mx-auto "
                                                        onClick={() => {
                                                            if (legalIdentity === 'other') {
                                                              // Call the function for 'other' identity
                                                              saveOtherRecipientDetails();
                                                            } else {
                                                              // Call the default function
                                                              saveRecipientDetails();
                                                            }
                                                          }}
                                                    >
                                                        Save Recipient Details
                                                    </div>

                                                </Grid>
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

const Error = styled.div`
 
color: #e66e6e;
padding: 2px 0px;
font-size: 12px;
cursor:none;
`;