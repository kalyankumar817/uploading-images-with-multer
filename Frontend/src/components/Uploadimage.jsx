import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Uploadingimage = () => {
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      await axios.post('http://localhost:3000/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/');
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

  return (
    <div className="image-upload-container">
      <h2>Upload Images here</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload your image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div>
          <button type="submit">Upload Image</button>
        </div>
      </form>
    </div>
  );
};

export default Uploadingimage;
