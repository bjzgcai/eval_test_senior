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
editor.setTextColor('#ff0000');
editor.heading(1);
```

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run linter
npm run lint

# Watch mode
npm run dev
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
