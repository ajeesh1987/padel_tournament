import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Remove the '.tsx' extension here
import App from './rules' 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
