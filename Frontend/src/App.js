import { createContext, useEffect, useState } from 'react';
import Navbar from './components/navbar';
import './App.css';
import Sidenavbar from './components/sidenavbar';
import GameContainer from './components/gameContainer';

export const GlobalContext = createContext({});

function App() {

  const [dataPath, setDataPath] = useState("http://localhost:8888/games/1");
  const [gamesArray, setGamesArray] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setPreviousPage] = useState("");
  const [maxPages, setMaxpages] = useState("");
  const [selectedGame, setSelectedGame] = useState({});
  const [register,setRegister]= useState(false);

  useEffect(() => {

    fetch(dataPath)
      .then(response => {
        if (!response.ok) {
          throw new Error("Ha ido algo mal...");
        }
        return response.json();
      })
      .then(data => {

        setNextPage(data.nextPage);
        setPreviousPage(data.prevPage);
        setMaxpages(data.maxPages)

        setGamesArray(data.results);

      })
      .catch(error => alert("Algo ha ido mal"));

  }, [dataPath]);

  return (
    <GlobalContext.Provider value={{
      selectedGame, setSelectedGame, dataPath, setDataPath, gamesArray,
      setGamesArray, nextPage, previousPage, maxPages, setMaxpages,
      register,setRegister
    }}>
      <div className="App">
        <Navbar />
        <div className="main-content">
          <Sidenavbar />
          <GameContainer />
        </div>
      </div>
      <footer>
          <div>
            <p>	&copy; 2021 <span>R</span>Games</p>
            <p>Data extracted from: RAWG API</p>
          </div>
      </footer>
    </GlobalContext.Provider>
  );
}

export default App;
