/**
 * Toolbar module
 * Provides a configurable UI toolbar with formatting buttons
 */

import type { Editor } from '../core/Editor';
import type { ToolbarButtonConfig, ToolbarGroupConfig } from '../core/types';

export class Toolbar {
  private editor: Editor;
  private toolbarElement: HTMLDivElement;
  private groups: ToolbarGroupConfig[];
  private buttonElements: Map<string, HTMLElement> = new Map();

  constructor(editor: Editor, groups: ToolbarGroupConfig[]) {
    this.editor = editor;
    this.groups = groups;
    this.toolbarElement = this.createToolbar();
    this.attachSelectionListener();
  }

  /**
   * Create the toolbar element with button groups
   */
  private createToolbar(): HTMLDivElement {
    const toolbar = document.createElement('div');
    toolbar.className = 'rte-toolbar';
    this.applyToolbarStyles(toolbar);

    // Create button groups with separators
    this.groups.forEach((group, index) => {
      const groupElement = this.createButtonGroup(group);
      toolbar.appendChild(groupElement);

      // Add separator between groups (except after last group)
      if (index < this.groups.length - 1) {
        const separator = this.createSeparator();
        toolbar.appendChild(separator);
      }
    });

    return toolbar;
  }

  /**
   * Create a button group
   */
  private createButtonGroup(group: ToolbarGroupConfig): HTMLDivElement {
    const groupEl = document.createElement('div');
    groupEl.className = 'rte-toolbar-group';
    Object.assign(groupEl.style, {
      display: 'flex',
      gap: '4px',
    });

    group.buttons.forEach((btnConfig) => {
      const button = this.createButtonElement(btnConfig);
      groupEl.appendChild(button);

      // Store button reference for state updates
      this.buttonElements.set(btnConfig.command, button);
    });

    return groupEl;
  }

  /**
   * Create a button element based on type
   */
  private createButtonElement(config: ToolbarButtonConfig): HTMLElement {
    switch (config.type) {
      case 'dropdown':
        return this.createDropdownButton(config);
      case 'color':
        return this.createColorButton(config);
      case 'separator':
        return this.createSeparator();
      case 'button':
      default:
        return this.createButton(config);
    }
  }

  /**
   * Create a standard button
   */
  private createButton(config: ToolbarButtonConfig): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = 'rte-toolbar-button';
    button.textContent = config.icon || config.label || config.command;
    button.title = config.title;
    button.type = 'button';
    button.dataset.command = config.command;

    this.applyButtonStyles(button);

    button.addEventListener('click', (e) => {
      e.preventDefault();
      this.executeCommand(config);
    });

