import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { List } from './List';

type Image = {
  id: number;
  webformatURL: string;
  largeImageURL: string;
};
type ImageGalleryProps = {
  images: Image[];
  onImageClick: (image: Image) => void;
};

const ImageGallery = ({ images, onImageClick }: ImageGalleryProps) => {
  return (
    <List>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onClick={() => onImageClick(image)}
        />
      ))}
    </List>
  );
};

export default ImageGallery;
