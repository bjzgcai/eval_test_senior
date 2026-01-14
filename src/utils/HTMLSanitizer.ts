/**
 * HTMLSanitizer utility
 * Sanitizes HTML content to prevent XSS attacks
 */

export class HTMLSanitizer {
  private static allowedTags = [
    'p', 'br', 'strong', 'em', 'u', 's', 'a', 'img',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'blockquote', 'pre', 'code',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'span', 'div', 'sup', 'sub', 'hr',
  ];

  private static allowedAttributes: { [key: string]: string[] } = {
    a: ['href', 'title', 'target'],
    img: ['src', 'alt', 'width', 'height'],
    td: ['colspan', 'rowspan'],
    th: ['colspan', 'rowspan'],
  };

  /**
   * Sanitize HTML string
   */
  public static sanitize(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    this.sanitizeNode(div);
    return div.innerHTML;
  }

  /**
   * Recursively sanitize DOM node
   */
  private static sanitizeNode(node: Node): void {
    const nodesToRemove: Node[] = [];

    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const element = child as HTMLElement;
        const tagName = element.tagName.toLowerCase();

        // Remove disallowed tags
        if (!this.allowedTags.includes(tagName)) {
          nodesToRemove.push(child);
          return;
        }

        // Remove disallowed attributes
        const allowedAttrs = this.allowedAttributes[tagName] || [];
        Array.from(element.attributes).forEach((attr) => {
          if (!allowedAttrs.includes(attr.name) && !attr.name.startsWith('data-')) {
            element.removeAttribute(attr.name);
          }
        });

        // Recursively sanitize children
        this.sanitizeNode(child);
      }
    });

    // Remove flagged nodes
    nodesToRemove.forEach((n) => node.removeChild(n));
  }
}
