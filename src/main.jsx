import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { PokemonProvider } from './contexts/PokemonContext'
import { FavoritesProvider } from './contexts/FavoritesContext'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PokemonProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </PokemonProvider>
    </BrowserRouter>
  </React.StrictMode>,
)