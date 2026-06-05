import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { OsintAuthProvider } from '@/osint/auth'
import App from './App'
import './i18n'
import './styles/globals.css'
import { queryClient } from '@/osint/lib/queryClient'
import { DialogProvider } from '@/osint/components/ui/Dialog'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <OsintAuthProvider>
        <DialogProvider>
          <App />
        </DialogProvider>
      </OsintAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
