import React from 'react';
const FallbackApp = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>ElectroVerse - Wishlist & Recommendation System</h1>
      <p>This is a fallback page to diagnose rendering issues.</p>
      <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
        <h2>Debug Information</h2>
        <p>Browser: {navigator.userAgent}</p>
        <p>Screen size: {window.innerWidth}x{window.innerHeight}</p>
        <p>React version: {React.version}</p>
      </div>
      <button 
        style={{ 
          marginTop: '20px', 
          padding: '10px 15px', 
          background: '#1a73e8', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onClick={() => window.location.reload()}
      >
        Reload Page
      </button>
    </div>
  );
};
export default FallbackApp; 