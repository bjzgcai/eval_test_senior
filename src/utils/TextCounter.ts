/**
 * TextCounter utility
 * Counts words and characters in HTML content
 */

export class TextCounter {
  /**
   * Count words in HTML content
   */
  public static countWords(html: string): number {
    const text = this.stripHTML(html);
    const words = text.trim().split(/\s+/);
    return words.filter((word) => word.length > 0).length;
  }

  /**
   * Count characters in HTML content
   */
  public static countCharacters(html: string): number {
    const text = this.stripHTML(html);
    return text.length;
  }

  /**
   * Count characters including spaces
   */
  public static countCharactersWithSpaces(html: string): number {
    return this.stripHTML(html).length;
  }

  /**
   * Strip HTML tags from string
   */
  private static stripHTML(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }
}
