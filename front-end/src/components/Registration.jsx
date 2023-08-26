import React, { useState } from 'react';
import axios from 'axios';

function Registration({auth}) {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    image: '',
    phoneNumber: '',
    city: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistration = async (event) => {
    event.preventDefault(); // Prevent form submission to avoid page reload

    try {
      const response = await axios.post('http://localhost:5000/user', userData);
      console.log('User registered:', response.data);
      // You can redirect or perform other actions after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
    }
    auth()
  }

  return (
    <div>
      <h2 >Sign Up</h2>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={userData.image}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={userData.city}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleRegistration}>Sign Up</button>
      </form>
    </div>
  );
}

export default Registration;
