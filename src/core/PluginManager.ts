/**
 * PluginManager module
 * Manages editor plugins and extensions
 */

import type { Editor } from './Editor';
import { Plugin } from './Plugin';

export class PluginManager {
  private editor: Editor;
  private plugins: Map<string, Plugin> = new Map();

  constructor(editor: Editor) {
    this.editor = editor;
  }

  /**
   * Register a plugin
   */
  public register(plugin: Plugin): void {
    if (this.plugins.has(plugin.name)) {
      console.warn(`Plugin "${plugin.name}" is already registered`);
      return;
    }

    this.plugins.set(plugin.name, plugin);
    plugin.init(this.editor);
  }

  /**
   * Unregister a plugin
   */
  public unregister(pluginName: string): void {
    const plugin = this.plugins.get(pluginName);
    if (plugin) {
      plugin.onDestroy();
      this.plugins.delete(pluginName);
    }
  }

  /**
   * Get a plugin by name
   */
  public get(pluginName: string): Plugin | undefined {
    return this.plugins.get(pluginName);
  }

  /**
   * Check if a plugin is registered
   */
  public has(pluginName: string): boolean {
    return this.plugins.has(pluginName);
  }

  /**
   * Get all registered plugins
   */
  public getAll(): Plugin[] {
    return Array.from(this.plugins.values());
  }

  /**
   * Destroy all plugins
   */
  public destroyAll(): void {
    this.plugins.forEach((plugin) => {
      plugin.onDestroy();
    });
    this.plugins.clear();
  }
}
