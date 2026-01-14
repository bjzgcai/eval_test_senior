/**
 * Editor core tests
 */

import { Editor } from '../../src/core/Editor';
import { createTestContainer, cleanupEditor } from '../helpers';

describe('Editor', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = createTestContainer();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should create editor instance', () => {
    const editor = new Editor({ container });
    expect(editor).toBeInstanceOf(Editor);
    cleanupEditor(editor);
  });

  test('should set initial content', () => {
    const content = '<p>Hello World</p>';
    const editor = new Editor({ container, content });
    expect(editor.getContent()).toContain('Hello World');
    cleanupEditor(editor);
  });

  test('should get and set content', () => {
    const editor = new Editor({ container });
    editor.setContent('<p>Test content</p>');
    expect(editor.getContent()).toContain('Test content');
    cleanupEditor(editor);
  });

  test('should handle focus', () => {
    const editor = new Editor({ container });
    editor.focus();
    expect(document.activeElement).toBeTruthy();
    cleanupEditor(editor);
  });

  test('should emit events', (done) => {
    const editor = new Editor({ container });
    editor.on('mounted', () => {
      cleanupEditor(editor);
      done();
    });
  });
});
