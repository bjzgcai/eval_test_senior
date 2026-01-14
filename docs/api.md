# Rich Text Editor API Documentation

## Editor Class

### Constructor

```typescript
new Editor(config: EditorConfig)
```

Creates a new editor instance.

**Parameters:**
- `config.container`: string | HTMLElement - The container for the editor
- `config.content?`: string - Initial HTML content
- `config.placeholder?`: string - Placeholder text
- `config.readOnly?`: boolean - Read-only mode

### Text Formatting Methods

- `bold()` - Toggle bold formatting
- `italic()` - Toggle italic formatting
- `underline()` - Toggle underline formatting
- `strikethrough()` - Toggle strikethrough formatting
- `superscript()` - Toggle superscript
- `subscript()` - Toggle subscript
- `clearFormat()` - Remove all formatting

### Color and Font Methods

- `setTextColor(color: string)` - Set text color
- `setBackgroundColor(color: string)` - Set background color
- `setFontFamily(font: string)` - Set font family
- `setFontSize(size: string)` - Set font size

### Alignment Methods

- `alignLeft()` - Align text left
- `alignCenter()` - Align text center
- `alignRight()` - Align text right
- `alignJustify()` - Justify text

### Block Formatting

- `heading(level: 1-6)` - Format as heading
- `paragraph()` - Format as paragraph
- `blockquote()` - Insert blockquote
- `codeBlock()` - Insert code block

### Lists

- `bulletList()` - Insert bullet list
- `numberedList()` - Insert numbered list
- `indent()` - Indent
- `outdent()` - Outdent

### Content Insertion

- `createLink(url: string)` - Create hyperlink
- `unlink()` - Remove hyperlink
- `insertImage(url: string)` - Insert image
- `insertHorizontalRule()` - Insert horizontal rule
- `insertText(text: string)` - Insert plain text
- `insertHTML(html: string)` - Insert HTML

### History

- `undo()` - Undo last action
- `redo()` - Redo last undone action
- `canUndo()` - Check if undo is available
- `canRedo()` - Check if redo is available

### Content Management

- `getContent()` - Get HTML content
- `setContent(html: string)` - Set HTML content
- `getSelectedText()` - Get selected text
- `getSelection()` - Get current selection
- `getRange()` - Get current range

### Event Handling

- `on(event: EditorEventType, handler: EventHandler)` - Register event listener
- `off(event: EditorEventType, handler: EventHandler)` - Remove event listener
- `once(event: EditorEventType, handler: EventHandler)` - One-time event listener

**Event Types:**
- `change` - Content changed
- `focus` - Editor focused
- `blur` - Editor blurred
- `selectionChange` - Selection changed
- `keydown` - Key pressed
- `keyup` - Key released
- `paste` - Content pasted
- `formatChange` - Formatting changed
- `mounted` - Editor mounted
- `destroyed` - Editor destroyed

### Plugin System

- `registerPlugin(plugin: Plugin)` - Register a plugin
- `unregisterPlugin(name: string)` - Unregister a plugin
- `getPluginManager()` - Get plugin manager

### Utility Methods

- `focus()` - Focus the editor
- `destroy()` - Destroy the editor instance
- `getSelectionManager()` - Get selection manager
- `getHistoryManager()` - Get history manager
- `getKeyboardManager()` - Get keyboard manager

## Example Usage

```typescript
import { Editor } from 'rich-text-editor';

// Create editor
const editor = new Editor({
  container: '#editor',
  content: '<p>Hello World!</p>',
  placeholder: 'Start typing...'
});

// Listen for changes
editor.on('change', (data) => {
  console.log('Content changed:', data.content);
});

// Apply formatting
editor.bold();
editor.setTextColor('#ff0000');
editor.heading(1);

// Get content
const html = editor.getContent();

// Clean up
editor.destroy();
```

## Plugin Development

```typescript
import { Plugin } from 'rich-text-editor';

class MyPlugin extends Plugin {
  constructor() {
    super({ name: 'my-plugin', version: '1.0.0' });
  }

  protected onInit(): void {
    // Initialize plugin
    console.log('Plugin initialized');
  }

  public onDestroy(): void {
    // Cleanup
    console.log('Plugin destroyed');
  }
}

// Register plugin
editor.registerPlugin(new MyPlugin());
```
