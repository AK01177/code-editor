/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vscode-bg': '#0d1117',
        'vscode-sidebar': '#161b22',
        'vscode-editor': '#1e1e1e',
        'vscode-panel': '#252526',
        'vscode-border': '#30363d',
        'vscode-text': '#e6edf3',
        'vscode-text-muted': '#8b949e',
        'vscode-accent': '#58a6ff',
        'vscode-accent-hover': '#1f6feb',
        'vscode-success': '#238636',
        'vscode-warning': '#d29922',
        'vscode-error': '#f85149',
        'vscode-terminal': '#0d1117',
      },
      fontFamily: {
        'code': ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'pulse-subtle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}