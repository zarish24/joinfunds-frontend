import React,{useState} from 'react';
import { Stepper, Step } from 'react-form-stepper';

//components
import PageBanner from '../layouts/PageBanner';
import FirstStep from '../components/Fundraiser/FirstStep';
import SecondStep from '../components/Fundraiser/SecondStep';
import ThirdStep from '../components/Fundraiser/ThirdStep';
import FourthStep from '../components/Fundraiser/FourthStep';

//images
import bg from '../assets/images/banner/bnr3.jpg';
import bg2 from '../assets/images/background/bg4.jpg';

const BecomeFundraiser = () => {
    const [goSteps, setGoSteps] = useState(0);
    return (
        <>
            <div className="page-content bg-white">
                <PageBanner maintitle="Fundraiser" pagetitle="Become A Fundraiser" background={bg}/>
                <section className="content-inner-1 section-pattren1 overlay-white-dark" style={{backgroundImage:"url("+ bg2 +")", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className="form-wrapper overflow-hidden">                                    
                                    <div className="form-wizard dz-form-step">
                                        <Stepper className="nav nav-wizard" activeStep={goSteps} label={false}>
                                            <Step  className="nav-link" onClick={() => setGoSteps(0)} />
                                            <Step  className="nav-link" onClick={() => setGoSteps(1)} />
                                            <Step  className="nav-link" onClick={() => setGoSteps(2)} />
                                            <Step  className="nav-link" onClick={() => setGoSteps(3)} />
                                        </Stepper>
										{goSteps === 0 && (
											<>
												<FirstStep />	
												<div className="text-end toolbar toolbar-bottom p-2">
													<button  className="btn sw-btn-next sw-btn ms-1npm" onClick={() => setGoSteps(1)}>Next</button>
												</div>	
											</>
										)}
										{goSteps === 1 && (
											<>
												<SecondStep />
												<div className="text-end toolbar toolbar-bottom p-2">
													<button  className="btn sw-btn-prev sw-btn me-1" onClick={() => setGoSteps(0)}>Previous</button>
													<button className="btn sw-btn-next sw-btn ms-1" onClick={() => setGoSteps(2)}>Next</button>
												</div>	
											</>
										)}
										{goSteps === 2 && (
											<>
												<ThirdStep />
												<div className="text-end toolbar toolbar-bottom p-2">
													<button  className="btn sw-btn-prev sw-btn me-1" onClick={() => setGoSteps(1)}>Previous</button>
													<button className="btn sw-btn-next sw-btn ms-1"  onClick={() => setGoSteps(3)}>Next</button>
												</div>	
											</>
										)}
										{goSteps === 3 && (
											<>
												<FourthStep />
												<div className="text-end toolbar toolbar-bottom p-2">
													<button  className="btn sw-btn-prev sw-btn me-1" onClick={() => setGoSteps(2)}>Previous</button>
													<button className="btn sw-btn-next sw-btn ms-1"  onClick={() => setGoSteps(4)}>Submit</button>
												</div>	
											</>	
										)}
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>   
        </>
    );
};

export default BecomeFundraiser;