import React,{useState} from 'react';
import {Dropdown} from 'react-bootstrap';

const inputBlog = [
    {title:"Animal"},{title:"Business"},{title:"Community"},
    {title:"Creative"},{title:"Education"},{title:"Emergencies"},
    {title:"Environment"},{title:"Events"},{title:"Faith"},
    {title:"Family"},{title:"Funeral & Memorial"},{title:"Medical"},
    {title:"Other"},{title:"Sports"},{title:"Travel"},
];

const FirstStep = () => {
    const [dropbtn,setDropbtn] = useState('India');
    return (
        <>
            <div id="wizard_Time" className="tab-pane" role="tabpanel">
                <h4 className="title">Where are you located? </h4>
                <div className="row sp15">
                    <div className="col-md-6">
                        <label className="form-label">Country</label>                        
                        <Dropdown className="select-drop">
                            <Dropdown.Toggle as="div" className="i-false select-drop-btn">
                                <span>{dropbtn}</span>
                                <i className="fa-regular fa-angle-down"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>setDropbtn('India')}>India</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setDropbtn('United Kingdom')}>United Kingdom</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setDropbtn('United State Of America')}>United State Of America</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setDropbtn('Japan')}>Japan</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setDropbtn('England')}>England</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setDropbtn('Russia')}>Russia</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Postcode</label>
                        <div className="input-group">
                            <input name="dzName" required="" type="text" className="form-control" placeholder="324009" />
                        </div>
                    </div>
                </div>
                <div className="tag-donate style-1">
                    {inputBlog.map((data,index)=>(
                        <div className="donate-categories" key={index}>
                            <div className="form-check" >
                                <input className="form-check-input" type="checkbox" value="" id={`flexCheckDefault${index+1}`} />
                                <label className="form-check-label" htmlFor={`flexCheckDefault${index+1}`}>
                                    <span>{data.title}</span>
                                </label>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
            
        </>
    );
};

export default FirstStep;