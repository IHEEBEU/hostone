const { Blog } = require('../model/Blog');

async function createBlog(req, res) {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getBlogs(req, res) {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getBlogById(req, res) {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateBlog(req, res) {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteBlog(req, res) {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
async function getBlogsByUser(req, res) {
  const userId = req.params.userId;
  try {
    const blogs = await Blog.find({ creator: userId });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching blogs.' });
  }
}


module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogsByUser

};
