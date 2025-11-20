# Claude Learning Project

A lightweight Progressive Web App (PWA) chat application built for learning Claude AI, AI agents, MCP servers, and modern web development practices.

## Architecture

This is a monorepo containing:

- **Backend**: ASP.NET Core 8.0 Minimal APIs (C#)
- **Frontend**: React 18 + TypeScript + Vite
- **Storage**: In-memory (thread-safe collections)
- **PWA**: Service worker enabled for offline capability

### Project Structure

```
ClaudeLearningProject/
├── src/
│   ├── ClaudeLearningProject.Api/  # C# Backend API
│   │   ├── Models/                 # Data models
│   │   ├── Services/               # Business logic
│   │   └── Program.cs              # API endpoints
│   └── frontend/                   # React Frontend
│       ├── src/
│       │   ├── components/         # React components
│       │   ├── services/           # API client
│       │   └── types/              # TypeScript types
│       └── public/                 # Static assets
├── .vscode/                        # VS Code configuration
└── ClaudeLearningProject.sln       # Solution file
```

## Getting Started

### Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Quick Start

1. **Install frontend dependencies:**
   ```bash
   cd src/frontend
   npm install
   cd ../..
   ```

2. **Run both backend and frontend:**

   **Option A: Using VS Code**
   - Press `F5` and select "Launch API + Frontend"
   - Or use `Ctrl+Shift+P` → "Tasks: Run Task" → "dev-all"

   **Option B: Using terminal**
   ```bash
   # Terminal 1 - Backend
   dotnet run --project src/ClaudeLearningProject.Api/ClaudeLearningProject.Api.csproj --urls http://localhost:5000

   # Terminal 2 - Frontend
   cd src/frontend
   npm run dev
   ```

3. **Open the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Swagger UI: http://localhost:5000/swagger

## Development

### Backend Commands

```bash
# Build the API
dotnet build src/ClaudeLearningProject.Api/ClaudeLearningProject.Api.csproj

# Run the API
dotnet run --project src/ClaudeLearningProject.Api/ClaudeLearningProject.Api.csproj --urls http://localhost:5000

# Watch mode (hot reload)
dotnet watch --project src/ClaudeLearningProject.Api/ClaudeLearningProject.Api.csproj --urls http://localhost:5000
```

### Frontend Commands

```bash
cd src/frontend

# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint

# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Testing

The frontend uses **Vitest** as the testing framework with **React Testing Library** for component testing.

#### Running Tests

**Run all tests:**
```bash
cd src/frontend
npm test
```

**Run tests in watch mode** (automatically re-run on file changes):
```bash
cd src/frontend
npm test -- --watch
```

**Run specific test file:**
```bash
cd src/frontend
npm test Modal.test.tsx
```

**Run tests with coverage report:**
```bash
cd src/frontend
npm test -- --coverage
```

#### Test Structure

Tests are located alongside their components using the `.test.tsx` naming convention:
```
src/components/
├── ui/
│   ├── Modal/
│   │   ├── Modal.tsx
│   │   └── Modal.test.tsx
│   └── Icon/
│       ├── Icon.tsx
│       └── Icon.test.tsx
```

#### Writing Tests

Test files use Vitest and React Testing Library:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected text')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = vi.fn();
    render(<MyComponent onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

#### Test Configuration

- **vitest.config.ts**: Main test configuration with jsdom environment
- **vitest.setup.ts**: Setup file for test dependencies (e.g., @testing-library/jest-dom)
- Test files are identified by `*.test.ts` or `*.test.tsx` pattern

### VS Code Tasks

- `build-api` - Build the backend API
- `run-api` - Run the backend API
- `watch-api` - Run API with hot reload
- `install-frontend` - Install frontend dependencies
- `dev-frontend` - Run frontend dev server
- `build-frontend` - Build frontend for production
- `dev-all` - Run both backend and frontend concurrently

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Messages
- `GET /api/messages` - Get all chat messages
- `POST /api/messages` - Send a new message
  ```json
  {
    "username": "Alice",
    "content": "Hello, world!"
  }
  ```
- `DELETE /api/messages` - Clear all messages

## Features

### Current Features

- Real-time chat interface with auto-polling (2-second interval)
- Username persistence using localStorage
- Message timestamps with formatted display
- Clear chat functionality
- Online/offline status indicator
- Responsive design (mobile-friendly)
- PWA support (installable, offline-capable)
- Thread-safe in-memory message storage
- Full TypeScript type safety
- Swagger API documentation

### Learning Opportunities

This project is designed for experimenting with:

1. **Claude AI Integration**
   - Add AI-powered message responses
   - Implement chat summarization
   - Create smart message suggestions

2. **MCP Servers**
   - Connect to external services
   - Add context-aware features
   - Integrate with data sources

3. **AI Agents**
   - Create automated chat participants
   - Implement conversation flows
   - Build intelligent assistants

4. **Real-time Features**
   - Add SignalR for WebSocket communication
   - Implement typing indicators
   - Add presence detection

5. **Persistence**
   - Switch to SQLite/SQL Server
   - Add message history
   - Implement user authentication

## PWA Features

The application is configured as a Progressive Web App:

- **Installable**: Can be installed on desktop and mobile
- **Offline Capable**: Service worker caches assets for offline use
- **App-like Experience**: Runs in standalone mode
- **Fast Loading**: Optimized build with code splitting

To install as PWA, open in a supported browser and look for the install prompt.

## Technology Stack

### Backend
- ASP.NET Core 8.0 (Minimal APIs)
- C# 12 with nullable reference types
- Swagger/OpenAPI for API documentation
- In-memory storage (ConcurrentBag)

### Frontend
- React 18 (with hooks)
- TypeScript 5.2
- Vite 5 (build tool)
- vite-plugin-pwa (PWA support)
- CSS3 (no framework for simplicity)

### Development Tools
- VS Code tasks and launch configurations
- Hot reload for both backend and frontend
- ESLint for code quality
- TypeScript strict mode

## Contributing

This project is for learning purposes. Feel free to:

- Add new features
- Experiment with AI integrations
- Try different architectures
- Improve the UI/UX
- Add tests

## Next Steps

Here are some ideas for extending this application:

1. **Expand test coverage** - Run `npm test -- --watch` to add more comprehensive tests for existing components
2. **Add SignalR** for real-time WebSocket communication
3. **Implement authentication** using JWT or OAuth
4. **Connect to Claude AI** for intelligent responses
5. **Add MCP servers** for external integrations
6. **Implement persistence** with Entity Framework Core
7. **Add backend unit tests** using xUnit for C# API endpoints
8. **Create chat rooms** or channels
9. **Add file upload** capability
10. **Implement message reactions** (emoji)
11. **Add dark mode** toggle

## License

This is a learning project. Use it however you like!
