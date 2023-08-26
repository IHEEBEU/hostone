import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UsersView({ fol }) {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/user');
        setUsers(response.data);
        console.log("we talk bt",response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleUserClick = async (userId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/blog/user/${userId}`);
      const userData = users.find(user => user.id === userId);
      fol( response.data ); 
    } catch (error) {
      console.error('Error fetching user blogs:', error);
    }
  };

  return (
    <div className='main-users'>
      <p className='dot-users'>.</p>
      {users.map(user => (
        <div key={user.id} className="one-user">
          <p className='one-name'>{user.username}</p>
          <div>
            <img className='one-pic' src={user.image} alt={user.username} />
          </div>
          <button className="Btn" onClick={() => handleUserClick(user._id)}>
            FOLLOW
            <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path>
        </button>
       </div>
      ))}
    </div>
  );
}

export default UsersView;
