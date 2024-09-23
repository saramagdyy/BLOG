import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import Auth from './components/Auth';
import Signup from './components/Signup';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const addPost = (post) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };

  const updatePost = (index, updatedPost) => {
    const newPosts = [...posts];
    newPosts[index] = updatedPost;
    setPosts(newPosts);
  };

  const deletePost = (index) => {
    setPosts(posts.filter((_, i) => i !== index));
  };

  const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  return (
    <AuthProvider>
      <Router>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">My Blog</h1>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {/* Blog Posts heading with one Create New Post button */}
          {/* <h2 className="text-2xl font-semibold mb-4">Blog Posts</h2>
          <Link to="/new" className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Create New Post
          </Link> */}

          <Routes>
            <Route path="/" element={<PostList posts={currentPosts} deletePost={deletePost} />} />
            <Route path="/posts/:id" element={<PostDetail posts={posts} />} />
            <Route path="/new" element={<PostForm addPost={addPost} />} />
            <Route path="/edit/:id" element={<PostForm posts={posts} updatePost={updatePost} />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>

          <div className="flex justify-between items-center mt-4">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
