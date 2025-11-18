# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Claude Learning Project is a Progressive Web App (PWA) chat application with a monorepo structure:

- **Backend**: ASP.NET Core 8.0 Minimal APIs (C#)
- **Frontend**: React 18 + TypeScript + Vite
- **Purpose**: Learning platform for Claude AI, AI agents, MCP servers, and modern web development

## Architecture

### Backend (ASP.NET Core Minimal APIs)
- **Pattern**: Minimal APIs (functional endpoints in `Program.cs`, not controllers)
- **Storage**: In-memory thread-safe `ConcurrentBag<ChatMessage>` in `ChatService`
- **CORS**: Configured for localhost:5173, 5174, 4173 (frontend dev servers)
- **Swagger**: Enabled in Development mode at `/swagger`

### Frontend (React + Vite)
- **Data Flow**: Polling-based updates (2-second interval via `setInterval`)
- **State Management**: React hooks (useState, useEffect) - no external state library
- **API Communication**: Native `fetch` in `services/api.ts` with TypeScript types
- **Proxy**: Vite proxies `/api/*` to `http://localhost:5000` (configured in vite.config.ts)
- **PWA**: Service worker and manifest configured via `vite-plugin-pwa`

### Key Architectural Decisions
1. **Separation of Concerns**: Backend and frontend are completely separate - backend does not serve frontend
2. **Type Safety**: Matching TypeScript interfaces (`types/chat.ts`) and C# models (`Models/`)
3. **Simplicity Over Features**: In-memory storage, polling (not WebSockets), no database - optimized for learning
4. **PWA-First**: Application is installable and offline-capable from day one

## Common Commands

### Backend (API)

```bash
# Build the API
dotnet build src/ClaudeLearningProject.Api/ClaudeLearningProject.Api.csproj

# Run the API (on port 5000)
dotnet run --project src/ClaudeLearningProject.Api/ClaudeLearningProject.Api.csproj --urls http://localhost:5000

# Watch mode (hot reload)
dotnet watch --project src/ClaudeLearningProject.Api/ClaudeLearningProject.Api.csproj --urls http://localhost:5000
```

### Frontend

```bash
# Install dependencies (first time or after package.json changes)
cd src/frontend
npm install

# Development server (runs on port 5173 with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint TypeScript/React code
npm run lint
```

### Debugging in VS Code

**Full Stack Debugging:**
- Press `F5` → Select **"Launch API + Frontend"**
- Backend debugger: coreclr (C# breakpoints work)
- Frontend debugger: Chrome DevTools Protocol (TypeScript breakpoints work in browser)

**Backend Only:**
- Press `F5` → Select **"Launch API"**
- Set breakpoints in C# code (Program.cs, Services, Models)

**Frontend Only:**
- Press `F5` → Select **"Launch Frontend (Chrome)"**
- Set breakpoints in TypeScript/React code
- Chrome opens with debugger attached

**Important**: Source maps are enabled in vite.config.ts (`build.sourcemap: true`) for TypeScript debugging

### Running Without Debugging

Use VS Code tasks:
- `Ctrl+Shift+P` → "Tasks: Run Task" → **"dev-all"** (runs both servers as background tasks)
- Or run individually: `run-api`, `dev-frontend`

## Project Configuration

### Backend (.NET 8.0)
- **Target Framework**: .NET 8.0
- **Implicit Usings**: Enabled
- **Nullable Reference Types**: Enabled
- **Packages**: Microsoft.AspNetCore.OpenApi, Swashbuckle.AspNetCore

### Frontend (React + TypeScript)
- **TypeScript**: v5.2 with strict mode enabled
- **Build Tool**: Vite 5
- **Linting**: ESLint with TypeScript support
- **PWA Plugin**: vite-plugin-pwa with Workbox

## API Endpoints

All endpoints are prefixed with `/api`:

- `GET /api/health` - Health check (returns status and timestamp)
- `GET /api/messages` - Get all messages (sorted by timestamp)
- `POST /api/messages` - Send message (body: `{username, content}`)
- `DELETE /api/messages` - Clear all messages
- `GET /swagger` - API documentation (Development only)

## Development Guidelines

### When Adding Backend Features

1. **Models**: Add to `src/ClaudeLearningProject.Api/Models/` (use records for DTOs)
2. **Services**: Add to `src/ClaudeLearningProject.Api/Services/` (register as Singleton/Scoped in Program.cs)
3. **Endpoints**: Add to `src/ClaudeLearningProject.Api/Program.cs` using Minimal API syntax:
   ```csharp
   app.MapGet("/api/endpoint", (Dependencies deps) => { })
       .WithName("EndpointName")
       .WithOpenApi();
   ```

### When Adding Frontend Features

1. **Types**: Define interfaces in `src/frontend/src/types/` to match backend models
2. **API Client**: Add methods to `src/frontend/src/services/api.ts` (use existing `fetchApi` helper)
3. **Components**: Create in `src/frontend/src/components/` (functional components with hooks only)
4. **State**: Use `useState` for local state, lift state up to parent components as needed

### Testing Changes

- **Backend**: Test via Swagger UI at http://localhost:5000/swagger or use curl
- **Frontend**: Open http://localhost:5173 in browser
- **Integration**: Run both and test through UI

### Code Style

- **C#**: Implicit usings, nullable reference types, Minimal API pattern
- **TypeScript**: Strict mode, explicit return types on exported functions
- **React**: Functional components with hooks (no class components)
- **Naming**: PascalCase (C# classes/methods), camelCase (TypeScript/JS variables/functions)

## Important Technical Details

### Frontend-Backend Communication
- Frontend proxies `/api` to `http://localhost:5000` in development (vite.config.ts server.proxy)
- Production builds need reverse proxy or CORS configuration
- API client handles 204 No Content responses (DELETE endpoint)

### State Management Pattern
```typescript
// ChatWindow.tsx pattern:
useEffect(() => {
  loadMessages();
  const interval = setInterval(loadMessages, 2000);
  return () => clearInterval(interval); // Cleanup
}, []);
```

### In-Memory Storage Limitations
- Messages lost on API restart
- No persistence between sessions
- Thread-safe via `ConcurrentBag` but limited scalability
- Consider SQLite/SQL Server for production scenarios

### PWA Configuration
- Manifest in vite.config.ts (VitePWA plugin)
- Service worker auto-generated by Workbox
- Requires HTTPS in production (localhost exempt)
- Icons needed: pwa-192x192.png, pwa-512x512.png

## Context7 Usage

Use Context7 MCP server to check up-to-date documentation when:
- Adding new npm packages (check latest API patterns)
- Implementing ASP.NET Core features (Minimal APIs, middleware, etc.)
- Configuring Vite plugins or build settings
- Implementing PWA best practices

Especially useful for: React patterns, ASP.NET Core 8.0 features, Vite 5 configuration, TypeScript strict mode issues

## Future Enhancement Paths

This project is designed for experimentation. Common extensions:

1. **Real-time Communication**: Replace polling with SignalR (WebSocket-based)
2. **AI Integration**: Add Claude AI for intelligent chat responses
3. **MCP Servers**: Connect to external services for enhanced functionality
4. **Persistence**: Add Entity Framework Core with SQLite/SQL Server
5. **Authentication**: Implement JWT or OAuth for user management
6. **Testing**: Add xUnit (backend) and Vitest (frontend) test suites

## Common Gotchas

- **Port Conflicts**: Backend must run on 5000, frontend on 5173 (hardcoded in configs)
- **npm install Issues**: If esbuild/rollup fails, remove `package-lock.json` and `node_modules`, then reinstall
- **Breakpoints Not Working**: Ensure using Chrome debugger for frontend (not Node), and `integratedTerminal` for backend
- **CORS Errors**: Check that backend CORS allows the frontend origin
- **Stale Data**: Frontend caches username in localStorage - clear browser storage to reset
