import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGaleleryItem';
import { List } from '../ImageGallery/List';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <List>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} onClick={onImageClick} />
      ))}
    </List>
  );
};

export default ImageGallery;
