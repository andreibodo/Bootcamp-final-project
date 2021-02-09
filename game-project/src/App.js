import { createContext, useEffect, useState } from 'react';
import Navbar from './components/navbar';
import './App.css';
import Sidenavbar from './components/sidenavbar';
import GameContainer from './components/gameContainer';

export const GlobalContext = createContext({});

function App() {

  const [dataPath, setDataPath] = useState("https://api.rawg.io/api/games");
  const [selectedGamePath,setSelectedGamePath]=useState("https://api.rawg.io/api/games/1");
  const [selectedGameImages,setSelectedGameImages]=useState([]);
  const [gamesArray, setGamesArray] = useState([]);
  let nextPage="";
  let previousPage="";
  const [selectedGame,setSelectedGame] = useState({});

  useEffect(() => {

    fetch(dataPath)
      .then(response => {
        if (!response.ok) {
          throw new Error("Ha ido algo mal...");
        }
        return response.json();
      })
      .then(data => {
        if(data.next!==null){
          nextPage=data.next;
        };

        if(data.previous!==null){
          previousPage=data.previous;
        };

        setGamesArray(data.results);

      })
      .catch(error => alert("Algo ha ido mal"));

  }, [dataPath]);

  useEffect(() => {

    fetch(selectedGamePath)
      .then(response => {
        if (!response.ok) {
          throw new Error("Ha ido algo mal...");
        }
        return response.json();
      })
      .then(data => {
        setSelectedGame(data);
      })
      .catch(error => alert("Algo ha ido mal"));

  }, [selectedGamePath]);

  return (
    <GlobalContext.Provider value={{selectedGame,setSelectedGame,dataPath,setDataPath,gamesArray,
    setGamesArray,nextPage,previousPage,selectedGamePath,setSelectedGamePath,selectedGameImages,
    setSelectedGameImages}}>
      <div className="App">
        <Navbar/>
        <div className="main-content">
          <Sidenavbar/>
          <GameContainer/>
        </div>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
