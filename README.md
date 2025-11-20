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

## UI Components

The project includes reusable, accessible UI components located in `src/frontend/src/components/ui/`.

### WeaponPicker Component

A carousel-style UI component for selecting medieval combat weapons with full accessibility support.

**Location:** `src/frontend/src/components/ui/WeaponPicker/`

#### Features

- **Interactive Carousel**: Navigate between 4 medieval weapons (Longsword, Battle Axe, War Hammer, Bow & Arrow)
- **Multiple Navigation Methods**:
  - Previous/Next buttons for mouse/touch users
  - Weapon indicator buttons for direct selection
  - Keyboard navigation (Arrow keys, Home, End)
- **Fully Accessible**: WCAG 2.1 AA compliant
  - High-contrast focus indicators
  - ARIA live regions for screen readers
  - Semantic HTML and proper ARIA labels
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Smooth Animations**: Fade-in transitions with gradient backgrounds
- **Comprehensive Tests**: 10 test cases covering all functionality

#### Usage

```typescript
import { WeaponPicker } from './components/ui/WeaponPicker/WeaponPicker';

function MyComponent() {
  const handleWeaponSelect = (weapon) => {
    console.log('Selected:', weapon.name);
  };

  return <WeaponPicker onWeaponSelect={handleWeaponSelect} />;
}
```

#### Props

```typescript
interface WeaponPickerProps {
  onWeaponSelect?: (weapon: Weapon) => void;
}

interface Weapon {
  id: number;
  name: string;
  icon: string;
  description: string;
}
```

#### Keyboard Navigation

- **Tab**: Navigate between interactive elements
- **Arrow Left**: Select previous weapon
- **Arrow Right**: Select next weapon
- **Home**: Jump to first weapon
- **End**: Jump to last weapon

#### Accessibility Features

- **Focus Indicators**: Clear visual feedback for keyboard navigation
- **Color Contrast**: All elements meet WCAG AA standards (4.5:1 ratio minimum)
- **Screen Reader Support**: Announces weapon changes with name, description, and position
- **ARIA Labels**: All buttons have descriptive labels for assistive technologies
- **Keyboard Navigation**: Full functionality available without a mouse

#### Testing

The component includes comprehensive tests:

```bash
cd src/frontend
npm test WeaponPicker.test.tsx
```

Tests cover:
- Default rendering
- Navigation (previous/next/indicators)
- Circular wrapping behavior
- Callback functionality
- Active state management

#### Customization

The component uses CSS variables from the existing design system:
- Primary color: `#667eea`
- Gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Border radius: `8px` for cards, `12px` for container
- Responsive breakpoints: Mobile (640px), Tablet (768px)

#### File Structure

```
src/components/ui/WeaponPicker/
├── WeaponPicker.tsx       # Component implementation
├── WeaponPicker.css       # Styles with responsive design
└── WeaponPicker.test.tsx  # Test suite (10 tests)
```

---

### Icon Component

A versatile, accessible icon component that supports emojis, SVG, and text with multiple size and color variants.

**Location:** `src/frontend/src/components/ui/Icon/`

#### Features

- **Flexible Content**: Supports emoji, SVG, or text as icon content
- **Size Variants**: Three size options (small, medium, large)
- **Color Variants**: Five color schemes (primary, secondary, success, danger, neutral)
- **Interactive**: Optional click handler with full keyboard support
- **Fully Accessible**:
  - ARIA labels for screen readers
  - Keyboard navigation (Enter/Space for clickable icons)
  - Proper button role when interactive
- **Customizable**: Accepts custom CSS classes
- **Comprehensive Tests**: 16 test cases covering all functionality

#### Usage

```typescript
import { Icon } from './components/ui/Icon/Icon';

function MyComponent() {
  // Static icon
  return <Icon ariaLabel="home">🏠</Icon>;

  // Clickable icon
  return (
    <Icon
      ariaLabel="delete"
      variant="danger"
      onClick={() => handleDelete()}
    >
      🗑️
    </Icon>
  );

  // Custom size and variant
  return (
    <Icon
      size="large"
      variant="success"
      ariaLabel="check"
    >
      ✓
    </Icon>
  );

  // SVG icon
  return (
    <Icon ariaLabel="settings">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M12 8v4l3 3" />
      </svg>
    </Icon>
  );
}
```

#### Props

```typescript
interface IconProps {
  children: React.ReactNode;        // Icon content (emoji, SVG, text)
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  ariaLabel?: string;                // Accessibility label
  onClick?: () => void;              // Optional click handler
  className?: string;                // Custom CSS classes
}
```

#### Size Variants

- **small**: 1.5rem (24px) - Suitable for inline icons
- **medium**: 2rem (32px) - Default size for standard icons
- **large**: 2.5rem (40px) - Prominent icons or headers

#### Color Variants

- **primary**: Purple gradient (`#667eea`) - Main actions
- **secondary**: Gray (`#6b7280`) - Secondary actions
- **success**: Green (`#10b981`) - Positive actions
- **danger**: Red (`#ef4444`) - Destructive actions
- **neutral**: Light gray (`#9ca3af`) - Neutral actions

