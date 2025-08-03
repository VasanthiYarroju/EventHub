import React, { useState } from 'react';

// The correct passcode. In a real app, this should not be hardcoded on the client-side.
const CORRECT_PASSCODE = 'admin123';

function PasscodeModal({ onClose, onSuccess }) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passcode === CORRECT_PASSCODE) {
      // If correct, call the onSuccess function passed from HomePage
      onSuccess();
    } else {
      // If incorrect, show an error and clear the input
      setError('Incorrect passcode. Please try again.');
      setPasscode('');
    }
  };

  const modalStyles = `
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    }
    .modal-content {
        background: white;
        padding: 2rem 3rem;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        width: 100%;
        max-width: 400px;
        position: relative;
        text-align: center;
        animation: slideIn 0.4s ease-out;
    }
    .modal-close-btn {
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #888;
    }
    .modal-close-btn:hover {
        color: #333;
    }
    .modal-title {
        margin-top: 0;
        margin-bottom: 1.5rem;
        color: #3B2C2C;
        font-family: 'Montserrat', sans-serif;
    }
    .passcode-input {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 1rem;
        text-align: center;
        letter-spacing: 0.5em;
        margin-bottom: 1rem;
    }
    .passcode-input:focus {
        outline: none;
        border-color: #5b6946;
        box-shadow: 0 0 0 3px rgba(91, 105, 70, 0.2);
    }
    .modal-error {
        color: #d9534f;
        font-size: 0.875rem;
        margin-bottom: 1rem;
        height: 1.2em; /* Reserve space to prevent layout shift */
    }
    .modal-submit-btn {
        width: 100%;
        padding: 12px 20px;
        border: none;
        background-color: #5b6946;
        color: white;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        text-transform: uppercase;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    .modal-submit-btn:hover {
        background-color: #4b553c;
    }
  `;

  return (
    <>
      <style>{modalStyles}</style>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={onClose}>×</button>
          <h2 className="modal-title">Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <p className="modal-error">{error}</p>
            <input
              type="password"
              className="passcode-input"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="••••"
              autoFocus
            />
            <button type="submit" className="modal-submit-btn">Enter</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PasscodeModal;