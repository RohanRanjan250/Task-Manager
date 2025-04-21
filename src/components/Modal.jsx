const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button className="close-modal" onClick={onClose}>×</button>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;