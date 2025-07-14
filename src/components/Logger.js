export const logEvent = (type, data) => {
    const log = {
      type,
      data,
      timestamp: new Date().toISOString(),
    };
    const logs = JSON.parse(localStorage.getItem("logs") || "[]");
    logs.push(log);
    localStorage.setItem("logs", JSON.stringify(logs));
  };
  