/**
 * SelectionManager module
 * Manages text selection, ranges, and cursor position
 */

export class SelectionManager {
  private editorElement: HTMLElement;

  constructor(editorElement: HTMLElement) {
    this.editorElement = editorElement;
  }

  /**
   * Get the current selection
   */
  public getSelection(): Selection | null {
    return window.getSelection();
  }

  /**
   * Get the current range
   */
  public getRange(): Range | null {
    const selection = this.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return null;
    }
    return selection.getRangeAt(0);
  }

  /**
   * Check if the selection is within the editor
   */
  public isSelectionInEditor(): boolean {
    const range = this.getRange();
    if (!range) {
      return false;
    }
    return this.editorElement.contains(range.commonAncestorContainer);
  }

  /**
   * Save the current selection
   */
  public saveSelection(): Range | null {
    if (!this.isSelectionInEditor()) {
      return null;
    }
    return this.getRange();
  }

  /**
   * Restore a saved selection
   */
  public restoreSelection(range: Range | null): void {
    if (!range) {
      return;
    }

    const selection = this.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  /**
   * Get the selected text
   */
  public getSelectedText(): string {
    const selection = this.getSelection();
    return selection ? selection.toString() : '';
  }

  /**
   * Check if there is a selection (not just a cursor)
   */
  public hasSelection(): boolean {
    const selection = this.getSelection();
    return selection ? !selection.isCollapsed : false;
  }

  /**
   * Collapse the selection to the start or end
   */
  public collapse(toStart: boolean = false): void {
    const selection = this.getSelection();
    if (selection) {
      if (toStart) {
        selection.collapseToStart();
      } else {
        selection.collapseToEnd();
      }
    }
  }

  /**
   * Select all content in the editor
   */
  public selectAll(): void {
    const range = document.createRange();
    range.selectNodeContents(this.editorElement);

    const selection = this.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  /**
   * Insert text at the current cursor position
   */
  public insertText(text: string): void {
    const selection = this.getSelection();
    if (!selection || !this.isSelectionInEditor()) {
      return;
    }

    const range = this.getRange();
    if (range) {
      range.deleteContents();
      const textNode = document.createTextNode(text);
      range.insertNode(textNode);

      // Move cursor after the inserted text
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  /**
   * Insert HTML at the current cursor position
   */
  public insertHTML(html: string): void {
    const selection = this.getSelection();
    if (!selection || !this.isSelectionInEditor()) {
      return;
    }

    const range = this.getRange();
    if (range) {
      range.deleteContents();

      const fragment = range.createContextualFragment(html);
      range.insertNode(fragment);

      // Move cursor after the inserted content
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  /**
   * Get the parent element of the current selection
   */
  public getParentElement(): HTMLElement | null {
    const selection = this.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return null;
    }

    const range = selection.getRangeAt(0);
    let parent = range.commonAncestorContainer;

    // If the parent is a text node, get its parent element
    if (parent.nodeType === Node.TEXT_NODE) {
      parent = parent.parentNode!;
    }

    return parent as HTMLElement;
  }

  /**
   * Move cursor to the end of the editor
   */
  public moveCursorToEnd(): void {
    const range = document.createRange();
    range.selectNodeContents(this.editorElement);
    range.collapse(false);

    const selection = this.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  /**
   * Move cursor to the start of the editor
   */
  public moveCursorToStart(): void {
    const range = document.createRange();
    range.selectNodeContents(this.editorElement);
    range.collapse(true);

    const selection = this.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  /**
   * Get the character offset of the selection start
   */
  public getSelectionOffset(): number {
    const range = this.getRange();
    if (!range || !this.isSelectionInEditor()) {
      return 0;
    }

    const preRange = range.cloneRange();
    preRange.selectNodeContents(this.editorElement);
    preRange.setEnd(range.startContainer, range.startOffset);
    return preRange.toString().length;
  }

  /**
   * Set the cursor at a specific character offset
   */
  public setCursorAtOffset(offset: number): void {
    const range = document.createRange();
    const selection = this.getSelection();

    let charCount = 0;
    const nodeIterator = document.createNodeIterator(
      this.editorElement,
      NodeFilter.SHOW_TEXT,
      null
    );

    let currentNode: Node | null;
    let found = false;

    while ((currentNode = nodeIterator.nextNode())) {
      const nodeLength = currentNode.textContent?.length || 0;
      if (charCount + nodeLength >= offset) {
        range.setStart(currentNode, offset - charCount);
        range.collapse(true);
        found = true;
        break;
      }
      charCount += nodeLength;
    }

    if (found && selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}
