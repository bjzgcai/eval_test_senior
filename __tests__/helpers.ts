/**
 * Test helper functions
 */

import { Editor } from '../src/core/Editor';

/**
 * Create a test container element
 */
export function createTestContainer(): HTMLDivElement {
  const container = document.createElement('div');
  container.id = 'test-editor';
  document.body.appendChild(container);
  return container;
}

/**
 * Create a test editor instance
 */
export function createTestEditor(content?: string): Editor {
  const container = createTestContainer();
  return new Editor({
    container,
    content,
  });
}

/**
 * Clean up test editor
 */
export function cleanupEditor(editor: Editor): void {
  editor.destroy();
}
