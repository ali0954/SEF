import React, { createContext, useContext, useState, useEffect } from 'react';

const ScreenReaderContext = createContext();

export const ScreenReaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUtterance, setCurrentUtterance] = useState(null);
  const [currentSource, setCurrentSource] = useState(null);

  useEffect(() => {
    return () => {
      if (currentUtterance) {
        speechSynthesis.cancel();
      }
    };
  }, [currentUtterance]);

  const readText = async (text, source = 'global', targetLanguage = 'en') => {
    try {
      setIsLoading(true);
      setError(null);
      stopReading();

      const response = await fetch('https://translate-plus.p.rapidapi.com/translate', {
        method: 'POST',
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_API_KEY,
          'x-rapidapi-host': 'translate-plus.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text,
          source: 'auto',
          target: targetLanguage
        })
      });

      if (!response.ok) throw new Error('Translation failed');
      
      const result = await response.json();
      const translatedText = result.translations.translation;
      
      const utterance = new SpeechSynthesisUtterance(translatedText);
      
      utterance.onstart = () => setCurrentSource(source);
      utterance.onend = () => {
        setCurrentSource(null);
        setCurrentUtterance(null);
      };
      utterance.onerror = (error) => {
        setError('Playback error: ' + error.error);
        setCurrentSource(null);
        setCurrentUtterance(null);
      };

      speechSynthesis.speak(utterance);
      setCurrentUtterance(utterance);
    } catch (error) {
      setError(error.message);
      console.error('Screen Reader Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stopReading = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setCurrentSource(null);
      setCurrentUtterance(null);
    }
  };

  return (
    <ScreenReaderContext.Provider 
      value={{ 
        readText, 
        stopReading, 
        isLoading, 
        currentSource,
        error 
      }}
    >
      {children}
    </ScreenReaderContext.Provider>
  );
};

export const useScreenReader = () => useContext(ScreenReaderContext);