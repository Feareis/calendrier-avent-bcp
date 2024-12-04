import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, surprise }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Bouton pour fermer la modal */}
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Surprise !</h2>
        <p>{surprise}</p>
      </div>
    </div>
  );
};

export default Modal;
