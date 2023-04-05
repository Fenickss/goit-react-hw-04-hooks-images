import { useEffect } from 'react';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return window.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  return (
    <div className={s.Overlay} onClick={onClose}>
      <div className={s.Modal}>{children}</div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Modal;
