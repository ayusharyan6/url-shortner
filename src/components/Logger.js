// src/components/Logger.js

export const logEvent = (type, data) => {
    const log = {
      type,
      data,
      timestamp: new Date().toISOString(),
    };
  
    // Save to localStorage (can also be sent to a backend if available)
    const logs = JSON.parse(localStorage.getItem("logs") || "[]");
    logs.push(log);
    localStorage.setItem("logs", JSON.stringify(logs));
  };
  