import React, { useState, useEffect, useCallback } from 'react'
import { Toaster } from 'react-hot-toast'
import Editor from './components/Editor'
import Output from './components/Output'
import Toolbar from './components/toolbar'
import { loadPyodide } from 'pyodide'

function App() {
  const [code, setCode] = useState(`# Welcome to Python Code Editor
# Write your Python code here and click Run to execute

def greet(name):
    return f"Hello, {name}! Welcome to our Python editor."

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Example usage
print(greet("Developer"))
print("\\nFibonacci sequence (first 10 numbers):")
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")

# Try some Python features
numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers]
print(f"\\nOriginal: {numbers}")
print(f"Squared: {squared}")

# Dictionary example
person = {
    "name": "Alice",
    "age": 30,
    "city": "San Francisco"
}

for key, value in person.items():
    print(f"{key}: {value}")`)

  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [pyodide, setPyodide] = useState(null)
  const [status, setStatus] = useState('loading') // loading, ready, running, error

  // Initialize Pyodide
  useEffect(() => {
    const initPyodide = async () => {
      try {
        setStatus('loading')
        const pyodideInstance = await loadPyodide({
          stdout: (text) => {
            setOutput(prev => prev + text)
          },
          stderr: (text) => {
            setOutput(prev => prev + text)
          }
        })
        setPyodide(pyodideInstance)
        setStatus('ready')
      } catch (error) {
        console.error('Failed to load Pyodide:', error)
        setStatus('error')
        setOutput('Error: Failed to initialize Python runtime. Please refresh the page.')
      }
    }

    initPyodide()
  }, [])

  const runCode = useCallback(async () => {
    if (!pyodide || isRunning) return

    setIsRunning(true)
    setStatus('running')
    setOutput('')

    try {
      // Run the code
      await pyodide.runPython(code)
      setStatus('ready')
    } catch (error) {
      setOutput(prev => prev + `Error: ${error.message}`)
      setStatus('error')
    } finally {
      setIsRunning(false)
    }
  }, [code, pyodide, isRunning])

  const clearOutput = useCallback(() => {
    setOutput('')
    if (status === 'error') {
      setStatus('ready')
    }
  }, [status])

  const downloadCode = useCallback(() => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'python_code.py'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [code])

  return (
    <div className="flex flex-col h-screen bg-vscode-bg">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e1e1e',
            color: '#e6edf3',
            border: '1px solid #30363d',
            borderRadius: '8px',
            fontFamily: 'JetBrains Mono, monospace',
          },
        }}
      />
      
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-vscode-sidebar border-b border-vscode-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-vscode-accent to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Py</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-vscode-text">Python Editor</h1>
              <p className="text-xs text-vscode-text-muted">Code • Execute • Download</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`status-indicator ${
            status === 'ready' ? 'status-ready' :
            status === 'running' ? 'status-running' :
            status === 'error' ? 'status-error' :
            'status-indicator bg-vscode-warning/20 text-vscode-warning border border-vscode-warning/30'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              status === 'ready' ? 'bg-green-400' :
              status === 'running' ? 'bg-yellow-400 animate-pulse' :
              status === 'error' ? 'bg-red-400' :
              'bg-yellow-400 animate-pulse'
            }`}></div>
            {status === 'loading' && 'Loading Python...'}
            {status === 'ready' && 'Ready'}
            {status === 'running' && 'Running...'}
            {status === 'error' && 'Error'}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Section */}
        <div className="flex-1 flex flex-col">
          <Toolbar
            onRun={runCode}
            onClear={clearOutput}
            onDownload={downloadCode}
            isRunning={isRunning}
            canRun={status === 'ready'}
          />
          
          <div className="flex-1 p-4">
            <Editor
              value={code}
              onChange={setCode}
              disabled={isRunning}
            />
          </div>
        </div>

        {/* Output Section */}
        <div className="w-full md:w-96 border-l border-vscode-border flex flex-col">
          <div className="px-4 py-3 bg-vscode-sidebar border-b border-vscode-border">
            <h2 className="text-sm font-semibold text-vscode-text">Output Console</h2>
          </div>
          
          <div className="flex-1 p-4">
            <Output
              output={output}
              isRunning={isRunning}
              isEmpty={!output}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App