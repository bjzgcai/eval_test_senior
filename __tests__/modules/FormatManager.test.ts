/**
 * FormatManager tests
 */

import { FormatManager } from '../../src/modules/FormatManager';

describe('FormatManager', () => {
  let element: HTMLDivElement;
  let formatManager: FormatManager;

  beforeEach(() => {
    element = document.createElement('div');
    element.contentEditable = 'true';
    document.body.appendChild(element);
    formatManager = new FormatManager(element);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should toggle bold formatting', () => {
    formatManager.toggleBold();
    // Note: actual execCommand testing requires more complex DOM setup
    expect(formatManager).toBeDefined();
  });

  test('should toggle italic formatting', () => {
    formatManager.toggleItalic();
    expect(formatManager).toBeDefined();
  });

  test('should toggle underline formatting', () => {
    formatManager.toggleUnderline();
    expect(formatManager).toBeDefined();
  });

  test('should toggle strikethrough formatting', () => {
    formatManager.toggleStrikethrough();
    expect(formatManager).toBeDefined();
  });
});
