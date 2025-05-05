import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log('Main.jsx is running')
const rootElement = document.getElementById('root')

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  console.log('App rendered successfully')
} catch (error) {
  console.error('Error rendering app:', error)
  
  // Fallback to SimpleApp if full App fails
  console.log('Attempting to render SimpleApp')
  import('./SimpleApp.jsx').then(({ default: SimpleApp }) => {
    ReactDOM.createRoot(rootElement).render(<SimpleApp />)
    console.log('SimpleApp rendered as fallback')
  }).catch(fallbackError => {
    console.error('Error rendering SimpleApp fallback:', fallbackError)
    // Basic HTML fallback
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif;">
        <h1>Application Error</h1>
        <p>We're sorry, but the application failed to load.</p>
        <p>Please check the browser console for more information.</p>
        <button onclick="window.location.reload()">Reload Page</button>
      </div>
    `
  })
}
