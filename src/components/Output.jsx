import React, { useRef, useEffect, useState } from 'react'
import { Copy, Terminal, Zap, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const Output = ({ output, isRunning, isEmpty }) => {
  const outputRef = useRef(null)
  const [copied, setCopied] = useState(false)

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  const copyToClipboard = async () => {
    if (!output) return
    
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      toast.success('Output copied to clipboard!')
      
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy output')
    }
  }

  const renderOutput = () => {
    if (isRunning) {
      return (
        <div className="flex items-center justify-center h-32 text-vscode-text-muted">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-vscode-accent border-t-transparent"></div>
            <span>Executing Python code...</span>
          </div>
        </div>
      )
    }

    if (isEmpty) {
      return (
        <div className="flex flex-col items-center justify-center h-32 text-vscode-text-muted">
          <Terminal className="w-12 h-12 mb-3 opacity-50" />
          <p className="text-center">
            No output yet.<br />
            <span className="text-sm">Run your Python code to see results here.</span>
          </p>
        </div>
      )
    }

    // Process output to handle different types of content
    const lines = output.split('\n')
    
    return (
      <div className="space-y-1">
        {lines.map((line, index) => {
          const isError = line.toLowerCase().includes('error:') || 
                         line.toLowerCase().includes('traceback') ||
                         line.toLowerCase().includes('exception')
          
          return (
            <div 
              key={index} 
              className={`font-code text-sm leading-relaxed ${
                isError 
                  ? 'text-red-400 bg-red-500/10 px-2 py-1 rounded border-l-2 border-red-500' 
                  : 'text-vscode-text'
              }`}
            >
              {line || '\u00A0'} {/* Non-breaking space for empty lines */}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Output Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-vscode-accent" />
          <span className="text-sm font-medium text-vscode-text">Console Output</span>
        </div>
        
        {output && (
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-1 px-2 py-1 text-xs bg-vscode-panel hover:bg-vscode-sidebar border border-vscode-border rounded transition-all duration-200 hover:scale-105"
            disabled={copied}
          >
            <Copy className="w-3 h-3" />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        )}
      </div>

      {/* Output Content */}
      <div 
        ref={outputRef}
        className="flex-1 terminal-output custom-scrollbar overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        {renderOutput()}
      </div>

      {/* Output Footer */}
      {output && (
        <div className="mt-3 pt-3 border-t border-vscode-border">
          <div className="flex items-center justify-between text-xs text-vscode-text-muted">
            <div className="flex items-center space-x-2">
              {output.toLowerCase().includes('error') ? (
                <>
                  <AlertCircle className="w-3 h-3 text-red-400" />
                  <span>Execution completed with errors</span>
                </>
              ) : (
                <>
                  <Zap className="w-3 h-3 text-green-400" />
                  <span>Execution completed successfully</span>
                </>
              )}
            </div>
            <span>{output.split('\n').length} lines</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Output
