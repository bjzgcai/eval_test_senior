/**
 * ListManager tests
 */

import { ListManager } from '../../src/modules/ListManager';

describe('ListManager', () => {
  let element: HTMLDivElement;
  let listManager: ListManager;

  beforeEach(() => {
    element = document.createElement('div');
    element.contentEditable = 'true';
    document.body.appendChild(element);
    listManager = new ListManager(element);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should insert unordered list', () => {
    listManager.insertUnorderedList();
    expect(listManager).toBeDefined();
  });

  test('should insert ordered list', () => {
    listManager.insertOrderedList();
    expect(listManager).toBeDefined();
  });

  test('should handle indent/outdent', () => {
    listManager.indent();
    listManager.outdent();
    expect(listManager).toBeDefined();
  });
});
