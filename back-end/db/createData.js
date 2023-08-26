const { Blog } = require('./model/Blog');
const { User } = require('./model/user');

async function createData() {
  try {
    // Create a new user
    const newUser = await User.create({
      username: 'john_doe',
      email: 'john@example.com',
      password: 'hashed_password',
      image: 'profile.jpg',
      phoneNumber: '123-456-7890',
      city: 'New York',
    });

    // Create a new blog post
    const newBlog = await Blog.create({
      title: 'My Blog Post',
      body: 'This is the content of my blog post...',
      image: 'blog_image.jpg',
      date: new Date(),
      creator: newUser._id,
    });

    console.log('User:', newUser);
    console.log('Blog:', newBlog);
  } catch (error) {
    throw error;
  }
}

module.exports = createData;
