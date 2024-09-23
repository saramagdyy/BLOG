import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PostForm = ({ addPost, posts, updatePost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      const post = posts[id];
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setImage(post.image);
      }
    }
  }, [id, posts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, content };

    if (image && image instanceof File) {
      newPost.image = URL.createObjectURL(image);
    } else if (id !== undefined) {
      newPost.image = posts[id].image;
    }

    if (id !== undefined) {
      updatePost(id, newPost);
    } else {
      addPost(newPost);
    }

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Post' : 'Create Post'}</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
        className="border p-2 mb-4 w-full rounded"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post Content"
        className="border p-2 mb-4 w-full rounded"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-4"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default PostForm;
