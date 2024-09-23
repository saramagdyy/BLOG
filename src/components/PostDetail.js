import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = ({ posts }) => {
  const { id } = useParams();
  const post = posts[id];
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  return (
    <div className="p-4">
      {post ? (
        <>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          {post.image && <img src={post.image} alt={post.title} className="mt-2 h-40 object-cover rounded" />}
          <p className="mt-2">{post.content}</p>

          <h2 className="text-xl mt-4">Comments</h2>
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="border p-2 mb-2 w-full rounded"
              required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
          </form>
          <ul>
            {comments.map((c, index) => (
              <li key={index} className="border-b py-1">{c}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Post not found</p>
      )}
    </div>
  );
};

export default PostDetail;
