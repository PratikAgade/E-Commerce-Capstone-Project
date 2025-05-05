import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faTwitter, 
  faWhatsapp, 
  faPinterest 
} from '@fortawesome/free-brands-svg-icons';
import { faLink, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useShopContext } from '../context/ShopContext';
const WishlistShare = () => {
  const { generateWishlistShareUrl } = useShopContext();
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const shareUrl = generateWishlistShareUrl();
  const pageTitle = "Check out my wishlist!";
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setShowCopiedMessage(true);
      setTimeout(() => setShowCopiedMessage(false), 2000);
    });
  };
  const facebookShareUrl = `https:
  const twitterShareUrl = `https:
  const whatsappShareUrl = `https:
  const pinterestShareUrl = `https:
  return (
    <div className="wishlist-share">
      <h3>Share Your Wishlist</h3>
      <div className="share-url-container">
        <input 
          type="text" 
          value={shareUrl} 
          className="share-url-input"
          readOnly
        />
        <button 
          onClick={copyToClipboard} 
          className="copy-button"
          aria-label="Copy link to clipboard"
        >
          <FontAwesomeIcon 
            icon={showCopiedMessage ? faCheck : faLink} 
            className={`copy-icon ${showCopiedMessage ? 'copied' : ''}`}
          />
          <span className="copy-text">{showCopiedMessage ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <div className="social-share-buttons">
        <a 
          href={facebookShareUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="share-button facebook"
          aria-label="Share on Facebook"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a 
          href={twitterShareUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="share-button twitter"
          aria-label="Share on Twitter"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a 
          href={whatsappShareUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="share-button whatsapp"
          aria-label="Share on WhatsApp"
        >
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
        <a 
          href={pinterestShareUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="share-button pinterest"
          aria-label="Share on Pinterest"
        >
          <FontAwesomeIcon icon={faPinterest} />
        </a>
      </div>
    </div>
  );
};
export default WishlistShare; 