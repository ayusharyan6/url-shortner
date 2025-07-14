import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import { logEvent } from './Logger';

const URLShortenerForm = () => {
  const [fields, setFields] = useState([
    { url: '', validity: '', shortcode: '' }
  ]);
  const [shortenedLinks, setShortenedLinks] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...fields];
    updated[index][field] = value;
    setFields(updated);
  };

  const addField = () => {
    if (fields.length < 5) {
      setFields([...fields, { url: '', validity: '', shortcode: '' }]);
    }
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = () => {
    const results = [];

    for (let i = 0; i < fields.length; i++) {
      const { url, validity, shortcode } = fields[i];

      if (!validateUrl(url)) {
        alert(`Row ${i + 1}: Invalid URL`);
        return;
      }

      if (validity && isNaN(validity)) {
        alert(`Row ${i + 1}: Validity must be a number`);
        return;
      }
      const code = shortcode || Math.random().toString(36).substring(2, 7);
      const expiry = validity ? new Date(Date.now() + validity * 60000) : null;

      const shortUrl = `${window.location.origin}/${code}`;
      results.push({ shortUrl, expiry });
      logEvent('URL_SHORTENED', {
        longUrl: url,
        shortUrl,
        validity: validity || 'default',
        shortcode: code,
        expiresAt: expiry
      });
    }

    setShortenedLinks(results);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        URL Shortener
      </Typography>

      {fields.map((field, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Long URL"
              value={field.url}
              onChange={(e) => handleChange(index, 'url', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              label="Validity (min)"
              value={field.validity}
              onChange={(e) => handleChange(index, 'validity', e.target.value)}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              label="Custom Shortcode"
              value={field.shortcode}
              onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
            />
          </Grid>
        </Grid>
      ))}

      <Button variant="outlined" onClick={addField} disabled={fields.length >= 5}>
        + Add More
      </Button>

      <Button variant="contained" sx={{ ml: 2 }} onClick={handleSubmit}>
        Generate Short URLs
      </Button>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Shortened URLs:</Typography>
        {shortenedLinks.map((link, idx) => (
          <Box key={idx} sx={{ mt: 1 }}>
            🔗 <a href={link.shortUrl} target="_blank" rel="noreferrer">{link.shortUrl}</a>
            {link.expiry && (
              <Typography variant="caption" sx={{ display: 'block' }}>
                Expires at: {link.expiry.toLocaleString()}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default URLShortenerForm;
