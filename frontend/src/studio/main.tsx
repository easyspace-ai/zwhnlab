import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { OsintAuthProvider } from '@/osint/auth'
import '@/index.css'
import StudioApp from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OsintAuthProvider>
      <StudioApp />
    </OsintAuthProvider>
  </StrictMode>,
)
