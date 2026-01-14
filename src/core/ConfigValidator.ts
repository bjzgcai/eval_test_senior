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
    };
  }
}
