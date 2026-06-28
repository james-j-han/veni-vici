import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Dashboard from './components/Dashboard'
import BanList from './components/BanList'
import HistoryList from './components/HistoryList'

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);
  
  function onBan(attribute) {
    // exclude duplicates
    if (!banList.includes(attribute)) {
      setBanList([...banList, attribute]);
    }
  }

  // testing purposes to log to console
  useEffect(() => {
    console.log(banList);
  }, [banList]);

  function onUnban(attribute) {
    setBanList(banList.filter((item) => item !== attribute));
  }

  function onDiscover(pokemon) {
    setHistory([...history, pokemon]);
  }

  return (
    <div className='main-container'>
      <Dashboard pokemon={pokemon} setPokemon={setPokemon} banList={banList} onBan={onBan} onUnban={onUnban} onDiscover={onDiscover}/>
      <BanList banList={banList} onUnban={onUnban} />
      <HistoryList history={history} />
    </div>
  )
}

export default App
