import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const ImageSlider = ({ images }) => {
  return (
    <AwesomeSlider>
      {images &&
        images.map((image, id) => (
          <div key={id} style={{ borderRadius: 10 }} data-src={image} />
        ))}
    </AwesomeSlider>
  );
};

export default ImageSlider;
