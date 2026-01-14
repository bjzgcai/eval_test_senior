# Rich Text Editor

A production-ready rich text editor built from scratch with TypeScript, following modern architectural patterns and best practices.

## Features

- **Core Editor**: Contenteditable-based text editing
- **Text Formatting**: Bold, Italic, Underline
- **Modular Architecture**: Extensible design with clear separation of concerns
- **Type Safe**: Full TypeScript support with strict type checking

## Installation

```bash
npm install
```

## Development

```bash
# Build the project
npm run build

# Watch mode for development
npm run dev

# Run tests
npm test
```

## Usage

```typescript
import { Editor } from 'rich-text-editor';

const editor = new Editor({
  container: '#editor-container',
  content: '<p>Hello, World!</p>',
  placeholder: 'Start typing...'
});
```

## Project Structure

```
src/
├── core/           # Core editor functionality
├── modules/        # Feature modules (formatting, toolbar, etc.)
└── index.ts        # Main entry point
```

## License

MIT
