import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { logEvent } from './Logger';

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve logs
    const logs = JSON.parse(localStorage.getItem('logs') || '[]');

    // Find URL by shortcode
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

    // Check if expired
    const { expiresAt, longUrl } = match.data;
    if (expiresAt && new Date(expiresAt) < new Date()) {
      alert('Link expired');
      navigate('/');
      return;
    }

    // Log redirection event
    logEvent('REDIRECT', { shortcode, to: longUrl });

    // Redirect
    window.location.href = longUrl;

  }, [shortcode, navigate]);

  return (
    <div style={{ padding: '2rem' }}>
      <h3>Redirecting...</h3>
    </div>
  );
};

export default RedirectHandler;
