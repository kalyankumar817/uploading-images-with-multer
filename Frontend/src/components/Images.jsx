import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Images = () => {
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/images')
      .then(res => setAllImages(res.data))
      .catch(err => console.log('Error fetching images:', err));
  }, []);

  return (
    <div>
      <h3>Images</h3>
      <Link to='/create'>ADD IMAGES</Link>
      <div className="image-gallery">
        {allImages.map((image, index) => (
          <div key={image._id || index} className="image-item">
            <img
              src={
                image.image.startsWith('data:image/jpeg;base64,')
                  ? image.image
                  : `data:image/jpeg;base64,${image.image}`
              }
              alt={`Uploaded Image ${index}`}
              style={{ width: '100%', height: 'auto' }}
            />
            <p>Image ID: {image._id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;
