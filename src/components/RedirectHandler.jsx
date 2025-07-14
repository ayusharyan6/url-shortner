import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { logEvent } from './Logger';

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('logs') || '[]');
    const match = logs
      .reverse()
      .find(log =>
        log.type === 'URL_SHORTENED' &&
        log.data.shortcode === shortcode
      );

    if (!match) {
      alert('Invalid or expired short link');
      navigate('/');
      return;
    }
    const { expiresAt, longUrl } = match.data;
    if (expiresAt && new Date(expiresAt) < new Date()) {
      alert('Link expired');
      navigate('/');
      return;
    }
    logEvent('REDIRECT', { shortcode, to: longUrl });
    window.location.href = longUrl;

  }, [shortcode, navigate]);

  return (
    <div style={{ padding: '2rem' }}>
      <h3>Redirecting...</h3>
    </div>
  );
};

export default RedirectHandler;
