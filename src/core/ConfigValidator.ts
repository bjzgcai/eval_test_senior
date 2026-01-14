/**
 * ConfigValidator module
 * Validates and sanitizes editor configuration
 */

import type { EditorConfig } from './types';

export class ConfigValidator {
  /**
   * Validate editor configuration
   */
  public static validate(config: EditorConfig): void {
    if (!config.container) {
      throw new Error('Editor configuration must include a container');
    }

    if (typeof config.container === 'string' && !config.container.trim()) {
      throw new Error('Container selector cannot be empty');
    }

    if (config.placeholder && typeof config.placeholder !== 'string') {
      throw new Error('Placeholder must be a string');
    }

    if (config.readOnly !== undefined && typeof config.readOnly !== 'boolean') {
      throw new Error('readOnly must be a boolean');
    }

    if (config.content && typeof config.content !== 'string') {
      throw new Error('Content must be a string');
    }

    // Validate toolbar configuration
    if (config.toolbar !== undefined) {
      if (
        config.toolbar !== false &&
        typeof config.toolbar !== 'string' &&
        !Array.isArray(config.toolbar)
      ) {
        throw new Error(
          'Toolbar must be a preset name ("minimal", "standard", "full"), false, or custom configuration array'
        );
      }

      if (typeof config.toolbar === 'string') {
        const validPresets = ['minimal', 'standard', 'full'];
        if (!validPresets.includes(config.toolbar)) {
          throw new Error(
            `Invalid toolbar preset "${config.toolbar}". Must be one of: ${validPresets.join(', ')}`
          );
        }
      }

      if (Array.isArray(config.toolbar)) {
        // Validate custom toolbar configuration structure
        config.toolbar.forEach((group, index) => {
          if (!group.name || typeof group.name !== 'string') {
            throw new Error(`Toolbar group at index ${index} must have a "name" property`);
          }

          if (!Array.isArray(group.buttons)) {
            throw new Error(`Toolbar group "${group.name}" must have a "buttons" array`);
          }

          group.buttons.forEach((button, btnIndex) => {
            if (!button.command || typeof button.command !== 'string') {
              throw new Error(
                `Button at index ${btnIndex} in group "${group.name}" must have a "command" property`
              );
            }

            if (!button.type || typeof button.type !== 'string') {
              throw new Error(
                `Button "${button.command}" in group "${group.name}" must have a "type" property`
              );
            }

            const validTypes = ['button', 'dropdown', 'color', 'separator'];
            if (!validTypes.includes(button.type)) {
              throw new Error(
                `Button "${button.command}" has invalid type "${button.type}". Must be one of: ${validTypes.join(', ')}`
              );
            }

            if (!button.title || typeof button.title !== 'string') {
              throw new Error(
                `Button "${button.command}" in group "${group.name}" must have a "title" property`
              );
            }
          });
        });
      }
    }
  }

  /**
   * Sanitize configuration values
   */
  public static sanitize(config: EditorConfig): EditorConfig {
    return {
      container: config.container,
      content: config.content?.trim(),
      placeholder: config.placeholder?.trim(),
      readOnly: config.readOnly,
      toolbar: config.toolbar,
    };
  }
}
