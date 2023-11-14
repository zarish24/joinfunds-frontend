import React,{useState, useEffect, useReducer} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import {MenuListArray2} from './Menu';

import logo from './../assets/images/logo.png';

const Header = () => {

    //form submit
    const nav = useNavigate();
    const formSubmit = (e) => {
        e.prevantDefault();
        nav("/");
    }

    /* for sticky header */
	const [headerFix, setheaderFix] = React.useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			setheaderFix(window.scrollY > 50);
		});
	}, []); 

    //Modal
    const [loginModal, setloginModal] = useState(false);
    const [resetModal, setResetModal] = useState(false);
    const [signupModal, setSignupModal] = useState(false);
    //Modals end

    const [sidebarOpen, setSidebarOpen] = useState(false);	
    
    useEffect(() => {
		var mainMenu = document.getElementById('OpenMenu'); 
		if(mainMenu){
			if(sidebarOpen){
				mainMenu.classList.add('show');
			}else{
				mainMenu.classList.remove('show');
			}
		}	
	});
	
	// Menu dropdown list 
    const reducer = (previousState, updatedState) => ({
        ...previousState,
        ...updatedState,
    });
    const initialState = {
        active : "",
        activeSubmenu : "",
    }
    const [state, setState] = useReducer(reducer, initialState);
	const handleMenuActive = status => {		
        setState({active : status});		
            if(state.active === status){			
          setState({active : ""});
        }
    }
    const handleSubmenuActive = (status) => {		
        setState({activeSubmenu : status})
        if(state.activeSubmenu === status){
            setState({activeSubmenu : ""})                
        }    
    }
    //let path = window.location.pathname;
	// Menu dropdown list End
    return (
        <>
            <header className="site-header mo-left header style-1">
                <div className="top-bar">
                    <div className="container">
                        <div className="dz-topbar-inner d-flex justify-content-between align-items-center">
                            <div className="dz-topbar-left">
                                <ul>
                                    <li>Welcome to Nfu$e, Crowdfunding & Charity Agency</li>
                                    <li>
                                        <Link to={"#"} className="badge badge-primary btn-login" data-bs-toggle="modal" data-bs-target="#modalLogin" 
                                            onClick={()=>setloginModal(true)}
                                        >
                                            <i className="flaticon-logout me-2" ></i>Login / Sign Up
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="dz-topbar-right">
                                <ul>
                                    <li><i className="fas fa-map-marker-alt"></i> 394-091-3312</li>
                                    <li><i className="fas fa-envelope"></i>support@Nfu$e.com</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`sticky-header main-bar-wraper navbar-expand-lg ${headerFix ? "is-fixed" : ""}`}>
                    <div className="main-bar clearfix ">
                        <div className="container clearfix">
                            <div className="logo-header mostion logo-dark">
                                <Link to={"/"}><img src={logo} alt="" /></Link>
                            </div>                        
                            <button                                 
                                className={`navbar-toggler navicon justify-content-end ${sidebarOpen ? 'open' : 'collapsed' }`}
                                type="button"
                                onClick={()=>setSidebarOpen(!sidebarOpen)}
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                            <div className="extra-nav">
                                <div className="extra-cell">
                                    <Link to={"/contact-us"} className="btn btn-outline-secondary btnhover1">
                                        <i className="fa-solid fa-user"></i>
                                        <span className="m-l10">My Account</span>
                                    </Link>
                                </div>
                            </div>
                            <div 
                                className={`header-nav navbar-collapse collapse justify-content-end ${sidebarOpen ? "show" : ""}`}
                                id="navbarNavDropdown"
                            >
                                <div className="logo-header logo-dark">
                                    <Link to={"/"}><img src={logo} alt="" /></Link>
                                </div>
                                <ul className="nav navbar-nav navbar navbar-left">
                                <li><Link to={"/index-3"}>Home</Link></li>
                                    {MenuListArray2.map((data, index)=>{
                                        let menuClass = data.classChange;
                                        if(menuClass !== "sub-menu-down"){
                                            return(
                                                <li className={menuClass}  key={index} ><Link to={data.to}>{data.title}</Link></li>
                                            )
                                        }else{
                                            return(				
                                                <li className={`${menuClass} ${ state.active === data.title ? 'open' : ''}`}
                                                    key={index} 
                                                >
                                                
                                                    {data.content && data.content.length > 0 ?
                                                        <Link to={"#"}                                                       
                                                            onClick={() => {handleMenuActive(data.title)}}
                                                        >				
                                                            {data.title}
                                                        </Link>
                                                    :
                                                        <Link  to={data.to} > 
                                                            {data.title}                                                        
                                                        </Link>
                                                    }
                                                    <Collapse in={state.active === data.title ? true :false}>
                                                        <ul className={`sub-menu ${menuClass === "mm-collapse" ? "open" : ""}`}>
                                                            {data.content && data.content.map((data,index) => {									
                                                                return(	
                                                                    <li key={index}
                                                                        className={`${ state.activeSubmenu === data.title ? "open" : ""}`}  
                                                                    >
                                                                    {data.content && data.content.length > 0 ?
                                                                        <>
                                                                            <Link to={data.to} 
                                                                                onClick={() => { handleSubmenuActive(data.title)}}
                                                                            >
                                                                                {data.title}
                                                                                <i className="fa fa-angle-right" />
                                                                            </Link>
                                                                            <Collapse in={state.activeSubmenu === data.title ? true :false}>
                                                                                <ul className={`sub-menu ${menuClass === "mm-collapse" ? "open" : ""}`}>
                                                                                    {data.content && data.content.map((data,index) => {
                                                                                        return(	
                                                                                        <>
                                                                                            <li key={index}>
                                                                                                <Link  to={data.to}>{data.title}</Link>
                                                                                            </li>
                                                                                        </>
                                                                                        )
                                                                                    })}
                                                                                </ul>
                                                                            </Collapse>
                                                                        </>
                                                                        :
                                                                        <Link to={data.to}>
                                                                            {data.title}
                                                                        </Link>
                                                                    }
                                                                    
                                                                    </li>
                                                                
                                                                )
                                                            })}
                                                        </ul>
                                                    </Collapse>
                                                </li>	
                                            )
                                        }
                                    })}     
                                </ul>
                                <div className="header-bottom">
                                    <Link to={"#"} className="btn btn-light btn-login btn-sm"  data-bs-target="#modalLogin"
                                        onClick={()=>setloginModal(true)}
                                    >
                                        <i className="flaticon-logout me-3"></i>Login / Sign Up
                                    </Link>
                                    <div className="dz-social-icon">
                                        <ul>
                                            <li><a className="fab fa-facebook-f" href="https://www.facebook.com/"  target="_blank" rel="noreferrer"></a></li>
                                            {" "}<li><a className="fab fa-twitter" href="https://twitter.com/" target="_blank" rel="noreferrer"></a></li>
                                            {" "}<li><a className="fab fa-linkedin-in" href="https://www.linkedin.com/" target="_blank" rel="noreferrer"></a></li>
                                            {" "}<li><a className="fab fa-instagram" href="https://www.instagram.com/" target="_blank" rel="noreferrer"></a></li>
                                        </ul>
                                    </div>	
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </header> 
            <Modal className="fade modal-wrapper auth-modal" id="modalLogin" show={loginModal} onHide={setloginModal} centered>               
                <h2 className="title">Login Your Account</h2>
                <form onSubmit={(e)=>formSubmit(e)}>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email Address" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" />
                        <div className="reset-password">
                            <Link to={"#"} className="btn-link collapsed"                                  
                                onClick={()=>(setResetModal(true),setloginModal(false))}
                            >Reset password?</Link>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-outline-primary btn-block">Login</button>
                    </div>
                    <div className="form-group">
                        <Link to={"#"} className="btn facebook btn-block"><i className="fa-brands fa-facebook-f m-r10"></i>Log in with Facebook</Link>
                    </div>
                    <div className="form-group">
                        <Link to={"#"} className="btn google-plus btn-block"><i className="fa-brands fa-google m-r10"></i>Log in with Google</Link>
                    </div>
                    <div className="sign-text">
                        <span>Don't have a Crowdfunding account? 
                            <Link to={"#"} className="btn-link collapsed" 
                                onClick={()=>(setSignupModal(true),setloginModal(false))}
                            > Sign up</Link>
                        </span>
                    </div>
                </form>                
            </Modal>
            <Modal className="modal fade modal-wrapper auth-modal"  show={resetModal} onHide={setResetModal} centered>
                <div  className="reset-password" id="reset-password">
                    <h2 className="title">Reset password?</h2>
                    <form onSubmit={(e)=>formSubmit(e)}>
                        <div className="form-group password-icon-bx">
                            <i className="fa fa-lock"></i>
                            <p>Enter your email address associated with your account, and we'll email you a link to reset your password...</p>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Enter email address" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-outline-primary btn-block">Send reset link</button>
                        </div>
                        <Link to={"#"} className="sign-text d-block" data-bs-toggle="collapse" 
                            onClick={()=>(setResetModal(false),setloginModal(true))}
                            >Back
                        </Link>
                    </form>
                </div>  
            </Modal>
            <Modal className="modal fade modal-wrapper auth-modal"  show={signupModal} onHide={setSignupModal} centered>               
                <h2 className="title">Sign Up Your Account</h2>
                <form onSubmit={(e)=>formSubmit(e)}>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email Address" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-outline-primary btn-block">Sign Up</button>
                    </div>
                    <div className="form-group">
                        <Link to={"#"} className="btn facebook btn-block"><i className="fa-brands fa-facebook-f m-r10"></i>Log in with Facebook</Link>
                    </div>
                    <div className="form-group">
                        <Link to={"#"} className="btn google-plus btn-block"><i className="fa-brands fa-google m-r10"></i>Log in with Google</Link>
                    </div>
                    <div className="sign-text">
                        <span>Don't have a Crowdfunding account? <Link to={"#"} className="btn-link collapsed" 
                            onClick={()=>(setSignupModal(false),setloginModal(true))}
                        >Login</Link></span>
                    </div>
                </form>                
            </Modal>
        </>
    );
};


export default Header;