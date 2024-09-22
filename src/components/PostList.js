import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts, deletePost }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Blog Posts</h1>
      <Link to="/new" className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">Create New Post</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <div key={index} className="border rounded-lg shadow-md p-4 bg-white flex flex-col">
            <Link to={`/posts/${index}`} className="text-blue-500 font-bold">{post.title}</Link>
            {post.image && <img src={post.image} alt={post.title} className="mt-2 h-40 object-cover rounded" />}
            <p className="mt-2 text-gray-700">{post.content.substring(0, 100)}...</p>
            <div className="flex justify-between mt-2">
              <Link to={`/edit/${index}`} className="text-yellow-500">Edit</Link>
              <button onClick={() => deletePost(index)} className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
