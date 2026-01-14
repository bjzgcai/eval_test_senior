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
  public executeCommand(command: CommandType): void {
    // Focus editor to ensure selection is active
    this.editorElement.focus();

    // Execute the document command
    document.execCommand(command, false);

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
}
