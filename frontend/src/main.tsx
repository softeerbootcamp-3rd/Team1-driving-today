import './index.css'

import {ThemeProvider} from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom/client'

import {App} from './App.tsx'
import {ChatModalProvider} from './providers'
import {theme} from './styles/theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ChatModalProvider>
        <App />
      </ChatModalProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
