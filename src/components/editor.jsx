import React, { useRef, useEffect } from 'react'
import MonacoEditor from '@monaco-editor/react'

const Editor = ({ value, onChange, disabled }) => {
  const editorRef = useRef(null)

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor
    
    // Configure Monaco editor for Python
    monaco.languages.python.pythonDefaults.setCompilerOptions({
      target: monaco.languages.python.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
    })

    // Define VS Code-like theme
    monaco.editor.defineTheme('vscode-dark-custom', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'class', foreground: '4EC9B0' },
        { token: 'function', foreground: 'DCDCAA' },
        { token: 'variable', foreground: '9CDCFE' },
        { token: 'operator', foreground: 'D4D4D4' },
      ],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#e6edf3',
        'editorLineNumber.foreground': '#858585',
        'editorLineNumber.activeForeground': '#c6c6c6',
        'editor.selectionBackground': '#264f78',
        'editor.selectionHighlightBackground': '#264f7840',
        'editor.findMatchBackground': '#515c6a',
        'editor.findMatchHighlightBackground': '#ea5c0040',
        'editor.wordHighlightBackground': '#575757b8',
        'editor.wordHighlightStrongBackground': '#004972b8',
        'editorCursor.foreground': '#c6c6c6',
        'editorWhitespace.foreground': '#404040',
        'editorIndentGuide.background': '#404040',
        'editorIndentGuide.activeBackground': '#707070',
        'editorGroupHeader.tabsBackground': '#252526',
        'editorGroup.border': '#30363d',
        'tab.activeBackground': '#1e1e1e',
        'tab.activeForeground': '#e6edf3',
        'tab.inactiveBackground': '#252526',
        'tab.inactiveForeground': '#8b949e',
        'scrollbarSlider.background': '#30363d',
        'scrollbarSlider.hoverBackground': '#484f58',
        'scrollbarSlider.activeBackground': '#6e7681',
      }
    })

    // Set the custom theme
    monaco.editor.setTheme('vscode-dark-custom')

    // Configure editor options
    editor.updateOptions({
      fontSize: 14,
      fontFamily: 'JetBrains Mono, Fira Code, Monaco, Consolas, monospace',
      lineHeight: 1.6,
      letterSpacing: 0.5,
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: true,
      smoothScrolling: true,
      minimap: {
        enabled: true,
        scale: 0.5,
        showSlider: 'always',
      },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      automaticLayout: true,
      formatOnPaste: true,
      formatOnType: true,
      suggestOnTriggerCharacters: true,
      quickSuggestions: {
        other: true,
        comments: true,
        strings: true,
      },
      parameterHints: {
        enabled: true,
        cycle: true,
      },
      hover: {
        enabled: true,
        delay: 300,
      },
      bracketPairColorization: {
        enabled: true,
      },
      guides: {
        indentation: true,
        bracketPairs: true,
      },
      padding: {
        top: 16,
        bottom: 16,
      },
    })

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Handle save (could trigger download)
      console.log('Save shortcut triggered')
    })

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      // Handle run (could trigger code execution)
      console.log('Run shortcut triggered')
    })

    // Focus the editor
    editor.focus()
  }

  const handleEditorChange = (value) => {
    onChange(value || '')
  }

  return (
    <div className="h-full editor-container">
      <MonacoEditor
        height="100%"
        language="python"
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        loading={
          <div className="flex items-center justify-center h-full bg-vscode-editor">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-vscode-accent border-t-transparent"></div>
              <span className="text-vscode-text-muted">Loading Editor...</span>
            </div>
          </div>
        }
        options={{
          readOnly: disabled,
          contextmenu: true,
          selectOnLineNumbers: true,
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          theme: 'vscode-dark-custom',
        }}
      />
    </div>
  )
}

export default Editor