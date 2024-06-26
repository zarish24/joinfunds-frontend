import React from 'react';
import {Link} from 'react-router-dom';

import FooterCommonData from './FooterCommonData';

import logo from './../assets/images/logo-white.png';
import shape7 from './../assets/images/pattern/shape7.png';
import shape8 from './../assets/images/pattern/shape8.png';
import shape9 from './../assets/images/pattern/shape9.png';
import {IMAGES} from '../constant/theme';

const Footer = () => {
    return (
        <>
            <footer className="site-footer style-1" id="footer">
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            {/* <FooterCommonData logoImage={logo} /> */}
                            <FooterCommonData logoImage={IMAGES.logoWhite3} style={{ height: '90px', width: '112px' }} iconStyle={true}/>
                        </div>
                    </div>
                    <img hidden src={shape7} className="shape-1 move-2" alt="shape" />
                    <img hidden src={shape8} className="shape-2 move-2" alt="shape" />
                    <img hidden src={shape9} className="shape-3 move-2" alt="shape" />
                    
                </div>               
                <div className="footer-bottom">
                    <div className="container">
                        <div className="text-center"> 
                            <span className="copyright-text" style={{
                               color: 'rgba(255, 255, 255, 0.5)' 
                            }}>Copyright © 2023 <a href="/" target="_blank" rel="noreferrer">Nfuse</a>. All rights reserved.&nbsp;&nbsp;Powered By <a href="https://solususa.com/" target="_blank" rel="noreferrer">Solususa.</a></span> 
                        </div>
                    </div>
                </div>
            </footer>  
        </>
    );
};


export default Footer;