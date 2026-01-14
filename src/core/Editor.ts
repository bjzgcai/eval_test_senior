/**
 * Core Editor class
 * Handles the main editor initialization, DOM management, and content editing
 */

import type { EditorConfig } from './types';
import { FormatManager } from '../modules/FormatManager';
import { Toolbar } from '../modules/Toolbar';

export class Editor {
  private container: HTMLElement;
  private wrapperElement: HTMLDivElement;
  private editorElement: HTMLDivElement;
  private config: Required<EditorConfig>;
  private formatManager: FormatManager;
  private toolbar: Toolbar;

  constructor(config: EditorConfig) {
    // Validate and resolve container
    const container = this.resolveContainer(config.container);
    if (!container) {
      throw new Error('Invalid container: Element not found');
    }
    this.container = container;

    // Set default configuration
    this.config = {
      container: config.container,
      content: config.content || '',
      placeholder: config.placeholder || 'Start typing...',
      readOnly: config.readOnly || false,
    };

    // Initialize editor
    this.editorElement = this.createEditorElement();
    this.wrapperElement = this.createWrapper();

    // Initialize modules
    this.formatManager = new FormatManager(this.editorElement);
    this.toolbar = new Toolbar(this);

    // Mount everything
    this.mount();
    this.initializeContent();
  }

  /**
   * Resolve container from string selector or HTMLElement
   */
  private resolveContainer(container: string | HTMLElement): HTMLElement | null {
    if (typeof container === 'string') {
      return document.querySelector(container);
    }
    return container;
  }

  /**
   * Create wrapper element to hold toolbar and editor
   */
  private createWrapper(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'rte-wrapper';
    Object.assign(wrapper.style, {
      border: '1px solid #d0d7de',
      borderRadius: '6px',
      overflow: 'hidden',
    });
    return wrapper;
  }

  /**
   * Create the main editor element with contenteditable
   */
  private createEditorElement(): HTMLDivElement {
    const editor = document.createElement('div');
    editor.className = 'rte-editor';
    editor.contentEditable = (!this.config.readOnly).toString();
    editor.setAttribute('role', 'textbox');
    editor.setAttribute('aria-multiline', 'true');

    if (this.config.placeholder) {
      editor.setAttribute('data-placeholder', this.config.placeholder);
    }

    // Apply basic styles
    this.applyEditorStyles(editor);

    return editor;
  }

  /**
   * Apply essential editor styles
   */
  private applyEditorStyles(editor: HTMLDivElement): void {
    Object.assign(editor.style, {
      minHeight: '200px',
      padding: '12px',
      border: 'none',
      borderTop: '1px solid #d0d7de',
      borderRadius: '0 0 6px 6px',
      outline: 'none',
      fontSize: '14px',
      lineHeight: '1.6',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#fff',
    });

    // Add placeholder styles via CSS
    const style = document.createElement('style');
    style.textContent = `
      .rte-editor[data-placeholder]:empty::before {
        content: attr(data-placeholder);
        color: #6e7781;
        pointer-events: none;
      }
      .rte-editor:focus {
        border-color: #0969da;
        box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.1);
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Mount the editor to the container
   */
  private mount(): void {
    // Assemble the editor
    this.wrapperElement.appendChild(this.toolbar.getElement());
    this.wrapperElement.appendChild(this.editorElement);
    this.container.appendChild(this.wrapperElement);
  }

  /**
   * Initialize editor content
   */
  private initializeContent(): void {
    if (this.config.content) {
      this.editorElement.innerHTML = this.config.content;
    }
  }

  /**
   * Get the current editor content
   */
  public getContent(): string {
    return this.editorElement.innerHTML;
  }

  /**
   * Set editor content
   */
  public setContent(content: string): void {
    this.editorElement.innerHTML = content;
  }

  /**
   * Focus the editor
   */
  public focus(): void {
    this.editorElement.focus();
  }

  /**
   * Destroy the editor instance
   */
  public destroy(): void {
    this.container.removeChild(this.wrapperElement);
  }

  /**
   * Apply bold formatting to selected text
   */
  public bold(): void {
    this.formatManager.toggleBold();
  }

  /**
   * Check if bold formatting is active
   */
  public isBold(): boolean {
    return this.formatManager.isBold();
  }

  /**
   * Apply italic formatting to selected text
   */
  public italic(): void {
    this.formatManager.toggleItalic();
  }

  /**
   * Check if italic formatting is active
   */
  public isItalic(): boolean {
    return this.formatManager.isItalic();
  }

  /**
   * Apply underline formatting to selected text
   */
  public underline(): void {
    this.formatManager.toggleUnderline();
  }

  /**
   * Check if underline formatting is active
   */
  public isUnderline(): boolean {
    return this.formatManager.isUnderline();
  }
}
