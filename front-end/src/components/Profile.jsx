import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileDetails from './ProfileDetails.jsx';

const Profile = ({ currentuser }) => {
  const [user, setUser] = useState({});
  const [blog, setBlog] = useState([]);
  const [bio, setBio] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newImage, setNewImage] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedBody, setUpdatedBody] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  console.log("in profile", currentuser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/blog/user/${currentuser._id}`);
        const userData = response.data;
        setBlog(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateBlog = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/blog', {
        title: newTitle,
        body: newBody,
        image: newImage,
        creator: currentuser._id
      });
      const newBlog = response.data;
      setBlog([...blog, newBlog]);
      setNewTitle("");
      setNewBody("");
      setNewImage("");
    } catch (error) {
      console.error('Error creating new blog:', error);
    }
  };
  
  const handleDeleteBlog = async (blogId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/blog/${blogId}`);
      const updatedBlogList = blog.filter(e => e._id !== blogId);
      setBlog(updatedBlogList);
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };
  
  const handleUpdateBlog = (blogToUpdate) => {
    setUpdatedTitle(blogToUpdate.title);
    setUpdatedBody(blogToUpdate.body);
    setUpdatedImage(blogToUpdate.image);
    setIsUpdating(blogToUpdate._id); // Store the blog ID that is being updated
  };
  
  const handleUpdateSubmit = async (event, blogId) => { // Accept blogId parameter
    event.preventDefault();
  console.log("id",blogId);
    try {
      const response = await axios.put(`http://127.0.0.1:5000/blog/${blogId}`, {
        title: updatedTitle,
        body: updatedBody,
        image: updatedImage
      });
  
      const updatedBlog = response.data;
      const updatedBlogList = blog.map(e => (e._id === updatedBlog._id ? updatedBlog : e));
  
      setBlog(updatedBlogList);
      setIsUpdating(false); // Clear the isUpdating state
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };
  
    
  return (
    <div className="profile-container">
      <ProfileDetails user={currentuser} />
        
      <div className='wall'>
        <div className="feed">
          <div className="shared-content">
            <h3>Shared Content</h3>
              
            {blog.map(e => (
              <div className="share-main" key={e._id}>
                <img className='share-pic' src={e.image} alt="Photo Icon" />
                <div className='share-wrapper'>
                  {isUpdating === e._id ? (
                   <form onSubmit={(event) => handleUpdateSubmit(event, e._id)}>
            

                      <input
                        type="text"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                      />
                      <textarea
                        value={updatedBody}
                        onChange={(e) => setUpdatedBody(e.target.value)}
                      />
                      <input
                        type="text"
                        value={updatedImage}
                        onChange={(e) => setUpdatedImage(e.target.value)}
                      />
                      <button type="submit">Save</button>
                      <button onClick={() => setIsUpdating(false)}>Cancel</button>
                    </form>
                  ) : (
                    <>
                      <p className= 'share-title'>{e.title}</p>
                      <p className='share-body'>{e.body}</p>
                      <button className="noselect" onClick={() => handleDeleteBlog(e._id)}><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                      <button className="noselect" id ="other" onClick={() => handleUpdateBlog(e)}><span class="text">Updated</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fill="currentColor" fill-rule="evenodd" d="M17.586 2a2 2 0 0 1 2.828 0L22 3.586a2 2 0 0 1 0 2.828L20.414 8 16 3.586 17.586 2zm-3 3-5 5A2 2 0 0 0 9 11.414V13a2 2 0 0 0 2 2h1.586A2 2 0 0 0 14 14.414l5-5L14.586 5z" clip-rule="evenodd"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 14H5a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h14a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-4"/></svg></span></button>

                      <hr/>
                    </>
                  )}
                </div>
                <p className= 'share-date'>{e.date}</p>
              </div>
            ))}
            <div className="new-blog-form">
              <h3>Create a New Blog</h3>
              <input
                type="text"
                placeholder="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                placeholder="Body"
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
              />
              <button onClick={handleCreateBlog}>Post Blog</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
