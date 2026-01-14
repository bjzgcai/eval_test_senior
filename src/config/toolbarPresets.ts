/**
 * Toolbar preset configurations
 * Provides predefined button layouts for different use cases
 */

import type { ToolbarGroupConfig, ToolbarPreset } from '../core/types';

/**
 * Predefined toolbar configurations
 */
export const TOOLBAR_PRESETS: Record<ToolbarPreset, ToolbarGroupConfig[]> = {
  /**
   * Minimal preset: Basic formatting only
   * Groups: History, Basic Text Formatting
   */
  minimal: [
    {
      name: 'history',
      buttons: [
        { command: 'undo', type: 'button', icon: '↶', title: 'Undo (Ctrl+Z)' },
        { command: 'redo', type: 'button', icon: '↷', title: 'Redo (Ctrl+Y)' },
      ],
    },
    {
      name: 'textFormat',
      buttons: [
        { command: 'bold', type: 'button', icon: 'B', title: 'Bold (Ctrl+B)' },
        { command: 'italic', type: 'button', icon: 'I', title: 'Italic (Ctrl+I)' },
        { command: 'underline', type: 'button', icon: 'U', title: 'Underline (Ctrl+U)' },
      ],
    },
  ],

  /**
   * Standard preset: Common formatting features
   * Groups: History, Text Formatting, Headings, Lists, Alignment, Insert
   */
  standard: [
    {
      name: 'history',
      buttons: [
        { command: 'undo', type: 'button', icon: '↶', title: 'Undo (Ctrl+Z)' },
        { command: 'redo', type: 'button', icon: '↷', title: 'Redo (Ctrl+Y)' },
      ],
    },
    {
      name: 'textFormat',
      buttons: [
        { command: 'bold', type: 'button', icon: 'B', title: 'Bold (Ctrl+B)' },
        { command: 'italic', type: 'button', icon: 'I', title: 'Italic (Ctrl+I)' },
        { command: 'underline', type: 'button', icon: 'U', title: 'Underline (Ctrl+U)' },
        { command: 'strikeThrough', type: 'button', icon: 'S', title: 'Strikethrough' },
      ],
    },
    {
      name: 'headings',
      buttons: [
        {
          command: 'formatBlock',
          type: 'dropdown',
          label: 'Paragraph',
          title: 'Text Style',
          options: [
            { value: 'p', label: 'Paragraph' },
            { value: 'h1', label: 'Heading 1' },
            { value: 'h2', label: 'Heading 2' },
            { value: 'h3', label: 'Heading 3' },
          ],
        },
      ],
    },
    {
      name: 'lists',
      buttons: [
        { command: 'insertUnorderedList', type: 'button', icon: '•', title: 'Bullet List' },
        { command: 'insertOrderedList', type: 'button', icon: '1.', title: 'Numbered List' },
      ],
    },
    {
      name: 'alignment',
      buttons: [
        { command: 'justifyLeft', type: 'button', icon: '⬅', title: 'Align Left' },
        { command: 'justifyCenter', type: 'button', icon: '↔', title: 'Align Center' },
        { command: 'justifyRight', type: 'button', icon: '➡', title: 'Align Right' },
      ],
    },
    {
      name: 'insert',
      buttons: [
        { command: 'createLink', type: 'button', icon: '🔗', title: 'Insert Link', prompt: true },
        { command: 'insertImage', type: 'button', icon: '🖼', title: 'Insert Image', prompt: true },
      ],
    },
  ],

  /**
   * Full preset: All available formatting features
   * Groups: History, Text Formatting, Headings, Font Style, Colors, Lists, Alignment, Blocks, Insert, Clear
   */
  full: [
    {
      name: 'history',
      buttons: [
        { command: 'undo', type: 'button', icon: '↶', title: 'Undo (Ctrl+Z)' },
        { command: 'redo', type: 'button', icon: '↷', title: 'Redo (Ctrl+Y)' },
      ],
    },
    {
      name: 'textFormat',
      buttons: [
        { command: 'bold', type: 'button', icon: 'B', title: 'Bold (Ctrl+B)' },
        { command: 'italic', type: 'button', icon: 'I', title: 'Italic (Ctrl+I)' },
        { command: 'underline', type: 'button', icon: 'U', title: 'Underline (Ctrl+U)' },
        { command: 'strikeThrough', type: 'button', icon: 'S', title: 'Strikethrough' },
        { command: 'subscript', type: 'button', icon: 'X₂', title: 'Subscript' },
        { command: 'superscript', type: 'button', icon: 'X²', title: 'Superscript' },
      ],
    },
    {
      name: 'headings',
      buttons: [
        {
          command: 'formatBlock',
          type: 'dropdown',
          label: 'Paragraph',
          title: 'Text Style',
          options: [
            { value: 'p', label: 'Paragraph' },
            { value: 'h1', label: 'Heading 1' },
            { value: 'h2', label: 'Heading 2' },
            { value: 'h3', label: 'Heading 3' },
            { value: 'h4', label: 'Heading 4' },
            { value: 'h5', label: 'Heading 5' },
            { value: 'h6', label: 'Heading 6' },
          ],
        },
      ],
    },
    {
      name: 'fontStyle',
      buttons: [
        {
          command: 'fontName',
          type: 'dropdown',
          label: 'Font',
          title: 'Font Family',
          options: [
            { value: 'Arial', label: 'Arial' },
            { value: 'Georgia', label: 'Georgia' },
            { value: 'Times New Roman', label: 'Times New Roman' },
            { value: 'Courier New', label: 'Courier New' },
            { value: 'Verdana', label: 'Verdana' },
          ],
        },
        {
          command: 'fontSize',
          type: 'dropdown',
          label: '14px',
          title: 'Font Size',
          options: [
            { value: '1', label: '10px' },
            { value: '2', label: '13px' },
            { value: '3', label: '16px' },
            { value: '4', label: '18px' },
            { value: '5', label: '24px' },
            { value: '6', label: '32px' },
            { value: '7', label: '48px' },
          ],
        },
      ],
    },
    {
      name: 'colors',
      buttons: [
        { command: 'foreColor', type: 'color', icon: 'A', title: 'Text Color', defaultColor: '#000000' },
        { command: 'backColor', type: 'color', icon: '▀', title: 'Background Color', defaultColor: '#FFFF00' },
      ],
    },
    {
      name: 'lists',
      buttons: [
        { command: 'insertUnorderedList', type: 'button', icon: '•', title: 'Bullet List' },
        { command: 'insertOrderedList', type: 'button', icon: '1.', title: 'Numbered List' },
        { command: 'indent', type: 'button', icon: '→', title: 'Increase Indent' },
        { command: 'outdent', type: 'button', icon: '←', title: 'Decrease Indent' },
      ],
    },
    {
      name: 'alignment',
      buttons: [
        { command: 'justifyLeft', type: 'button', icon: '⬅', title: 'Align Left' },
        { command: 'justifyCenter', type: 'button', icon: '↔', title: 'Align Center' },
        { command: 'justifyRight', type: 'button', icon: '➡', title: 'Align Right' },
        { command: 'justifyFull', type: 'button', icon: '↔', title: 'Justify' },
      ],
    },
    {
      name: 'blocks',
      buttons: [
        { command: 'quote', type: 'button', icon: '"', title: 'Blockquote' },
        { command: 'code', type: 'button', icon: '</>', title: 'Inline Code' },
        { command: 'codeBlock', type: 'button', icon: '{  }', title: 'Code Block' },
      ],
    },
    {
      name: 'insert',
      buttons: [
        { command: 'createLink', type: 'button', icon: '🔗', title: 'Insert Link', prompt: true },
        { command: 'unlink', type: 'button', icon: '⛓‍💥', title: 'Remove Link' },
        { command: 'insertImage', type: 'button', icon: '🖼', title: 'Insert Image', prompt: true },
        { command: 'insertHorizontalRule', type: 'button', icon: '—', title: 'Horizontal Rule' },
      ],
    },
    {
      name: 'clear',
      buttons: [
        { command: 'removeFormat', type: 'button', icon: '✗', title: 'Clear Formatting' },
      ],
    },
  ],
};

/**
 * Get toolbar configuration for a preset
 * @param preset The preset name
 * @returns The toolbar group configuration
 */
export function getToolbarConfig(preset: ToolbarPreset): ToolbarGroupConfig[] {
  return TOOLBAR_PRESETS[preset] || TOOLBAR_PRESETS.standard;
}
