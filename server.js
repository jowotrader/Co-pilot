const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Read HTML file
const htmlPath = path.join(__dirname, 'Index.html');
let htmlContent = '';

try {
  htmlContent = fs.readFileSync(htmlPath, 'utf8');
} catch (err) {
  console.error('Error reading Index.html:', err);
  htmlContent = '<h1>Error: Could not load page</h1>';
}

// Server config
const PORT = process.env.PORT || 3000;
const HOSTNAME = '0.0.0.0';

// Health check for UptimeRobot
const healthStatus = {
  status: 'online',
  uptime: process.uptime(),
  timestamp: new Date().toISOString(),
  version: '1.0.0'
};

// Create server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Health check endpoint for UptimeRobot
  if (pathname === '/health' || pathname === '/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    healthStatus.uptime = process.uptime();
    healthStatus.timestamp = new Date().toISOString();
    res.end(JSON.stringify(healthStatus));
    return;
  }

  // UptimeRobot ping endpoint
  if (pathname === '/ping') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
    return;
  }

  // Main page
  if (pathname === '/' || pathname === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlContent);
    return;
  }

  // API endpoint for dynamic data
  if (pathname === '/api/data') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      symbol: 'XAUUSD',
      status: 'online',
      serverTime: new Date().toISOString()
    }));
    return;
  }

  // 404 Not Found
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('<h1>404 - Page Not Found</h1>');
});

// Start server
server.listen(PORT, HOSTNAME, () => {
  console.log(`✈️  IWAN ALPHA XAU Server running at http://${HOSTNAME}:${PORT}/`);
  console.log(`📊 Health check: http://${HOSTNAME}:${PORT}/health`);
  console.log(`🔔 UptimeRobot ping: http://${HOSTNAME}:${PORT}/ping`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Error handling
server.on('error', (err) => {
  console.error('Server error:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
