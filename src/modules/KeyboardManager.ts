/**
 * KeyboardManager module
 * Manages keyboard shortcuts and key bindings
 */

import type { Editor } from '../core/Editor';

export type KeyHandler = (e: KeyboardEvent) => void | boolean;

export interface KeyBinding {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
  handler: KeyHandler;
  description?: string;
}

export class KeyboardManager {
  private editor: Editor;
  private editorElement: HTMLElement;
  private keyBindings: Map<string, KeyBinding> = new Map();

  constructor(editor: Editor, editorElement: HTMLElement) {
    this.editor = editor;
    this.editorElement = editorElement;
    this.registerDefaultBindings();
    this.attachEventListener();
  }

  /**
   * Register default key bindings
   */
  private registerDefaultBindings(): void {
    // Undo/Redo
    this.register({
      key: 'z',
      ctrl: true,
      handler: (e) => {
        e.preventDefault();
        this.editor.undo();
      },
      description: 'Undo',
    });

    this.register({
      key: 'y',
      ctrl: true,
      handler: (e) => {
        e.preventDefault();
        this.editor.redo();
      },
      description: 'Redo',
    });

    // Bold, Italic, Underline
    this.register({
      key: 'b',
      ctrl: true,
      handler: (e) => {
        e.preventDefault();
        this.editor.bold();
      },
      description: 'Bold',
    });

    this.register({
      key: 'i',
      ctrl: true,
      handler: (e) => {
        e.preventDefault();
        this.editor.italic();
      },
      description: 'Italic',
    });

    this.register({
      key: 'u',
      ctrl: true,
      handler: (e) => {
        e.preventDefault();
        this.editor.underline();
      },
      description: 'Underline',
    });
  }

  /**
   * Attach keyboard event listener
   */
  private attachEventListener(): void {
    this.editorElement.addEventListener('keydown', (e) => {
      this.handleKeyDown(e);
    });
  }

  /**
   * Handle keydown event
   */
  private handleKeyDown(e: KeyboardEvent): void {
    const key = this.getKeyString(e);
    const binding = this.keyBindings.get(key);

    if (binding) {
      const result = binding.handler(e);
      if (result !== false) {
        // Handler didn't return false, so we consumed the event
      }
    }
  }

  /**
   * Generate a unique key string for the key combination
   */
  private getKeyString(e: KeyboardEvent): string {
    const parts: string[] = [];

    if (e.ctrlKey || e.metaKey) parts.push('ctrl');
    if (e.altKey) parts.push('alt');
    if (e.shiftKey) parts.push('shift');
    parts.push(e.key.toLowerCase());

    return parts.join('+');
  }

  /**
   * Generate key string for a binding
   */
  private getBindingKeyString(binding: KeyBinding): string {
    const parts: string[] = [];

    if (binding.ctrl || binding.meta) parts.push('ctrl');
    if (binding.alt) parts.push('alt');
    if (binding.shift) parts.push('shift');
    parts.push(binding.key.toLowerCase());

    return parts.join('+');
  }

  /**
   * Register a key binding
   */
  public register(binding: KeyBinding): void {
    const key = this.getBindingKeyString(binding);
    this.keyBindings.set(key, binding);
  }

  /**
   * Unregister a key binding
   */
  public unregister(binding: KeyBinding): void {
    const key = this.getBindingKeyString(binding);
    this.keyBindings.delete(key);
  }

  /**
   * Clear all key bindings
   */
  public clearAll(): void {
    this.keyBindings.clear();
  }

  /**
   * Get all registered key bindings
   */
  public getAllBindings(): KeyBinding[] {
    return Array.from(this.keyBindings.values());
  }
}
