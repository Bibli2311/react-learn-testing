import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Counter from './Counter.tsx'
import './index.css'
import APIComponent from './APIComponent.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Counter />
    <APIComponent></APIComponent>
  </StrictMode>,
)