    return button;
  }

  /**
   * Create a dropdown button
   */
  private createDropdownButton(config: ToolbarButtonConfig): HTMLElement {
    const container = document.createElement('div');
    container.className = 'rte-toolbar-dropdown';
    container.style.position = 'relative';

    const select = document.createElement('select');
    select.className = 'rte-toolbar-select';
    select.title = config.title;

    Object.assign(select.style, {
      height: '32px',
      border: '1px solid #d0d7de',
      borderRadius: '6px',
      backgroundColor: '#fff',
      cursor: 'pointer',
      fontSize: '13px',
      padding: '0 8px',
    });

    config.options?.forEach((option) => {
      const optionEl = document.createElement('option');
      optionEl.value = option.value;
      optionEl.textContent = option.label;
      select.appendChild(optionEl);
    });

    select.addEventListener('change', (e) => {
      const value = (e.target as HTMLSelectElement).value;
      this.executeCommand(config, value);
    });

    container.appendChild(select);
    return container;
  }

  /**
   * Create a color picker button
   */
  private createColorButton(config: ToolbarButtonConfig): HTMLElement {
    const container = document.createElement('div');
    container.className = 'rte-toolbar-color';
    container.style.position = 'relative';

    const button = document.createElement('button');
    button.className = 'rte-toolbar-button';
    button.textContent = config.icon || 'A';
    button.title = config.title;
    button.type = 'button';

    this.applyButtonStyles(button);

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = config.defaultColor || '#000000';
    Object.assign(colorInput.style, {
      position: 'absolute',
      opacity: '0',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      cursor: 'pointer',
    });

    colorInput.addEventListener('change', (e) => {
      const color = (e.target as HTMLInputElement).value;
      this.executeCommand(config, color);
    });

    container.appendChild(button);
    container.appendChild(colorInput);

    return container;
  }

  /**
   * Create a separator
   */
  private createSeparator(): HTMLDivElement {
    const separator = document.createElement('div');
    separator.className = 'rte-toolbar-separator';
    Object.assign(separator.style, {
      width: '1px',
      backgroundColor: '#d0d7de',
      margin: '0 4px',
    });
    return separator;
  }

  /**
   * Execute a formatting command
   */
  private executeCommand(config: ToolbarButtonConfig, value?: string): void {
    const command = config.command;

    // Handle commands that need prompts
    if (config.prompt) {
      this.executePromptCommand(command);
      return;
    }

    // Route to appropriate handler
    if (this.isEditorMethod(command)) {
      this.executeEditorMethod(command);
    } else if (this.isFormatCommand(command)) {
      this.executeFormatCommand(command, value);
    } else if (this.isCustomCommand(command)) {
      this.executeCustomCommand(command);
    }

    // Update button states
    this.updateButtonStates();
  }

  /**
   * Execute commands that need user prompts
   */
  private executePromptCommand(command: string): void {
    switch (command) {
      case 'createLink': {
        const url = prompt('Enter URL:');
        if (url) {
          this.editor.createLink(url);
        }
        break;
      }
      case 'insertImage': {
        const url = prompt('Enter image URL:');
        if (url) {
          this.editor.insertImage(url);
        }
        break;
      }
    }
  }

  /**
   * Check if command is an editor public method
   */
  private isEditorMethod(command: string): boolean {
    return ['undo', 'redo', 'bold', 'italic', 'underline', 'strikethrough'].includes(command);
  }

  /**
   * Execute editor public method
   */
  private executeEditorMethod(command: string): void {
    switch (command) {
      case 'undo':
        this.editor.undo();
        break;
      case 'redo':
        this.editor.redo();
        break;
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
   * Check if command is a format command (handled by FormatManager)
   */
  private isFormatCommand(command: string): boolean {
    return [
      'subscript',
      'superscript',
      'insertUnorderedList',
      'insertOrderedList',
      'indent',
      'outdent',
      'justifyLeft',
      'justifyCenter',
      'justifyRight',
      'justifyFull',
      'insertHorizontalRule',
      'removeFormat',
      'foreColor',
      'backColor',
      'fontName',
      'fontSize',
      'formatBlock',
      'unlink',
    ].includes(command);
  }

  /**
   * Execute format command via FormatManager
   */
  private executeFormatCommand(command: string, value?: string): void {
    const formatManager = this.editor.getFormatManager();

    // Commands with values
    if (value) {
      if (command === 'formatBlock') {
        formatManager.formatBlock(value);
      } else if (command === 'foreColor') {
        formatManager.setTextColor(value);
      } else if (command === 'backColor') {
        formatManager.setBackgroundColor(value);
      } else if (command === 'fontName') {
        formatManager.setFontName(value);
      } else if (command === 'fontSize') {
        formatManager.setFontSize(value);
      }
      return;
    }

    // Commands without values
    switch (command) {
      case 'subscript':
        formatManager.subscript();
        break;
      case 'superscript':
        formatManager.superscript();
        break;
      case 'insertUnorderedList':
        formatManager.insertUnorderedList();
        break;
      case 'insertOrderedList':
        formatManager.insertOrderedList();
        break;
      case 'indent':
        formatManager.indent();
        break;
      case 'outdent':
        formatManager.outdent();
        break;
      case 'justifyLeft':
        formatManager.justifyLeft();
        break;
      case 'justifyCenter':
        formatManager.justifyCenter();
        break;
      case 'justifyRight':
        formatManager.justifyRight();
        break;
      case 'justifyFull':
        formatManager.justifyFull();
        break;
      case 'insertHorizontalRule':
        formatManager.insertHorizontalRule();
        break;
      case 'removeFormat':
        formatManager.removeFormat();
        break;
      case 'unlink':
        formatManager.unlink();
        break;
    }
  }

  /**
   * Check if command is a custom command
   */
  private isCustomCommand(command: string): boolean {
    return ['quote', 'code', 'codeBlock', 'createLink', 'insertImage'].includes(command);
  }

  /**
   * Execute custom command
   */
  private executeCustomCommand(command: string): void {
    switch (command) {
      case 'quote':
        this.editor.insertBlockquote();
        break;
      case 'code':
        this.editor.insertInlineCode();
        break;
      case 'codeBlock':
        this.editor.insertCodeBlock();
        break;
    }
  }

  /**
   * Update button states based on current selection
   */
  private updateButtonStates(): void {
    this.buttonElements.forEach((element, command) => {
      const button = element.querySelector('button') || element;
      const isActive = this.isCommandActive(command);

      if (isActive) {
        button.classList.add('active');
        (button as HTMLElement).style.backgroundColor = '#e0e7ff';
      } else {
        button.classList.remove('active');
        (button as HTMLElement).style.backgroundColor = '#fff';
      }
    });
  }

  /**
   * Check if a command is currently active
   */
  private isCommandActive(command: string): boolean {
    // Use editor's isXXX methods for existing commands
    switch (command) {
      case 'bold':
        return this.editor.isBold();
      case 'italic':
        return this.editor.isItalic();
      case 'underline':
        return this.editor.isUnderline();
      case 'strikeThrough':
      case 'strikethrough':
        return this.editor.isStrikethrough();
      default:
        // Use queryCommandState for others
        try {
          return document.queryCommandState(command);
        } catch {
          return false;
        }
    }
  }

  /**
   * Attach selection change listener to update button states
   */
  private attachSelectionListener(): void {
    this.editor.on('selectionChange', () => {
      this.updateButtonStates();
    });
  }

  /**
   * Apply toolbar styles
   */
  private applyToolbarStyles(toolbar: HTMLDivElement): void {
    Object.assign(toolbar.style, {
      display: 'flex',
      gap: '8px',
      padding: '8px',
      borderBottom: '1px solid #d0d7de',
      backgroundColor: '#f6f8fa',
      borderRadius: '6px 6px 0 0',
      flexWrap: 'wrap',
    });
  }

  /**
   * Apply button styles
   */
  private applyButtonStyles(button: HTMLButtonElement): void {
    Object.assign(button.style, {
      minWidth: '32px',
      height: '32px',
      padding: '0 8px',
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
      if (!button.classList.contains('active')) {
        button.style.backgroundColor = '#f3f4f6';
      }
    });

    button.addEventListener('mouseleave', () => {
      if (!button.classList.contains('active')) {
        button.style.backgroundColor = '#fff';
      }
    });
  }

  /**
   * Get the toolbar element
   */
  public getElement(): HTMLDivElement {
    return this.toolbarElement;
  }

  /**
   * Destroy toolbar and cleanup
   */
  public destroy(): void {
    this.buttonElements.clear();
  }
}
