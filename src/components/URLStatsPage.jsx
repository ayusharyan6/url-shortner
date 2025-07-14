import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';

const URLStatsPage = () => {
  const [shortened, setShortened] = useState([]);
  const [redirects, setRedirects] = useState([]);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('logs') || '[]');
    const short = logs.filter(l => l.type === 'URL_SHORTENED');
    const redir = logs.filter(l => l.type === 'REDIRECT');

    setShortened(short.reverse());
    setRedirects(redir.reverse());
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Shortened URLs</Typography>
      {shortened.map((log, idx) => (
        <Box key={idx} sx={{ mb: 2 }}>
          🔗 <a href={log.data.shortUrl} target="_blank" rel="noreferrer">{log.data.shortUrl}</a>
          <Typography variant="body2">→ {log.data.longUrl}</Typography>
          {log.data.expiresAt && (
            <Typography variant="caption">
              Expires at: {new Date(log.data.expiresAt).toLocaleString()}
            </Typography>
          )}
          <Divider sx={{ mt: 1 }} />
        </Box>
      ))}

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Redirect Logs</Typography>
      {redirects.map((log, idx) => (
        <Box key={idx} sx={{ mb: 1 }}>
          📦 [{new Date(log.timestamp).toLocaleString()}] → {log.data.to}
        </Box>
      ))}
    </Box>
  );
};

export default URLStatsPage;
