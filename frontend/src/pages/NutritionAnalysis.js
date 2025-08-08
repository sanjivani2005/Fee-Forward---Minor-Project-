import React, { useState } from 'react';
import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleAddPost = () => {
    if (!title || !content) {
      alert('Please enter both title and content');
      return;
    }

    const newPost = {
      id: posts.length + 1,
      title,
      content,
      image: image ? URL.createObjectURL(image) : null,
    };
    setPosts([newPost, ...posts]);
    setTitle('');
    setContent('');
    setImage(null);
  };

  const handleShare = (post, platform) => {
    const shareText = `Check out this blog post: ${post.title} - ${post.content}`;
    const shareUrl = window.location.href;

    let shareLink;
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        break;
      case 'instagram':
        shareLink = `https://www.instagram.com/`; // Instagram doesn't support direct sharing via link
        break;
      default:
        return;
    }

    window.open(shareLink, '_blank');
  };

  return (
    <div className="blog-container">
      <h2>Create a New Blog Post</h2>
      <div className="blog-input">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button onClick={handleAddPost}>Add Post</button>
      </div>

      <div className="blog-posts">
        {posts.length ? (
          posts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              {post.image && <img src={post.image} alt="Blog Post" />}
              <div className="share-buttons">
                <button onClick={() => handleShare(post, 'facebook')}>
                  <FaFacebook /> Share on Facebook
                </button>
                <button onClick={() => handleShare(post, 'whatsapp')}>
                  <FaWhatsapp /> Share on WhatsApp
                </button>
                <button onClick={() => handleShare(post, 'instagram')}>
                  <FaInstagram /> Share on Instagram
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No blog posts yet. Create one above!</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
