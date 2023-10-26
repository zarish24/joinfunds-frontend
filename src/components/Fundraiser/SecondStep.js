import React from 'react';

const SecondStep = () => {
    return (
        <>
            <div id="wizard_Service" className="tab-pane" role="tabpanel">
                <h4 className="title">What's your name?</h4>
                <div className="row sp15">
                    <div className="col-md-6">
                        <label className="form-label">First Name</label>
                        <div className="input-group">
                            <input name="dzName" required="" type="text" className="form-control" placeholder="First Name" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Last Name</label>
                        <div className="input-group">
                            <input name="dzName" required="" type="text" className="form-control" placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Phone Number</label>
                        <div className="input-group">
                            <input name="dzPhoneNumber" required="" type="text" className="form-control" placeholder="832141251" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Email address</label>
                        <div className="input-group">
                            <input name="dzEmail" required="" type="text" className="form-control" placeholder="marseloque@mail.com" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SecondStep;