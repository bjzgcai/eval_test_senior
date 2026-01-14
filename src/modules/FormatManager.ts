/**
 * FormatManager module
 * Handles text formatting operations like bold, italic, underline
 */

import type { CommandType } from '../core/types';
import type { EventEmitter } from '../core/EventEmitter';

export class FormatManager {
  private editorElement: HTMLElement;
  private eventEmitter?: EventEmitter;

  constructor(editorElement: HTMLElement, eventEmitter?: EventEmitter) {
    this.editorElement = editorElement;
    this.eventEmitter = eventEmitter;
  }

  /**
   * Execute a formatting command
   */
  public executeCommand(command: CommandType, value?: string): void {
    // Focus editor to ensure selection is active
    this.editorElement.focus();

    // Execute the document command
    document.execCommand(command, false, value);

    // Emit format change event
    if (this.eventEmitter) {
      this.eventEmitter.emit('formatChange', { command });
    }
  }

  /**
   * Check if a format is currently active at the cursor
   */
  public isFormatActive(command: CommandType): boolean {
    return document.queryCommandState(command);
  }

  /**
   * Apply bold formatting to selected text
   */
  public bold(): void {
    this.executeCommand('bold');
  }

  /**
   * Toggle bold formatting
   */
  public toggleBold(): void {
    this.bold();
  }

  /**
   * Check if bold is active
   */
  public isBold(): boolean {
    return this.isFormatActive('bold');
  }

  /**
   * Apply italic formatting to selected text
   */
  public italic(): void {
    this.executeCommand('italic');
  }

  /**
   * Toggle italic formatting
   */
  public toggleItalic(): void {
    this.italic();
  }

  /**
   * Check if italic is active
   */
  public isItalic(): boolean {
    return this.isFormatActive('italic');
  }

  /**
   * Apply underline formatting to selected text
   */
  public underline(): void {
    this.executeCommand('underline');
  }

  /**
   * Toggle underline formatting
   */
  public toggleUnderline(): void {
    this.underline();
  }

  /**
   * Check if underline is active
   */
  public isUnderline(): boolean {
    return this.isFormatActive('underline');
  }

  /**
   * Apply strikethrough formatting to selected text
   */
  public strikethrough(): void {
    this.executeCommand('strikeThrough');
  }

  /**
   * Toggle strikethrough formatting
   */
  public toggleStrikethrough(): void {
    this.strikethrough();
  }

  /**
   * Check if strikethrough is active
   */
  public isStrikethrough(): boolean {
    return this.isFormatActive('strikeThrough');
  }

  // ==================== Text Styling ====================

  /**
   * Apply subscript formatting
   */
  public subscript(): void {
    this.executeCommand('subscript');
  }

  /**
   * Apply superscript formatting
   */
  public superscript(): void {
    this.executeCommand('superscript');
  }

  // ==================== Lists ====================

  /**
   * Insert unordered (bullet) list
   */
  public insertUnorderedList(): void {
    this.editorElement.focus();
    document.execCommand('insertUnorderedList', false);
    if (this.eventEmitter) {
      this.eventEmitter.emit('formatChange', { command: 'insertUnorderedList' });
    }
  }

  /**
   * Insert ordered (numbered) list
   */
  public insertOrderedList(): void {
    this.editorElement.focus();
    document.execCommand('insertOrderedList', false);
    if (this.eventEmitter) {
      this.eventEmitter.emit('formatChange', { command: 'insertOrderedList' });
    }
  }

  /**
   * Increase indent
   */
  public indent(): void {
    this.editorElement.focus();
    document.execCommand('indent', false);
    if (this.eventEmitter) {
      this.eventEmitter.emit('formatChange', { command: 'indent' });
    }
  }

  /**
   * Decrease indent (outdent)
   */
  public outdent(): void {
    this.editorElement.focus();
    document.execCommand('outdent', false);
    if (this.eventEmitter) {
      this.eventEmitter.emit('formatChange', { command: 'outdent' });
    }
  }

