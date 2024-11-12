import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleImage = () => {
  const { id } = useParams(); // Get the image ID from URL
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/images/${id}`);
        setImageData(response.data);
      } catch (err) {
        console.error('Error fetching the image:', err);
      }
    };
    fetchImage();
  }, [id]);

  return (
    <div>
      <h2>Image Details</h2>
      {imageData ? (
        <div>
          <img
            src={imageData.image}
            alt="Single Uploaded"
            style={{ width: '300px', height: 'auto' }}
          />
          <p>Image ID: {id}</p>
        </div>
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default SingleImage;
