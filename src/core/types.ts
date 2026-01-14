/**
 * Core type definitions for the Rich Text Editor
 */

/**
 * Configuration options for the editor
 */
export interface EditorConfig {
  /** The selector or element to mount the editor */
  container: string | HTMLElement;

  /** Initial content of the editor */
  content?: string;

  /** Placeholder text when editor is empty */
  placeholder?: string;

  /** Whether the editor is read-only */
  readOnly?: boolean;
}

/**
 * Command types that can be executed
 */
export type CommandType = 'bold' | 'italic' | 'underline';
