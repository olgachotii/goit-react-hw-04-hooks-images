import './App.scss';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import api from './component/servises/apiServises';
import Modal from './component/Modal';
import Searchbar from './component/Searchbar';
import ImageGallery from './component/ImageGallery';
import Loader from './component/Loader';
import Button from './component/Button';

function App() {
  const [value, setValue] = useState('');
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!value) {
      return;
    }
    setLoading(true);
    api
      .getData(value, page)
      .then(data => {
        if (data.total === 0) {
          toast.warning(`oops, we didn't find any images on request ${value}`);

          return;
        }
        page === 1
          ? setPictures(data.hits)
          : setPictures(prevState => [...prevState, ...data.hits]);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [value, page]);

  const toggleModal = largeImage => {
    setShowModal(!showModal);
    setContentModal(largeImage);
  };

  const hendelFormSubmit = value => {
    setValue(value);
  };

  const pagination = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Searchbar onSubmit={hendelFormSubmit} />
      {pictures.length > 0 && (
        <ImageGallery pictures={pictures} onClick={toggleModal} />
      )}

      {loading && <Loader />}

      {pictures.length > 11 && <Button pagination={pagination} />}

      <ToastContainer theme="colored" autoClose={3000} />

      {showModal && (
        <Modal contentModal={contentModal} closeModal={toggleModal} />
      )}
    </>
  );
}

export default App;
