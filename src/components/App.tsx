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
type Image = {
  id: number;
  webformatURL: string;
  largeImageURL: string;
};

export function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [queryValue, setQueryValue] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalImg, setModalImg] = useState<Image | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  // ===============================================>
  const fetchImg = useCallback(async (): Promise<void> => {
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
  const handleSearchSubmit = (query: string): void => {
    if (queryValue !== query) {
      setQueryValue(query);
      setPage(1);
      setImages([]);
    }
  };

  // ===============================================>
  const handleLoadMore = (): void => {
    setPage(prevPage => prevPage + 1);
  };
  // ===============================================>
  const handleCloseModal = () => {
    setShowModal(false);
    setModalImg(null);
  };
  // ===============================================>
  const handleImageClick = (image: Image): void => {
    setModalImg(image);
    setShowModal(true);
  };
  // ===============================================>
  return (
    <>
      <Global
        styles={css`
          html {
            box-sizing: border-box;
            width: 100vw;
            overflow-x: hidden;
          }
          img {
            display: block;
            max-width: 100%;
            height: auto;
          }

          *,
          *::before,
          *::after {
            box-sizing: inherit;
          }
          body {
            margin: 0;
            font-family:
              -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
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
