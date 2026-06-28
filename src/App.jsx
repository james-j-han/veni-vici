import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Dashboard from './components/Dashboard';

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [banList, setBanList] = useState([]);
  
  function onBan(attribute) {
    console.log('Banned');
    // exclude duplicates
    if (!banList.includes(attribute)) {
      setBanList([...banList, attribute]);
    }
  }

  useEffect(() => {
    console.log(banList);
  }, [banList]);

  function onUnban(attribute) {
    console.log('Unbanned');
    setBanList(banList.filter((item) => item !== attribute));
  }

  return (
    <>
    <Dashboard pokemon={pokemon} setPokemon={setPokemon} banList={banList} onBan={onBan} onUnban={onUnban}/>
    </>
  )
}

export default App
