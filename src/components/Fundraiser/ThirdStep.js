import React from 'react';

const ThirdStep = () => {
    return (
        <>
            <div id="wizard_contact" className="tab-pane" role="tabpanel">
                <h4 className="title">Your initial target</h4>
                <div className="row sp15">
                    <div className="col-md-12">
                        <div className="form-group mb-0 row style-1 align-items-center">
                            <label className="form-label">Amount</label>
                            <div className="input-group">
                                <input type="number" className="form-control" placeholder="Amount" />
                            </div>
                        </div>
                    </div>
                </div>
                <p>Bear in mind that transaction fees, including credit and debit charges, are deducted from each donation.</p>
                <div className="target-bx bg-grey">
                    <p>To receive money raised, please make sure:</p>
                    <ol>
                        <li>A passport or an Australian driving licence</li>
                        <li>A bank account in Australia</li>
                        <li>A postal address in Australia</li>
                    </ol>
                </div>
            </div>
        </>
    );
};

export default ThirdStep;