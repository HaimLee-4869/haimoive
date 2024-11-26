import React from 'react';
import './LoadingSpinner.css';

/* css 파일 참고 */

function LoadingSpinner() {
  return (
    <div className="loading-spinner">   
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

export default LoadingSpinner;