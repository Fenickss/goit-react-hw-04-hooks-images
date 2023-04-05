import { useState, useEffect } from 'react';
import './App.css';
import { fetchImages } from './API/api';

import Loader from 'Components/Loader/Loader';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import ImageError from './Components/ImageError';
import Modal from './Components/Modal';

import Button from './Components/Button';

const App = () => {
  const [imgName, setImgName] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    if (imgName === '') {
      return;
    }
    setStatus('pending');
    fetchImages(imgName)
      .then(images => {
        setImages(images);
        setStatus('resolved');
        IncrementPage();
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [imgName]);

  const getImages = async () => {
    IncrementPage();
    try {
      const newImage = await fetchImages(imgName, page);
      setImages(prevState => [...prevState, ...newImage]);

      console.log([...newImage]);
    } catch (error) {
      console.log('Smth wrong with App fetch', error);
      setError(error);
    }
  };

  const handleFormSubmit = imgName => {
    setImgName(imgName);
    setStatus('resolved');

    resetPage();
  };

  const resetPage = () => {
    setPage(prevState => (prevState = 1));
  };

  const IncrementPage = () => {
    setPage(prevState => (prevState += 1));
  };

  const openModal = largeImageURL => {
    setShowModal(true);
    setModalImage(largeImageURL);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  if (status === 'idle') {
    return <Searchbar onSubmit={handleFormSubmit} />;
  }
  if (status === 'pending') {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery onImgClick={openModal} images={images} />

        <Loader />
      </>
    );
  }
  if (status === 'rejected') {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery images={images} onImgClick={openModal} />
        <ImageError message={error.message} />
      </>
    );
  }
  if (status === 'resolved') {
    return (
      <>
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={modalImage} alt="largeImage" className="image" />
          </Modal>
        )}

        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery images={images} onImgClick={openModal} />
        <Button onClick={getImages} />
      </>
    );
  }
};

export default App;
