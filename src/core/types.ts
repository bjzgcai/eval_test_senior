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

  /** Toolbar configuration (defaults to 'standard') */
  toolbar?: ToolbarConfig;
}

/**
 * Command types that can be executed
 */
export type CommandType =
  // Text formatting
  | 'bold' | 'italic' | 'underline' | 'strikeThrough'
  | 'subscript' | 'superscript'
  // Lists
  | 'insertUnorderedList' | 'insertOrderedList'
  | 'indent' | 'outdent'
  // Alignment
  | 'justifyLeft' | 'justifyCenter' | 'justifyRight' | 'justifyFull'
  // Block formatting
  | 'formatBlock'
  // Insert elements
  | 'insertHorizontalRule' | 'removeFormat'
  | 'createLink' | 'unlink'
  // Colors and fonts
  | 'foreColor' | 'backColor'
  | 'fontName' | 'fontSize'
  // Images
  | 'insertImage'
  // HTML insertion
  | 'insertHTML'
  // Custom block elements
  | 'quote' | 'code' | 'codeBlock'
  // History
  | 'undo' | 'redo';

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

/**
 * Button types for toolbar
 */
export type ButtonType = 'button' | 'dropdown' | 'color' | 'separator';

/**
 * Configuration for a single toolbar button
 */
export interface ToolbarButtonConfig {
  /** Command to execute when button is clicked */
  command: string;

  /** Type of button UI control */
  type: ButtonType;

  /** Text label for the button */
  label?: string;

  /** Icon character or emoji for the button */
  icon?: string;

  /** Tooltip text shown on hover */
  title: string;

  /** Options for dropdown buttons */
  options?: Array<{
    value: string;
    label: string;
  }>;

  /** Default color for color picker buttons */
  defaultColor?: string;

  /** Whether the command needs user prompt (e.g., link URL) */
  prompt?: boolean;
}

/**
 * Configuration for a group of toolbar buttons
 */
export interface ToolbarGroupConfig {
  /** Semantic name for the button group */
  name: string;

  /** Array of button configurations in this group */
  buttons: ToolbarButtonConfig[];
}

/**
 * Preset toolbar configuration names
 */
export type ToolbarPreset = 'minimal' | 'standard' | 'full';

/**
 * Toolbar configuration options
 * - string: preset name ('minimal', 'standard', 'full')
 * - false: no toolbar
 * - array: custom button group configuration
 */
export type ToolbarConfig = ToolbarPreset | false | ToolbarGroupConfig[];
