# Yearbook Sports

A comprehensive sports media platform combining written content, podcasts, and historical data with a modern web interface.

## 🏗️ Architecture

This is a monorepo containing:
- **Frontend**: Next.js application
- **Backend**: .NET 8 Web API
- **Database**: PostgreSQL
- **Infrastructure**: Docker containers for deployment on Render

## 🎯 Features

- **Dynamic CMS**: Content management for any sport, league, team, or player
- **Multi-media Platform**: Podcasts, articles, and historical data
- **Persistent Media Player**: Bottom-bar player for continuous listening
- **Role-based Access**: Admin, Content Creator, and User roles
- **Monetization Ready**: Ad placements and subscription tiers
- **Admin Console**: User management and content administration

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+
- .NET 8 SDK

### Development Setup
```bash
# Clone the repository
git clone <repository-url>
cd yearbook-sports

# Start all services
docker-compose up -d

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
dotnet restore

# Run migrations
dotnet ef database update
```

### Environment Variables
Copy `.env.example` to `.env` and configure:
- Database connection strings
- JWT secrets
- External API keys
- Render deployment settings

## 📁 Project Structure

```
yearbook-sports/
├── frontend/          # Next.js application
├── backend/           # .NET Web API
├── database/          # PostgreSQL migrations and seeds
├── docker/            # Docker configurations
├── docs/              # Documentation
└── scripts/           # Build and deployment scripts
```

## 🎨 Design Philosophy

Inspired by Bleacher Report circa 2014 with modern UX principles:
- Clean, sports-focused design
- Responsive layout
- Fast loading times
- Intuitive navigation

## 🔧 Development

### Frontend (Next.js)
```bash
cd frontend
npm run dev
```

### Backend (.NET)
```bash
cd backend
dotnet run
```

### Database
```bash
docker-compose up postgres
```

## 📦 Deployment

All services are containerized and ready for deployment on Render:
- Frontend: Static site hosting
- Backend: Web service
- Database: Managed PostgreSQL

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Run tests
4. Submit pull request

## 📄 License

[License information to be added] 