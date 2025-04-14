import React from 'react';
import { useScreenReader } from '../context/ScreenReaderContext.jsx';
import "../styles/ScreenReader.css";

const ScreenReaderControls = () => {
  const { readText, stopReading, isLoading, error } = useScreenReader();
  
  const readPageContent = () => {
    const pageText = document.body.innerText;
    readText(pageText);
  };

  return (
    <div className="screen-reader-controls">
      <button 
        onClick={readPageContent}
        disabled={isLoading}
        aria-label={isLoading ? 'Reading page content' : 'Read page content'}
      >
        {isLoading ? '⏳ Reading...' : '🔊 Read Page'}
      </button>
      <button 
        onClick={stopReading}
        aria-label="Stop reading"
      >
        ⏹ Stop
      </button>
      {error && <div className="sr-error">⚠️ {error}</div>}
    </div>
  );
};

export default ScreenReaderControls;