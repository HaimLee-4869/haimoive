import React from 'react';
import './TermsModal.css';

const TermsModal = ({ show, onHide, onAgree }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>이용약관</h2>

        </div>
        <div className="modal-body">
          <div className="terms-content">
            <h5>서비스 이용약관</h5>
            <p>
                임의 작성
            </p>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onHide}>취소</button>
          <button onClick={onAgree} className="agree-button">동의</button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;