#### Accessibility Features

- **ARIA Labels**: All icons should have an `ariaLabel` for screen readers
- **Keyboard Support**: Clickable icons respond to Enter and Space keys
- **Button Role**: Interactive icons automatically get `role="button"`
- **Focus Management**: Clickable icons are keyboard-focusable (`tabIndex="0"`)

#### Testing

The component includes comprehensive tests:

```bash
cd src/frontend
npm test Icon.test.tsx
```

Tests cover:
- Rendering with different content types (emoji, SVG, text)
- All size variants
- All color variants
- Click interactions (mouse and keyboard)
- Accessibility attributes
- Custom class names

#### File Structure

```
src/components/ui/Icon/
├── Icon.tsx           # Component implementation
├── Icon.css           # Styles with variants
└── Icon.test.tsx      # Test suite (16 tests)
```

---

### Modal Component

A flexible, accessible modal dialog component with customizable actions and smooth animations.

**Location:** `src/frontend/src/components/ui/Modal/`

#### Features

- **Controlled Component**: Fully controlled visibility via `isOpen` prop
- **Flexible Content**: Accepts any React children as modal body
- **Custom Actions**: Configurable action buttons with variants
- **Multiple Close Methods**:
  - Close button (X)
  - Backdrop click
  - Programmatic via `onClose` callback
- **Smooth Animations**: Fade-in/fade-out transitions
- **Fully Accessible**:
  - ARIA labels for close button
  - Focus management
  - Semantic HTML structure
- **Responsive Design**: Works seamlessly on all screen sizes
- **Comprehensive Tests**: 9 test cases covering all functionality

#### Usage

```typescript
import { Modal } from './components/ui/Modal/Modal';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  // Simple modal
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Confirmation"
    >
      <p>Are you sure you want to continue?</p>
    </Modal>
  );

  // Modal with action buttons
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Delete Item"
      actions={[
        {
          label: 'Cancel',
          onClick: () => setIsOpen(false),
          variant: 'secondary',
        },
        {
          label: 'Delete',
          onClick: () => {
            handleDelete();
            setIsOpen(false);
          },
          variant: 'danger',
        },
      ]}
    >
      <p>This action cannot be undone.</p>
    </Modal>
  );

  // Complex content
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="User Details"
    >
      <form>
        <label>
          Name:
          <input type="text" />
        </label>
        <label>
          Email:
          <input type="email" />
        </label>
      </form>
    </Modal>
  );
}
```

#### Props

```typescript
interface ModalProps {
  isOpen: boolean;                  // Controls modal visibility
  onClose: () => void;              // Called when modal should close
  title: string;                    // Modal header title
  children: ReactNode;              // Modal body content
  actions?: {                       // Optional action buttons
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
  }[];
}
```

#### Action Button Variants

- **primary**: Purple background - Main actions (confirm, submit)
- **secondary**: Gray background - Secondary actions (cancel)
- **danger**: Red background - Destructive actions (delete, remove)

#### Close Behavior

The modal can be closed in three ways:

1. **Close Button**: Click the × button in the header
2. **Backdrop Click**: Click outside the modal content
3. **Programmatic**: Call the `onClose` function (e.g., from action buttons)

#### Accessibility Features

- **ARIA Labels**: Close button has `aria-label="Close modal"`
- **Semantic HTML**: Uses proper heading structure
- **Focus Management**: Modal content is properly contained
- **Keyboard Support**: Standard keyboard interactions

#### Testing

The component includes comprehensive tests:

```bash
cd src/frontend
npm test Modal.test.tsx
```

Tests cover:
- Conditional rendering based on `isOpen`
- Close button functionality
- Backdrop click to close
- Action button rendering and clicks
- Children content rendering
- Footer visibility based on actions

#### File Structure

```
src/components/ui/Modal/
├── Modal.tsx          # Component implementation
├── Modal.css          # Styles with animations
└── Modal.test.tsx     # Test suite (9 tests)
```

#### Customization Example

```typescript
// Confirmation dialog
<Modal
  isOpen={showConfirm}
  onClose={() => setShowConfirm(false)}
  title="Confirm Action"
  actions={[
    { label: 'No', onClick: () => setShowConfirm(false), variant: 'secondary' },
    { label: 'Yes', onClick: handleConfirm, variant: 'primary' },
  ]}
>
  <p>Do you want to proceed with this action?</p>
</Modal>

// Alert dialog (no actions)
<Modal
  isOpen={showAlert}
  onClose={() => setShowAlert(false)}
  title="Important Notice"
>
  <p>Your session will expire in 5 minutes.</p>
</Modal>

// Form dialog
<Modal
  isOpen={showForm}
  onClose={() => setShowForm(false)}
  title="Add New User"
  actions={[
    { label: 'Cancel', onClick: () => setShowForm(false), variant: 'secondary' },
    { label: 'Save', onClick: handleSave, variant: 'primary' },
  ]}
>
  <UserForm onSubmit={handleSave} />
</Modal>
```

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
