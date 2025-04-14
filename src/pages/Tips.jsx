import React, { useState, useEffect } from "react";
import { useScreenReader } from "../context/ScreenReaderContext.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/Tips.css";
import Login from "../components/login.jsx";

const TipsPage = () => {
  const [tips, setTips] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { readText, stopReading, isLoading: readerLoading, currentSource, error: readerError } = useScreenReader();
  const { isAuthenticated, isLoading: authLoading } = useAuth0();

  const tipsPerPage = 6;

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const apiKey = "3e3c08a53e32461fa33ab1d88bdbeb2a";
        const url = `https://newsapi.org/v2/everything?q=money+saving+tips&apiKey=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch tips");
        
        const data = await response.json();
        const formattedTips = data.articles.map((article, index) => ({
          id: index + 1,
          title: article.title,
          description: article.description || "No description available.",
          link: article.url,
        }));

        setTips(formattedTips);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  const handleReadArticle = (id, title, description) => {
    const articleText = `${title}. ${description}`;
    readText(articleText, `tip-${id}`);
  };

  const filteredTips = tips.filter(tip =>
    tip.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastTip = currentPage * tipsPerPage;
  const indexOfFirstTip = indexOfLastTip - tipsPerPage;
  const currentTips = filteredTips.slice(indexOfFirstTip, indexOfLastTip);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (authLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="tips-page">
      {!isAuthenticated ? (
        <div className="auth-prompt">
          <h1>Please log in to access money saving resources</h1>
          <Login />
        </div>
      ) : (
        <>
          <h1 className="specialh1"> 💰 Money Saving Resources</h1>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search resources"
            />
          </div>

          {loading && <p className="loading">Loading tips...</p>}
          {error && <p className="error">⚠️ Error: {error}</p>}
          {readerError && <p className="error">⚠️ {readerError}</p>}

          {!loading && !error && filteredTips.length === 0 && (
            <p className="no-results">No tips found. Try a different search!</p>
          )}

          <div className="tips-grid">
            {currentTips.map((tip) => {
              const tipSource = `tip-${tip.id}`;
              return (
                <div key={tip.id} className="tip-card">
                  <h3>{tip.title}</h3>
                  <p>{tip.description}</p>
                  <div className="article-controls">
                    <a
                      href={tip.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="read-more"
                      aria-label={`Read more about ${tip.title}`}
                    >
                      Read More
                    </a>
                    <div className="audio-controls">
                      <button
                        onClick={() => handleReadArticle(tip.id, tip.title, tip.description)}
                        disabled={readerLoading || (currentSource && currentSource !== tipSource)}
                        className="listen-button"
                        aria-label={`Listen to ${tip.title}`}
                      >
                        {currentSource === tipSource ? '⏳' : '🔊'}
                      </button>
                      <button
                        onClick={stopReading}
                        disabled={!currentSource || currentSource !== tipSource}
                        className="stop-button"
                        aria-label="Stop reading"
                      >
                        ⏹
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTips.length > tipsPerPage && (
            <div className="pagination">
              {Array.from({ length: Math.ceil(filteredTips.length / tipsPerPage) }).map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                  aria-label={`Go to page ${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
      <footer className="footer">
        <p>&copy; 2025 SEF - Student Expense Forecaster | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default TipsPage;