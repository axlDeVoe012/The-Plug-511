import { useState, useEffect } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr"; 
import { api } from "../axios/api"; // ✅ CHANGE 1: Import your configured Axios instance
import '../styles/Articles.css';

// ✅ CHANGE 2: Define a specific URL for images (Since API_BASE is empty for the proxy)
// We use the direct AWS HTTP link for images to avoid 404s, 
// OR you must add "/Images/*" to your _redirects file.
const IMAGE_BASE = "";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedArticles, setExpandedArticles] = useState({});

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // ✅ CHANGE 3: Use 'api.get' instead of 'fetch'
        // This ensures requests go through the Netlify Proxy (/api/...) 
        // AND includes the Bearer Token if the user is logged in.
        const response = await api.get('/Articles/get-allArticles');

        // Axios returns data directly in 'response.data'
        const data = response.data;
        
        if (data.status && data.items) {
          setArticles(data.items);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Failed to load articles", err);
        setError("Failed to load articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();

    // -------------------------------------------
    // ✅ CHANGE 4: SignalR Authentication & Proxy
    // -------------------------------------------
    const connection = new HubConnectionBuilder()
      .withUrl("/hubs/notifications", { // ✅ Point to relative path (Proxy handles the rest)
         // ✅ Send the JWT Token so the backend knows who this is
         accessTokenFactory: () => sessionStorage.getItem("token") 
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    // Handle Create
    connection.on("ArticleCreated", (newArticle) => {
      console.log("Real-time Create:", newArticle);
      setArticles(prev => [newArticle, ...prev]); 
    });

    // Handle Update
    connection.on("ArticleUpdated", (updatedArticle) => {
      console.log("Real-time Update:", updatedArticle);
      setArticles(prev => prev.map(a => a.id === updatedArticle.id ? updatedArticle : a));
    });

    // Handle Delete
    connection.on("ArticleDeleted", (articleId) => {
      console.log("Real-time Delete:", articleId);
      setArticles(prev => prev.filter(a => a.id !== articleId));
    });

    connection.start()
      .then(() => console.log("Connected to SignalR Hub"))
      .catch(err => console.error("SignalR Connection Error: ", err));

    return () => {
      connection.stop();
    };
  }, []); 

  const toggleReadMore = (id) => {
    setExpandedArticles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const truncateText = (text, wordCount = 25) => {
    if (!text || typeof text !== 'string') return '';
    const words = text.split(' ');
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(' ') + '...';
  };

  if (loading) return <div className="articles-container"><div className="loading-spinner"><div className="spinner"></div><p>Loading articles...</p></div></div>;

  if (error) return <div className="articles-container"><div className="error-message"><h2>Something went wrong</h2><p>{error}</p><button onClick={() => window.location.reload()}>Try Again</button></div></div>;

  return (
    <div className="articles-container">
      <h1 className="articles-title">Articles</h1>
      <p className="articles-subtitle">Explore the latest tips, events, and promotions.</p>

      <section>
        <div className="article-grid">
          {articles.length > 0 ? (
            articles.map((a) => (
              <div key={a.id} className="article-card">
                {a.images?.[0] && (
                  <div className="article-image-container">
                    <img
                      // ✅ CHANGE 5: Use IMAGE_BASE for images
                      // Since the proxy only handles /api, we need the full URL for static files
                      src={`${IMAGE_BASE}${a.images[0]}`}
                      alt={a.title}
                      className="article-image"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}

                <div className="article-content">
                  <h3>{a.title || "Untitled Article"}</h3>
                  <p className="article-description">
                    {expandedArticles[a.id] ? a.description : truncateText(a.description)}
                  </p>
                  
                  <div className="article-footer">
                    {a.description && a.description.split(' ').length > 25 && (
                      <button className="read-more-btn" onClick={() => toggleReadMore(a.id)}>
                        {expandedArticles[a.id] ? 'Read Less' : 'Read More'}
                      </button>
                    )}
                    
                    {a.link && (
                      <a href={a.link} target="_blank" rel="noopener noreferrer" className="article-link">
                        Visit Resource
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-articles">No articles available right now.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Articles;