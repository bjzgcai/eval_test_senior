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
export type CommandType = 'bold' | 'italic' | 'underline' | 'strikeThrough';

/**
 * Editor event types
 */
export type EditorEventType =
  | 'change'
  | 'focus'
  | 'blur'
  | 'selectionChange'
  | 'keydown'
  | 'keyup'
  | 'paste'
  | 'formatChange'
  | 'mounted'
  | 'destroyed';

/**
 * Event data for change events
 */
export interface ChangeEventData {
  content: string;
}

/**
 * Event data for selection change events
 */
export interface SelectionChangeEventData {
  selection: Selection | null;
  range: Range | null;
}
