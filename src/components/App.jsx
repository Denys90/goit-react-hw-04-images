import React, { useState, useEffect, useCallback } from 'react';
import { Global, css } from '@emotion/react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import fetchData from './API/fetchData';
import { Container } from './Styles/Container';
// ===============================================>
export function App() {
  const [images, setImages] = useState([]);
  const [queryValue, setQueryValue] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [showModal, setShowModal] = useState(false);
  // ===============================================>
  const fetchImg = useCallback(async () => {
    if (!queryValue) {
      return;
    }

    setLoading(true);

    try {
      const { total, fetchedImages } = await fetchData(queryValue, page);

      if (total) {
        setImages(prevState => [...prevState, ...fetchedImages]);
      } else {
        alert('Nothing found, try again!');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [page, queryValue]);
  // ===============================================>
  useEffect(() => {
    if (queryValue) {
      fetchImg();
    }
  }, [queryValue, fetchImg, page]);
  // ===============================================>
  const handleSearchSubmit = query => {
    if (queryValue !== query) {
      setQueryValue(query);
      setPage(1);
      setImages([]);
    }
  };

  // ===============================================>
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  // ===============================================>
  const handleCloseModal = () => {
    setShowModal(false);
    setModalImg('');
  };
  // ===============================================>
  const handleImageClick = imageUrl => {
    setModalImg(imageUrl);
    setShowModal(true);
  };
  // ===============================================>
  return (
    <>
      <Global
        styles={css`
            html {
              boxSizing: ' border-box',
              width: '100vw',
              overflowX: 'hidden',
            },
            img {
              display: 'block',
              maxWidth: '100%',
              height: 'auto',
            },

            *,
            *::before,
            *::after {
              box-sizing: inherit;
            }
            body {
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              background-color: #212121;
            }
          `}
      />
      <Container>
        <Searchbar onSubmit={handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={handleImageClick} />
        {loading && <Loader />}
        {images.length > 11 && !loading && <Button onClick={handleLoadMore} />}
        {showModal && (
          <Modal
            showModal={showModal}
            image={modalImg}
            onClose={handleCloseModal}
          />
        )}
      </Container>
    </>
  );
}
