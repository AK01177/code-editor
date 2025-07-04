import React from 'react'
import { Play, Square, Download, Trash2, Zap, FileCode } from 'lucide-react'
import toast from 'react-hot-toast'

const Toolbar = ({ onRun, onClear, onDownload, isRunning, canRun }) => {
  
  const handleRun = () => {
    if (!canRun) {
      toast.error('Python runtime is not ready yet')
      return
    }
    
    if (isRunning) {
      toast.error('Code is already running')
      return
    }
    
    onRun()
    toast.success('Executing Python code...')
  }

  const handleClear = () => {
    onClear()
    toast.success('Output cleared')
  }

  const handleDownload = () => {
    onDownload()
    toast.success('Code downloaded as python_code.py')
  }

  return (
    <div className="px-4 py-3 bg-vscode-sidebar border-b border-vscode-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Run Button */}
          <button
            onClick={handleRun}
            disabled={!canRun || isRunning}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              !canRun || isRunning 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-vscode-success hover:bg-green-600 text-white shadow-lg hover:shadow-green-500/25'
            }`}
          >
            {isRunning ? (
              <>
                <Square className="w-4 h-4" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Run Code</span>
              </>
            )}
          </button>

          {/* Clear Button */}
          <button
            onClick={handleClear}
            className="flex items-center space-x-2 btn-secondary"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 btn-secondary"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>

        {/* Right Side Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-xs text-vscode-text-muted">
            <FileCode className="w-3 h-3" />
            <span>Python</span>
          </div>
          
          <div className="flex items-center space-x-2 text-xs text-vscode-text-muted">
            <Zap className="w-3 h-3" />
            <span>Pyodide Runtime</span>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="mt-3 pt-3 border-t border-vscode-border/50">
        <div className="flex items-center justify-between text-xs text-vscode-text-muted">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <kbd className="px-2 py-1 bg-vscode-panel border border-vscode-border rounded text-xs">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-2 py-1 bg-vscode-panel border border-vscode-border rounded text-xs">Enter</kbd>
              <span>Run</span>
            </span>
            <span className="flex items-center space-x-1">
              <kbd className="px-2 py-1 bg-vscode-panel border border-vscode-border rounded text-xs">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-2 py-1 bg-vscode-panel border border-vscode-border rounded text-xs">S</kbd>
              <span>Download</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-vscode-success rounded-full animate-pulse"></div>
            <span>Live Editor</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Toolbar