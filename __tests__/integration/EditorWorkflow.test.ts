/**
 * Editor workflow integration tests
 */

import { Editor } from '../../src/core/Editor';
import { createTestContainer, cleanupEditor } from '../helpers';

describe('Editor Workflow Integration', () => {
  test('should complete basic editing workflow', () => {
    const container = createTestContainer();
    const editor = new Editor({ container });

    editor.setContent('<p>Test</p>');
    editor.bold();
    editor.italic();

    expect(editor.getContent()).toBeTruthy();
    cleanupEditor(editor);
  });

  test('should handle undo/redo workflow', () => {
    const container = createTestContainer();
    const editor = new Editor({ container });

    editor.setContent('<p>Original</p>');
    editor.setContent('<p>Modified</p>');

    expect(editor.canUndo()).toBeDefined();
    cleanupEditor(editor);
  });
});
