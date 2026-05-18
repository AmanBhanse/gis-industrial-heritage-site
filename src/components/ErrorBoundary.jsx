import { Component } from 'react'

/**
 * ErrorBoundary Component
 * Catches errors in child components and displays a fallback UI
 * Prevents entire app from crashing due to component errors
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '20px',
            margin: '20px',
            borderRadius: '8px',
            backgroundColor: '#ffe0e0',
            border: '1px solid #ff6b6b',
            color: '#c92a2a'
          }}
        >
          <h3>⚠️ Something went wrong</h3>
          <p>An error occurred while rendering this component.</p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details
              style={{
                marginTop: '10px',
                padding: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '4px',
                fontSize: '12px',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              <summary>Error details</summary>
              {String(this.state.error)}
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
