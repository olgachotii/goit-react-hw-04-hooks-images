import { useEffect } from 'react';
import './Modal.scss';

function Modal({ contentModal, closeModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return (
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={contentModal} alt="" />
      </div>
    </div>
  );
}

export default Modal;
