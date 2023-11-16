import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const PayOutModal = ({ isOpen, closeModal ,campaignId}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  console.log('campaignId:', campaignId);
  console.log('closeModal:', closeModal);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
   
    if (!email || !firstName || !lastName || !cardNumber || !expiryDate || !cvc || !nameOnCard || !postalCode || !country) {
      alert('Please fill in all required fields.');
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
const  setToken=user?.token;
   
    const payload = {
        email:email,
      firstName:firstName,
      lastName:lastName,
      accountId:cardNumber,
      campaign_id:campaignId,
      amount:nameOnCard,
      postalCode: postalCode,
      country:country,
    };
  
    try {
     
      const response = await fetch('http://44.219.245.56/api/payments/makePayoutRequest', {
        method: 'POST',
        headers: {
          'Content-Type': setToken,
          
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Failed to make payout request');
      }
  
      
      const responseData = await response.json();
      console.log('API Response:', responseData);
  
      setEmail('');
      setFirstName('');
      setLastName('');
      setCardNumber('');
      setExpiryDate('');
      setCvc('');
      setNameOnCard('');
      setPostalCode('');
      setCountry('');
  
      
      closeModal();
    } catch (error) {
      console.error('Error making payout request:', error.message);
      
    }
  };
  

  return (
    <Modal
     
      show={isOpen}
      onHide={closeModal}
      
      contentLabel="Credit Card Form Modal"
      className="fade modal"
      
      centered
    >
       <div className="modal-content">
       <Modal.Header  closeButton>
  <div className="row">
    <div className="col-lg-12 d-flex">
      <h5 className="">Add account Details</h5>
      <button type="button" className="btn-close" onClick={closeModal}>
        <i className="flaticon-close" style={{ color: 'black' }}></i>
      </button>
    </div>
    <div className="col-auto">
  <p className="m-0">
    INTL PMT support needs to reflect US and Canadian bank accounts are the only accounts that can receive funds at this time
  </p>
</div>
  </div>
 
</Modal.Header>
                <Modal.Body className="modal-body">
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr ', gap: '10px' }}>
    <label>
      Email:
      <input
        type="email"
        value={email}
        style={{
            width: '100%',
            padding: '4px', 
            borderRadius: '5px', 
            border: '2px solid #ccc', 
          }}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </label>
  </div>

  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
    <label>
      First Name:
      <input
        type="text"
        value={firstName}
        style={{
           
            padding: '4px', 
            borderRadius: '5px', 
            border: '2px solid #ccc', 
          }}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
    </label>

    <label>
      Last Name:
      <input
        type="text"
        style={{
           
            padding: '4px', 
            borderRadius: '5px', 
            border: '2px solid #ccc', 
          }}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
    </label>
  </div>

  <div style={{ display: 'grid', gridTemplateColumns: '1fr ', gap: '10px' }}>
    <label>
      Account Number:
      <input
        type="text"
        value={cardNumber}
        style={{
            width: '100%',
            padding: '4px', 
            borderRadius: '5px', 
            border: '2px solid #ccc', 
          }}
        onChange={(e) => setCardNumber(e.target.value)}
        required
      />
    </label>

    {/* <label>
      Expiry Date (MM/YY):
      <input
        type="text"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        required
      />
    </label>

    <label>
      CVV:
      <input
        type="text"
        value={cvc}
        onChange={(e) => setCvc(e.target.value)}
        required
      />
    </label> */}
  </div>

  <div style={{ display: 'grid', gridTemplateColumns: '1fr ', gap: '10px' }}>
  <label>
  Amount:
  <input
    type="number"
    style={{
      width: '100%',
      padding: '4px',
      borderRadius: '5px',
      border: '2px solid #ccc',
    }}
    value={nameOnCard}
    onChange={(e) => {
      // Ensure only numeric values are allowed
      const value = e.target.value.replace(/[^0-9]/g, '');
      setNameOnCard(value);
    }}
    onInput={(e) => {
      // Ensure the minimum value is 0
      if (e.target.value < 0) {
        e.target.value = 0;
        setNameOnCard('0');
      }
    }}
    min="0"
    required
  />
</label>
  </div>

  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
  <label>
      Country:
      <select
        value={country}
        style={{
           
            padding: '4px', 
            borderRadius: '5px', 
            border: '2px solid #ccc', 
          }}
        onChange={(e) => setCountry(e.target.value)}
        required
      >
        <option value="" disabled>Select a country</option>
        <option value="USA">United States</option>
        <option value="CAN">Canada</option>
        {/* Add more country options as needed */}
      </select>
    </label>
    <label>
      Postal Code:
      <input
        type="text"
        value={postalCode}
        style={{
           
            padding: '4px', 
            borderRadius: '5px', 
            border: '2px solid #ccc', 
          }}
        onChange={(e) => setPostalCode(e.target.value)}
        required
      />
    </label>

    
  </div>

  <button class="btn btn-info" type="submit" style={{ marginTop: '10px' }}>
  Submit 
</button>
</form>
    </Modal.Body>
    </div>
       
    </Modal>
  );
};

export default PayOutModal;
