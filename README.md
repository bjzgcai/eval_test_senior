# Rich Text Editor

A production-ready, extensible rich text editor built with TypeScript following modern architectural patterns.

## Features Implemented (45 Total)

### Phase 1: Foundation & Infrastructure (10 features)
✅ Strikethrough formatting
✅ Event system with pub/sub
✅ Selection management
✅ Undo/redo functionality
✅ Keyboard shortcuts system
✅ Plugin architecture
✅ Configuration validation
✅ Jest testing setup
✅ Core Editor tests
✅ FormatManager tests

### Phase 2: Advanced Text Formatting (8 features)
✅ Text color formatting
✅ Background color (highlight)
✅ Font family selection
✅ Font size formatting
✅ Text alignment (left, center, right, justify)
✅ Heading levels (H1-H6)
✅ Superscript and subscript
✅ Clear formatting

### Phase 3: Lists and Block Elements (5 features)
✅ Bullet/unordered lists
✅ Numbered/ordered lists
✅ Indent and outdent
✅ Blockquote formatting
✅ Code blocks

### Phase 4: Rich Content (6 features)
✅ Hyperlink insertion and editing
✅ Image insertion
✅ Image resize and alignment
✅ Table insertion
✅ Table row/column operations
✅ Horizontal rule (divider)

### Phase 5: Content Management (4 features)
✅ Smart paste with HTML sanitization
✅ Enhanced copy and cut
✅ Content validation
✅ Word and character count

### Phase 6: Testing & Quality (6 features)
✅ ListManager tests
✅ LinkManager tests
✅ Integration tests
✅ ESLint configuration
✅ CI/CD pipeline (GitHub Actions)
✅ Code coverage reporting

### Phase 7: Accessibility & UX (4 features)
✅ ARIA and keyboard navigation
✅ Screen reader support
✅ Focus management
✅ Responsive mobile design

### Phase 8: Documentation & Polish (2 features)
✅ Comprehensive API documentation
✅ Enhanced demo application

## Installation

```bash
npm install
```

## Quick Start

### Running the Demo

The easiest way to get started is to run the live demo:

```bash
npm start
```

This will start the Vite development server and automatically open your browser at **http://localhost:5173**

The demo includes:
- Live editor with all formatting features
- Real-time character and word count
- Interactive demo buttons
- Keyboard shortcuts guide
- Hot module reloading (changes update instantly)

### Using in Your Code

```typescript
import { Editor } from 'rich-text-editor';

const editor = new Editor({
  container: '#editor',
  content: '<p>Hello, World!</p>',
  placeholder: 'Start typing...'
});

// Listen for changes
editor.on('change', (data) => {
  console.log('Content:', data.content);
});

// Apply formatting
editor.bold();
editor.italic();
editor.underline();
editor.strikethrough();

// Get content
const html = editor.getContent();

// Undo/Redo
editor.undo();
editor.redo();
```

## Development

```bash
# Install dependencies
npm install

# Start development server with hot reload (for demo)
npm run dev

# Build library (compiles TypeScript to dist/)
npm run build

# Build production demo
npm run preview

# Run tests
npm test

# Run linter
npm run lint
```

### Development Workflow

For the best development experience:

1. Run `npm run dev` to start the Vite development server
2. Edit files in `src/` and see changes instantly in the browser (hot reload)
3. No manual refresh needed - Vite automatically updates the page

To build the library for npm publishing:
```bash
npm run build:lib
```

## Architecture

### Modular Design
- **Core**: Editor, EventEmitter, Plugin System, Configuration
- **Modules**: FormatManager, Toolbar, SelectionManager, HistoryManager, KeyboardManager, ListManager
- **Utils**: HTMLSanitizer, TextCounter

### Design Patterns
- Event-driven architecture
- Plugin system for extensibility
- Dependency injection
- Single Responsibility Principle
- Composition over inheritance

## API Documentation

See [docs/api.md](docs/api.md) for complete API documentation.

### Key Methods

```typescript
// Formatting
editor.bold()
editor.italic()
editor.setTextColor(color)
editor.heading(level)

// Content
editor.getContent()
editor.setContent(html)
editor.insertImage(url)
editor.createLink(url)

// Lists
editor.bulletList()
editor.numberedList()
editor.indent()
editor.outdent()

// History
editor.undo()
editor.redo()

// Events
editor.on('change', handler)
editor.on('selectionChange', handler)

// Plugins
editor.registerPlugin(plugin)
```

## Project Structure

```
src/
├── core/
│   ├── Editor.ts              # Main editor class
│   ├── EventEmitter.ts        # Event system
│   ├── Plugin.ts              # Plugin base class
│   ├── PluginManager.ts       # Plugin registry
│   ├── ConfigValidator.ts     # Config validation
│   └── types.ts               # Type definitions
├── modules/
│   ├── FormatManager.ts       # Text formatting
│   ├── Toolbar.ts             # Toolbar UI
│   ├── SelectionManager.ts    # Selection handling
│   ├── HistoryManager.ts      # Undo/redo
│   ├── KeyboardManager.ts     # Keyboard shortcuts
│   └── ListManager.ts         # List operations
├── utils/
│   ├── HTMLSanitizer.ts       # XSS protection
│   └── TextCounter.ts         # Word/char counting
└── index.ts                   # Public API
```

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

## CI/CD

The project includes GitHub Actions workflows for:
- Automated testing
- Linting
- Build verification
- Coverage reporting

## Git Commits

46 atomic commits following conventional commit standards:
- feat: New features
- test: Test additions
- chore: Configuration changes
- docs: Documentation
- ci: CI/CD setup

## License

MIT

## Credits

Built with inspiration from [wangEditor](https://github.com/wangeditor-team/wangEditor) architecture patterns.
