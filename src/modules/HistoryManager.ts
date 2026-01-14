/**
 * HistoryManager module
 * Manages undo/redo functionality with history stack
 */

export interface HistorySnapshot {
  content: string;
  timestamp: number;
}

export class HistoryManager {
  private editorElement: HTMLElement;
  private undoStack: HistorySnapshot[] = [];
  private redoStack: HistorySnapshot[] = [];
  private maxStackSize: number = 100;
  private isRecording: boolean = true;
  private lastSnapshot: string = '';
  private snapshotDelay: number = 500;
  private snapshotTimer: NodeJS.Timeout | null = null;

  constructor(editorElement: HTMLElement, maxStackSize: number = 100) {
    this.editorElement = editorElement;
    this.maxStackSize = maxStackSize;
    this.lastSnapshot = this.getContent();
  }

  /**
   * Get current editor content
   */
  private getContent(): string {
    return this.editorElement.innerHTML;
  }

  /**
   * Set editor content
   */
  private setContent(content: string): void {
    this.editorElement.innerHTML = content;
  }

  /**
   * Record a snapshot of the current state
   */
  public recordSnapshot(): void {
    if (!this.isRecording) {
      return;
    }

    const currentContent = this.getContent();

    // Don't record if content hasn't changed
    if (currentContent === this.lastSnapshot) {
      return;
    }

    const snapshot: HistorySnapshot = {
      content: currentContent,
      timestamp: Date.now(),
    };

    this.undoStack.push(snapshot);
    this.lastSnapshot = currentContent;

    // Clear redo stack when new changes are made
    this.redoStack = [];

    // Limit stack size
    if (this.undoStack.length > this.maxStackSize) {
      this.undoStack.shift();
    }
  }

  /**
   * Record a snapshot with debouncing
   */
  public recordSnapshotDebounced(): void {
    if (this.snapshotTimer) {
      clearTimeout(this.snapshotTimer);
    }

    this.snapshotTimer = setTimeout(() => {
      this.recordSnapshot();
    }, this.snapshotDelay);
  }

  /**
   * Undo the last action
   */
  public undo(): boolean {
    if (this.undoStack.length === 0) {
      return false;
    }

    // Save current state to redo stack
    const currentSnapshot: HistorySnapshot = {
      content: this.getContent(),
      timestamp: Date.now(),
    };
    this.redoStack.push(currentSnapshot);

    // Get and apply previous state
    const snapshot = this.undoStack.pop()!;
    this.isRecording = false;
    this.setContent(snapshot.content);
    this.lastSnapshot = snapshot.content;
    this.isRecording = true;

    return true;
  }

  /**
   * Redo the last undone action
   */
  public redo(): boolean {
    if (this.redoStack.length === 0) {
      return false;
    }

    // Save current state to undo stack
    const currentSnapshot: HistorySnapshot = {
      content: this.getContent(),
      timestamp: Date.now(),
    };
    this.undoStack.push(currentSnapshot);

    // Get and apply next state
    const snapshot = this.redoStack.pop()!;
    this.isRecording = false;
    this.setContent(snapshot.content);
    this.lastSnapshot = snapshot.content;
    this.isRecording = true;

    return true;
  }

  /**
   * Check if undo is available
   */
  public canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  /**
   * Check if redo is available
   */
  public canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  /**
   * Clear history stacks
   */
  public clear(): void {
    this.undoStack = [];
    this.redoStack = [];
    this.lastSnapshot = this.getContent();
  }

  /**
   * Pause history recording
   */
  public pause(): void {
    this.isRecording = false;
  }

  /**
   * Resume history recording
   */
  public resume(): void {
    this.isRecording = true;
  }

  /**
   * Get the size of the undo stack
   */
  public getUndoStackSize(): number {
    return this.undoStack.length;
  }

  /**
   * Get the size of the redo stack
   */
  public getRedoStackSize(): number {
    return this.redoStack.length;
  }
}
