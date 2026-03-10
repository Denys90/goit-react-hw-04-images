import React, { useEffect } from 'react';
import { Overlay } from './Overlay';

type Image = {
  id: number;
  webformatURL: string;
  largeImageURL: string;
};

type ModalProps = {
  image: Image;
  onClose: () => void;
  showModal: boolean;
};

function Modal({ showModal, image, onClose }: ModalProps) {
  useEffect(() => {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        this.props.onClose();
      }
    });
    return () => {
      window.removeEventListener('keydown', e => {
        if (e.code === 'Escape') {
          this.props.onClose();
        }
      });
    };
  }, []);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
  };
  return (
    <Overlay showModal={showModal} onClick={onClose}>
      <div>
        <img src={image.largeImageURL} alt="" onClick={handleImageClick} />
      </div>
    </Overlay>
  );
}

export default Modal;
