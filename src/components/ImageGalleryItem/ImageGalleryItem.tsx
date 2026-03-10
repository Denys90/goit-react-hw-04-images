import { Item } from './Item';

type Image = {
  id: Number;
  largeImageURL: string;
  webformatURL: string;
};

type ImageGalleryItemProps = {
  image: Image;
  onClick: (largeImageURL: string) => void;
};

const ImageGalleryItem = ({ image, onClick }: ImageGalleryItemProps) => {
  return (
    <Item onClick={() => onClick(image.largeImageURL)}>
      <img src={image.webformatURL} alt="" />
    </Item>
  );
};

export default ImageGalleryItem;
