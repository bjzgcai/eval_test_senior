/**
 * EventEmitter module
 * Provides pub/sub event system for the editor
 */

export type EventHandler<T = any> = (data?: T) => void;

export interface EventMap {
  [event: string]: EventHandler[];
}

export class EventEmitter {
  private events: EventMap = {};

  /**
   * Register an event handler
   */
  public on<T = any>(event: string, handler: EventHandler<T>): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler as EventHandler);
  }

  /**
   * Remove an event handler
   */
  public off<T = any>(event: string, handler: EventHandler<T>): void {
    if (!this.events[event]) {
      return;
    }

    this.events[event] = this.events[event].filter((h) => h !== handler);

    // Clean up empty event arrays
    if (this.events[event].length === 0) {
      delete this.events[event];
    }
  }

  /**
   * Emit an event to all registered handlers
   */
  public emit<T = any>(event: string, data?: T): void {
    if (!this.events[event]) {
      return;
    }

    // Call all handlers for this event
    this.events[event].forEach((handler) => {
      try {
        handler(data);
      } catch (error) {
        console.error(`Error in event handler for "${event}":`, error);
      }
    });
  }

  /**
   * Register a one-time event handler
   */
  public once<T = any>(event: string, handler: EventHandler<T>): void {
    const onceWrapper: EventHandler<T> = (data?: T) => {
      handler(data);
      this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
  }

  /**
   * Remove all event handlers for a specific event or all events
   */
  public removeAllListeners(event?: string): void {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
  }

  /**
   * Get the number of listeners for an event
   */
  public listenerCount(event: string): number {
    return this.events[event]?.length || 0;
  }
}
