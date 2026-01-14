/**
 * Demo application for Rich Text Editor
 */

import { Editor } from './core/Editor';

// Initialize the editor
const editor = new Editor({
    container: '#editor-container',
    placeholder: 'Start typing your content here... Try using Ctrl+B for bold, Ctrl+I for italic!',
    content: '<p>Welcome to the <strong>Rich Text Editor</strong>! This is a powerful, extensible editor built from scratch.</p><p>Try selecting some text and clicking the toolbar buttons, or use keyboard shortcuts!</p>'
});

// Update stats on change
function updateStats(): void {
    const content = editor.getContent();
    const text = content.replace(/<[^>]*>/g, '').trim();

    const charCountEl = document.getElementById('char-count');
    const wordCountEl = document.getElementById('word-count');
    const canUndoEl = document.getElementById('can-undo');
    const canRedoEl = document.getElementById('can-redo');

    if (charCountEl) charCountEl.textContent = text.length.toString();
    if (wordCountEl) wordCountEl.textContent = text ? text.split(/\s+/).length.toString() : '0';
    if (canUndoEl) canUndoEl.textContent = editor.canUndo() ? 'Yes' : 'No';
    if (canRedoEl) canRedoEl.textContent = editor.canRedo() ? 'Yes' : 'No';
}

// Listen to editor events
editor.on('change', () => {
    updateStats();
});

editor.on('focus', () => {
    console.log('Editor focused');
});

editor.on('blur', () => {
    console.log('Editor blurred');
});

// Initial stats update
updateStats();

// Demo actions
const demoActions = {
    getSample() {
        const sampleContent = `
            <h1>Sample Document</h1>
            <p>This is a <strong>sample document</strong> with <em>various</em> <u>formatting</u> options.</p>
            <p>You can use the toolbar buttons or keyboard shortcuts to format your text:</p>
            <ul>
                <li>Make text <strong>bold</strong> with Ctrl+B</li>
                <li>Make text <em>italic</em> with Ctrl+I</li>
                <li>Make text <u>underlined</u> with Ctrl+U</li>
                <li>Or use <s>strikethrough</s> from the toolbar</li>
            </ul>
            <p>Try editing this content and see the character/word count update in real-time!</p>
        `;
        editor.setContent(sampleContent);
        updateOutput('Sample content loaded successfully!');
    },

    getHTML() {
        const html = editor.getContent();
        updateOutput(`Current HTML:\n\n${html}`);
    },

    clearContent() {
        editor.setContent('');
        updateOutput('Content cleared!');
    },

    toggleReadOnly() {
        const editorEl = document.querySelector('.rte-editor') as HTMLElement;
        if (!editorEl) return;

        const isReadOnly = editorEl.contentEditable === 'false';
        editorEl.contentEditable = isReadOnly ? 'true' : 'false';
        updateOutput(`Read-only mode: ${isReadOnly ? 'OFF' : 'ON'}`);
    },

    insertText() {
        editor.focus();
        editor.insertText(' [Inserted Text] ');
        updateOutput('Text inserted at cursor position!');
    },

    insertHTML() {
        editor.focus();
        editor.insertHTML('<strong style="color: #667eea;">Inserted HTML</strong>');
        updateOutput('HTML inserted at cursor position!');
    },

    getSelection() {
        const selectedText = editor.getSelectedText();
        if (selectedText) {
            updateOutput(`Selected text:\n\n"${selectedText}"`);
        } else {
            updateOutput('No text selected. Please select some text first.');
        }
    }
};

function updateOutput(message: string): void {
    const outputEl = document.getElementById('output');
    if (outputEl) {
        outputEl.textContent = message;
    }
}

// Make editor and demoActions globally accessible
declare global {
    interface Window {
        editor: Editor;
        demoActions: typeof demoActions;
    }
}

window.editor = editor;
window.demoActions = demoActions;

console.log('Editor initialized! Access it via window.editor');
console.log('Try: editor.bold(), editor.italic(), editor.getContent()');
