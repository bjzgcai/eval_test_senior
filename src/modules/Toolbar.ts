/**
 * Toolbar module
 * Provides a UI toolbar with formatting buttons
 */

import type { Editor } from '../core/Editor';

interface ToolbarButton {
  command: string;
  label: string;
  title: string;
}

export class Toolbar {
  private editor: Editor;
  private toolbarElement: HTMLDivElement;
  private buttons: ToolbarButton[] = [
    { command: 'bold', label: 'B', title: 'Bold (Ctrl+B)' },
    { command: 'italic', label: 'I', title: 'Italic (Ctrl+I)' },
    { command: 'underline', label: 'U', title: 'Underline (Ctrl+U)' },
    { command: 'strikethrough', label: 'S', title: 'Strikethrough' },
  ];

  constructor(editor: Editor) {
    this.editor = editor;
    this.toolbarElement = this.createToolbar();
  }

  /**
   * Create the toolbar element with buttons
   */
  private createToolbar(): HTMLDivElement {
    const toolbar = document.createElement('div');
    toolbar.className = 'rte-toolbar';
    this.applyToolbarStyles(toolbar);

    // Create buttons
    this.buttons.forEach((btnConfig) => {
      const button = this.createButton(btnConfig);
      toolbar.appendChild(button);
    });

    return toolbar;
  }

  /**
   * Apply toolbar styles
   */
  private applyToolbarStyles(toolbar: HTMLDivElement): void {
    Object.assign(toolbar.style, {
      display: 'flex',
      gap: '4px',
      padding: '8px',
      borderBottom: '1px solid #d0d7de',
      backgroundColor: '#f6f8fa',
      borderRadius: '6px 6px 0 0',
    });
  }

  /**
   * Create a toolbar button
   */
  private createButton(config: ToolbarButton): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = 'rte-toolbar-button';
    button.textContent = config.label;
    button.title = config.title;
    button.type = 'button';

    this.applyButtonStyles(button);

    // Handle button click
    button.addEventListener('click', (e) => {
      e.preventDefault();
      this.executeCommand(config.command);
    });

    return button;
  }

  /**
   * Apply button styles
   */
  private applyButtonStyles(button: HTMLButtonElement): void {
    Object.assign(button.style, {
      width: '32px',
      height: '32px',
      border: '1px solid #d0d7de',
      borderRadius: '6px',
      backgroundColor: '#fff',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s',
    });

    // Add hover effect
    button.addEventListener('mouseenter', () => {
      button.style.backgroundColor = '#f3f4f6';
    });

    button.addEventListener('mouseleave', () => {
      button.style.backgroundColor = '#fff';
    });
  }

  /**
   * Execute a formatting command
   */
  private executeCommand(command: string): void {
    switch (command) {
      case 'bold':
        this.editor.bold();
        break;
      case 'italic':
        this.editor.italic();
        break;
      case 'underline':
        this.editor.underline();
        break;
      case 'strikethrough':
        this.editor.strikethrough();
        break;
    }
  }

  /**
   * Get the toolbar element
   */
  public getElement(): HTMLDivElement {
    return this.toolbarElement;
  }
}
