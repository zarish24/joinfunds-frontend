import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import avat5 from "../assets/images/avatar/avatar5.jpg";

const DonorCard = ({ donor }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
      }}
    >
      <img
        src={donor?.profileImage ? donor.profileImage : avat5}
        alt=""
        style={{
          height: 80,
          width: 80,
          borderRadius: '50%',
        }}
      />
      <Typography variant="subtitle1">
        {donor.firstName} {donor.lastName}
      </Typography>
      <Typography variant="body1">${donor.donated_amount}</Typography>
    </Box>
  );
};

export default DonorCard;
