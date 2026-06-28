import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Dashboard from './components/Dashboard';

function App() {
  const [pokemon, setPokemon] = useState(null);

  return (
    <>
    <Dashboard pokemon={pokemon} setPokemon={setPokemon}/>
    </>
  )
}

export default App
