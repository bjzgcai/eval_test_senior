/**
 * Plugin base class and interfaces
 * Provides extensibility for the editor
 */

import type { Editor } from './Editor';

export interface PluginConfig {
  name: string;
  version?: string;
  enabled?: boolean;
}

export abstract class Plugin {
  public name: string;
  public version: string;
  public enabled: boolean;
  protected editor: Editor | null = null;

  constructor(config: PluginConfig) {
    this.name = config.name;
    this.version = config.version || '1.0.0';
    this.enabled = config.enabled !== false;
  }

  /**
   * Initialize the plugin
   */
  public init(editor: Editor): void {
    this.editor = editor;
    if (this.enabled) {
      this.onInit();
    }
  }

  /**
   * Called when plugin is initialized
   */
  protected abstract onInit(): void;

  /**
   * Called when plugin is destroyed
   */
  public abstract onDestroy(): void;

  /**
   * Enable the plugin
   */
  public enable(): void {
    this.enabled = true;
  }

  /**
   * Disable the plugin
   */
  public disable(): void {
    this.enabled = false;
  }
}
