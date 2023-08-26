import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Don't forget to import axios

const ProfileDetails = ({user}) => {
   // Initialize userData as an empty object

  return (
    <div className="profile-left">
      <div className="profile-picture">
        <img src={user.image} alt="ProfilePicture" />
      </div>
      <div className="bio">
        <h2>{user.username }</h2>
        <p>Phone Number: {user.phoneNumber }</p>
        <p>City: {user.city}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;