  // ==================== Alignment ====================

  /**
   * Align text to the left
   */
  public justifyLeft(): void {
    this.editorElement.focus();
    document.execCommand('justifyLeft', false);
    if (this.eventEmitter) {
      this.eventEmitter.emit('formatChange', { command: 'justifyLeft' });
    }
  }

  /**
   * Center align text
   */
  public justifyCenter(): void {
    this.editorElement.focus();
    document.execCommand('justifyCenter', false);
    if (this.eventEmitter) {
      this.eventEmitter.emit('formatChange', { command: 'justifyCenter' });
    }
  }

  /**
   * Align text to the right
   */
  public justifyRight(): void {
    this.editorElement.focus();
    document.execCommand('justifyRight', false);
    if (this.eventEmitter) {
      this.eventEmitter.emit('formatChange', { command: 'justifyRight' });
    }
  }

  /**
   * Justify text (align both left and right)
   */
  public justifyFull(): void {
    this.editorElement.focus();
    document.execCommand('justifyFull', false);
    if (this.eventEmitter) {
      this.eventEmitter.emit('formatChange', { command: 'justifyFull' });
    }
  }

  // ==================== Block Formatting ====================

  /**
   * Format selected text as a block element (h1-h6, p, etc.)
   * @param tag The HTML tag name (e.g., 'h1', 'h2', 'p')
   */
  public formatBlock(tag: string): void {
    this.editorElement.focus();
    document.execCommand('formatBlock', false, tag);
    if (this.eventEmitter) {
      this.eventEmitter.emit('formatChange', { command: 'formatBlock' });
    }
  }

  // ==================== Colors ====================

  /**
   * Set text color (foreground color)
   * @param color Color value (e.g., '#FF0000' or 'red')
   */
  public setTextColor(color: string): void {
    this.editorElement.focus();
    document.execCommand('foreColor', false, color);
    if (this.eventEmitter) {
      this.eventEmitter.emit('formatChange', { command: 'foreColor' });
    }
  }

  /**
   * Set background color (highlight color)
   * @param color Color value (e.g., '#FFFF00' or 'yellow')
   */
  public setBackgroundColor(color: string): void {
    this.editorElement.focus();
    document.execCommand('backColor', false, color);
    if (this.eventEmitter) {
      this.eventEmitter.emit('formatChange', { command: 'backColor' });
    }
  }

  // ==================== Fonts ====================

  /**
   * Set font family
   * @param fontName Font family name (e.g., 'Arial', 'Georgia')
   */
  public setFontName(fontName: string): void {
    this.editorElement.focus();
    document.execCommand('fontName', false, fontName);
    if (this.eventEmitter) {
      this.eventEmitter.emit('formatChange', { command: 'fontName' });
    }
  }

  /**
   * Set font size
   * @param size Font size (1-7, where 3 is default)
   */
  public setFontSize(size: string): void {
    this.editorElement.focus();
    document.execCommand('fontSize', false, size);
    if (this.eventEmitter) {
      this.eventEmitter.emit('formatChange', { command: 'fontSize' });
    }
  }

  // ==================== Other Operations ====================

  /**
   * Insert horizontal rule (line separator)
   */
  public insertHorizontalRule(): void {
    this.editorElement.focus();
    document.execCommand('insertHorizontalRule', false);
    if (this.eventEmitter) {
      this.eventEmitter.emit('formatChange', { command: 'insertHorizontalRule' });
    }
  }

  /**
   * Remove all formatting from selected text
   */
  public removeFormat(): void {
    this.editorElement.focus();
    document.execCommand('removeFormat', false);
    if (this.eventEmitter) {
      this.eventEmitter.emit('formatChange', { command: 'removeFormat' });
    }
  }

  /**
   * Remove link from selected text
   */
  public unlink(): void {
    this.editorElement.focus();
    document.execCommand('unlink', false);
    if (this.eventEmitter) {
      this.eventEmitter.emit('formatChange', { command: 'unlink' });
    }
  }
}
