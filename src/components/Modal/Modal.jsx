import React, { useEffect } from 'react';
import { Overlay } from './Overlay';

function Modal({ showModal, image, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', e => {
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

  const handleImageClick = e => {
    e.stopPropagation();
  };
  return (
    <Overlay showModal={showModal} onClick={onClose}>
      <div>
        <img src={image} alt="" onClick={handleImageClick} />
      </div>
    </Overlay>
  );
}

export default Modal;
