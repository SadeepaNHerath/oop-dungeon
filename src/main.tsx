import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Prism } from 'prism-react-renderer'
import './index.css'

;(globalThis as unknown as { Prism: typeof Prism }).Prism = Prism
await import('prismjs/components/prism-java')

const { default: App } = await import('./App.tsx')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
