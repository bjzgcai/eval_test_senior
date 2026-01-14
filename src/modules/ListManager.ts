/**
 * ListManager module
 * Manages lists (ordered, unordered) and indentation
 */

export class ListManager {
  private editorElement: HTMLElement;

  constructor(editorElement: HTMLElement) {
    this.editorElement = editorElement;
  }

  /**
   * Insert unordered list
   */
  public insertUnorderedList(): void {
    this.editorElement.focus();
    document.execCommand('insertUnorderedList', false);
  }

  /**
   * Insert ordered list
   */
  public insertOrderedList(): void {
    this.editorElement.focus();
    document.execCommand('insertOrderedList', false);
  }

  /**
   * Indent list item or paragraph
   */
  public indent(): void {
    this.editorElement.focus();
    document.execCommand('indent', false);
  }

  /**
   * Outdent list item or paragraph
   */
  public outdent(): void {
    this.editorElement.focus();
    document.execCommand('outdent', false);
  }

  /**
   * Check if currently in a list
   */
  public isInList(): boolean {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return false;
    }

    let node: Node | null = selection.anchorNode;
    while (node && node !== this.editorElement) {
      if (node.nodeName === 'UL' || node.nodeName === 'OL') {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }
}
