import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  // Simulate a delayed logout action
  const handleLogout = () => {
    // setLoggingOut(true);
    // setTimeout(() => {
      localStorage.clear();
      navigate('/index-3'); // Navigate to the '/login' route
    // }, 2000); // Delay for 2 seconds (you can adjust the time)
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div>
      {/* {loggingOut ? (
        <div>
          <h2>Logging Out...</h2>
          <p>Thank you for using our platform. You will be logged out shortly.</p>
        </div>
      ) : (
        <h2>Logging Out...</h2>
      )} */}
    </div>
  );
};

export default Logout;
