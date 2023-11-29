import React,{useState, useEffect,} from 'react';
import {  Route, Routes, Outlet  } from 'react-router-dom';

import ScrollToTop from './../layouts/ScrollToTop';
import Header from './../layouts/Header';
import Footer from './../layouts/Footer';
import Home from './Home';
import Home2 from './Home2';
import MyRequests from './MyRequests';
import MyDonations from './MyDonations';
import RecivedDonations from './RecivedDonations';
import Home3 from './Home3';
import AboutUs from './AboutUs';
import Dashboard from './Dashboard';
import Volunteer from './Volunteer';
import BecomeVolunteer from './BecomeVolunteer';
import Faq from './Faq';
import Certificates from './Certificates';
import AskQuestion from './AskQuestion';
import HappyClients from './HappyClients';
import HowItWorks from './HowItWorks';
import Mission from './Mission';
import TermsCondition from './TermsCondition';
import Error from './Error';
import UnderMaintenance from './UnderMaintenance';
import ComingSoon from './ComingSoon';
import BrowseFundraiser from './BrowseFundraiser';
import BecomeFundraiser from './BecomeFundraiser';
import FundraiserDetail from './FundraiserDetail';
import Project from './Project';
import Privacy from './Privacy';
import ProjectCategories from './ProjectCategories';
import ProjectSidebar from './ProjectSidebar';
import ProjectStory from './ProjectStory';
import Blog from './Blog';
import BlogGrid from './BlogGrid';
import BlogList from './BlogList';
import BlogDetails from './BlogDetails';
import BlogDetails1 from './BlogDetails1';
import ContactUs from './ContactUs';
import ForgotPassword from './ForgotPassword';
import Header2 from '../layouts/Header2';
import CreateCompaign from './CreateCompaign';
import MyProjects from './MyProjects';
import Setting from '../pages/Settings/Setting';
import Logout from './Logout';
import WalletAddress from './WalletAddress';
import EditCampaign from './EditCampaign';
import MyBalance from './MyBalance';

function Index(){
	return(
		<>
			<Routes>
				<Route path='/error-404' exact element={<Error />} />
				<Route path='/under-maintenance' exact element={<UnderMaintenance />} /> 
				<Route path='/coming-soon' exact element={<ComingSoon />} />
				<Route path='/index-2' exact element={<Home2 />} />
				<Route path='/' exact element={<Home3 />} />
				<Route path='/forgot-password/:token' exact element={<ForgotPassword />} />
				<Route  element={<MainLayout />} > 
					<Route path='/' exact element={<Home />} />
					<Route path='/about-us' exact element={<AboutUs />} />
					<Route path='/my-dashboard' exact element={<Dashboard />} />
					<Route path='/volunteer' exact element={<Volunteer />} />
					<Route path='/become-a-volunteer' exact element={<BecomeVolunteer />} />
					<Route path='/faq' exact element={<Faq />} />
					<Route path='/certificates' exact element={<Certificates />} />
					<Route path='/ask-a-question' exact element={<AskQuestion />} />
					<Route path='/happy-clients' exact element={<HappyClients />} />
					<Route path='/how-it-works' exact element={<HowItWorks />} />
					<Route path='/mission' exact element={<Mission />} />
					<Route path='/privacy-policy' exact element={<Privacy />} />
					<Route path='/terms-and-condition' exact element={<TermsCondition />} />
					<Route path='/browse-fundraiser' exact element={<BrowseFundraiser />} />
					<Route path='/become-a-fundraiser' exact element={<BecomeFundraiser />} />
					<Route path='/fundraiser-detail' element={<FundraiserDetail />} />
					<Route path='/fundraiser-detail/:id' element={<FundraiserDetail />} />
					<Route path='/create-compaign' exact element={<CreateCompaign />} />
					<Route path='/Edit-compaign/:id' exact element={<EditCampaign />} />
					<Route path='/campaigns' exact element={<Project />} />
					<Route path='/project-categories' exact element={<ProjectCategories />} />
					<Route path='/my-campaigns' exact element={<MyProjects />} />
					<Route path='/project-sidebar' exact element={<ProjectSidebar />} />
					<Route path='/project-story' exact element={<ProjectStory />} />
					<Route path='/blog' exact element={<Blog />} />
					<Route path='/profile-setting' exact element={<Setting/>} />
					<Route path='/logout' exact element={<Logout />} />
					<Route path='/blog-grid' exact element={<BlogGrid />} />
					<Route path='/wallet-address' exact element={<WalletAddress />} />
					<Route path='/my-requests' exact element={<MyRequests />} />
					<Route path='/donations' exact element={<MyDonations />} />
					<Route path='/received-donations' exact element={<RecivedDonations />} />
					<Route path='/my-balance' exact element={<MyBalance />} />
					<Route path='/blog-list' exact element={<BlogList />} />
					<Route path='/blog-details' exact element={<BlogDetails />} />
					<Route path='/blog-details1' exact element={<BlogDetails1 />} />
					<Route path='/contact-us' exact element={<ContactUs />} />
				</Route>
			</Routes>	
			<ScrollToTop />
		</>
		 		
	)
} 

function MainLayout(){
	const [isLoggedIn, setIsLoggedIn] = useState(false);
   
    useEffect(() => {
        const intervalId = setInterval(() => {
          const storedValue = localStorage.getItem('isLoggedIn');
          const isUserLoggedIn = Boolean(storedValue);
          setIsLoggedIn(isUserLoggedIn);
    
          
          if (isUserLoggedIn) {
            clearInterval(intervalId);
          }
        }, 1000); 
    
      
        return () => clearInterval(intervalId);
      }, []);
	return (
		<div className="page-wraper">
		      {isLoggedIn ? (
        <Header2 changeStyle="header-transparent" changeLogo={true} />
      ) : (
        <Header changeStyle="header-transparent" changeLogo={true} />
      )}  
			<Outlet /> 
			<Footer />
		</div>
	)
  
  };
export default Index;