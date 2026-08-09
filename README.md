# IWAN ALPHA XAU

Institutional Decision Engine & Cockpit Interface untuk Perdagangan Emas (XAUUSD).

## 🚀 Quick Start

### Prerequisites
- Node.js >= 14.0.0
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/jowotrader/Co-pilot.git
cd Co-pilot

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration
```

### Running the Server

```bash
# Development
npm run dev

# Production
npm start
```

Server akan berjalan di `http://localhost:3000`

### Health Check Endpoints

- **Main Page**: `http://localhost:3000/`
- **Health Status**: `http://localhost:3000/health`
- **Ping Check**: `http://localhost:3000/ping`
- **API Data**: `http://localhost:3000/api/data`

## 🐳 Docker Deployment

### Build and Run with Docker

```bash
# Build image
docker build -t iwan-alpha-xau .

# Run container
docker run -p 3000:3000 iwan-alpha-xau
```

### Docker Compose

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

## 📊 UptimeRobot Monitoring

### Setup Instructions

1. **Create UptimeRobot Account**: https://uptimerobot.com
2. **Add Monitor**:
   - Monitor Type: HTTP(s)
   - URL: `https://your-domain.com/health`
   - Check Interval: 300 seconds (5 minutes)
   - Enable Telegram Alerts

3. **Configure Telegram Notifications**:
   - Create Telegram Bot via @BotFather
   - Set bot token in `.env`
   - Enable alerts to receive uptime notifications

### Monitoring Endpoints

```
GET /health  → Returns JSON with uptime status
GET /ping    → Simple OK response (ideal for uptimerobot)
```

Response format:
```json
{
  "status": "online",
  "uptime": 3600.5,
  "timestamp": "2026-08-09T10:30:00.000Z",
  "version": "1.0.0"
}
```

## 🔧 Configuration

Edit `.env` file:

```env
PORT=3000
NODE_ENV=production
TELEGRAM_BOT_TOKEN=your_token
UPTIMEROBOT_API_KEY=your_api_key
```

## 📁 File Structure

```
Co-pilot/
├── Index.html              # Main HTML page
├── server.js              # Node.js server with rendering
├── package.json           # Dependencies
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose setup
├── .env.example          # Environment template
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions CI/CD
└── README.md             # This file
```

## 🔒 Security Headers

Server includes CORS headers dan Content Security Policy untuk protection:
- CORS enabled
- CSP headers from HTML meta tags
- HTTPS ready

## 📈 Logging

Server logs ke console dengan format:
```
✈️  IWAN ALPHA XAU Server running at http://0.0.0.0:3000/
📊 Health check: http://0.0.0.0:3000/health
🔔 UptimeRobot ping: http://0.0.0.0:3000/ping
```

## 🛠 Troubleshooting

### Server won't start
```bash
# Check port availability
lsof -i :3000

# Kill process on port 3000
kill -9 $(lsof -t -i:3000)
```

### Health check returns error
```bash
# Test endpoint
curl http://localhost:3000/health

# Check logs
docker-compose logs app
```

### UptimeRobot not receiving responses
- Verify domain is accessible from internet
- Check firewall rules
- Ensure server is running: `npm start`
- Test endpoint: `curl https://your-domain.com/ping`

## 📝 License

MIT License - See LICENSE file for details

## 👤 Author

**jowotrader**
- GitHub: [@jowotrader](https://github.com/jowotrader)

## 📞 Support

For issues, questions, atau suggestions:
1. Check existing issues
2. Create new issue dengan detail
3. Join Telegram group untuk support

---

**Updated**: 2026-08-09  
**Status**: ✅ Online & Monitoring Active
