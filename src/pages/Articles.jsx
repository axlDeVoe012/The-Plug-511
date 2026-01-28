import { useState, useEffect } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr"; 
import { api } from "../api"; // ✅ Points to your configured api.ts
import '../styles/Articles.css';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedArticles, setExpandedArticles] = useState({});

  // ✅ HELPER: The "Universal" Image Cleaner
  // This guarantees images load via Proxy regardless of what's in the DB
  const getImageUrl = (path) => {
    if (!path) return "";
    
    // 1. If the DB saved a full URL (localhost or AWS), strip the domain.
    // We WANT relative paths so Netlify can proxy them securely.
    if (path.includes("http")) {
       try {
         const urlObj = new URL(path);
         return urlObj.pathname; // Returns "/uploads/image.jpg" or "/Images/image.jpg"
       } catch (e) {
         console.error("Invalid URL in DB:", path);
       }
    }

    // 2. If it's already a correct relative path, return it.
    if (path.startsWith("/uploads") || path.startsWith("/Images")) {
        return path;
    }
    
    // 3. Fallback: If backend just sent "file.jpg", assume it's in "uploads"
    if (!path.startsWith("/")) {
        return `/uploads/${path}`;
    }
    
    return path;
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // ✅ Proxy handles /api -> AWS
        const response = await api.get('/Articles/get-allArticles');
        const data = response.data;
        
        // Handle different backend response structures safely
        let items = [];
        if (data.status && data.items) items = data.items;
        else if (Array.isArray(data)) items = data;
        
        setArticles(items);

      } catch (err) {
        console.error("Failed to load articles", err);
        setError("Failed to load articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();

    // -------------------------------------------
    // ✅ SignalR Authentication & Proxy
    // -------------------------------------------
    const connection = new HubConnectionBuilder()
      // ✅ Must match your _redirects rule: /hubs/* -> AWS /hubs/notifications
      .withUrl("/hubs/notifications", { 
          accessTokenFactory: () => sessionStorage.getItem("token") 
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    // Event Handlers
    connection.on("ArticleCreated", (newArticle) => {
      console.log("Real-time Create:", newArticle);
      setArticles(prev => [newArticle, ...prev]); 
    });

    connection.on("ArticleUpdated", (updatedArticle) => {
      console.log("Real-time Update:", updatedArticle);
      setArticles(prev => prev.map(a => a.id === updatedArticle.id ? updatedArticle : a));
    });

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
                      // ✅ THE FIX: Use the helper to ensure valid relative path
                      src={getImageUrl(a.images[0])}
                      alt={a.title}
                      className="article-image"
                      // If an image fails, hide it gracefully
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