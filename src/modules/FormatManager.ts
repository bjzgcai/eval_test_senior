/**
 * FormatManager module
 * Handles text formatting operations like bold, italic, underline
 */

import type { CommandType } from '../core/types';

export class FormatManager {
  private editorElement: HTMLElement;

  constructor(editorElement: HTMLElement) {
    this.editorElement = editorElement;
  }

  /**
   * Execute a formatting command
   */
  public executeCommand(command: CommandType): void {
    // Focus editor to ensure selection is active
    this.editorElement.focus();

    // Execute the document command
    document.execCommand(command, false);
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
}
