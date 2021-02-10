import { createContext, useEffect, useState } from 'react';
import Navbar from './components/navbar';
import './App.css';
import Sidenavbar from './components/sidenavbar';
import GameContainer from './components/gameContainer';

export const GlobalContext = createContext({});

function App() {

  const [dataPath, setDataPath] = useState("https://api.rawg.io/api/games");
  const [selectedGamePath, setSelectedGamePath] = useState("https://api.rawg.io/api/games/3498");
  const [selectedGameImages, setSelectedGameImages] = useState([]);
  const [gamesArray, setGamesArray] = useState([]);
  const [nextPage,setNextPage] = useState("");
  const [previousPage,setPreviousPage] =useState ("");
  const [selectedGame, setSelectedGame] = useState({});
  const [gameClip, setGameClip] = useState("");
  const [requirements, setRequirements] = useState({});
  const [dlcArray,setDlcArray]=useState([]);

  useEffect(() => {

    fetch(dataPath)
      .then(response => {
        if (!response.ok) {
          throw new Error("Ha ido algo mal...");
        }
        return response.json();
      })
      .then(data => {
        if (data.next !== null) {
          setNextPage(data.next);
        };

        if (data.previous !== null) {
          setPreviousPage(data.previous);
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
        setDlcArray([]);

        setSelectedGame(data);
        setGameClip(data.clip.clip);
        setRequirements(data.platforms[0].requirements);
        /* ******THIS SECTION IS ON HOLD FOR NOW****
        DLC ERROR DESCRIPTION: 1 delay on each game, when pressed another game it gets the dlcs
        from the previous game POSIBLE CAUSES: too many fetch nested, promise problems API PROBLEM: too many URLS
        to get the description of a game, when making the database probably this problem will solve itself having 
        th dlcs in the same game or relationed */
        /* fetch(`https://api.rawg.io/api/games/${data.id}/additions`)
          .then(response => {
            if (!response.ok) {
              throw new Error("Ha ido algo mal...");
            }
            return response.json();
          })
          .then(dlcs => {
            dlcs.results.forEach(value=>{
              fetch(`https://api.rawg.io/api/games/${value.id}`)
              .then(response => {
                if (!response.ok) {
                  throw new Error("Ha ido algo mal...");
                }
                return response.json();
              })
              .then(dlc=>{
                setDlcArray(dlcArray=>[...dlcArray,dlc]);
                console.log(dlcArray);
              })
              .catch(error => alert("Something went wrong getting each DLC"));
            })
          })
          .catch(error => alert("Something went wrong getting the DLC's")); */
      })
      .catch(error => alert("Somethig went wrong getting the game"));

  }, [selectedGamePath]);

  return (
    <GlobalContext.Provider value={{
      selectedGame, setSelectedGame, dataPath, setDataPath, gamesArray,
      setGamesArray, nextPage, previousPage, selectedGamePath, setSelectedGamePath, selectedGameImages,
      setSelectedGameImages, gameClip, requirements,dlcArray
    }}>
      <div className="App">
        <Navbar />
        <div className="main-content">
          <Sidenavbar />
          <GameContainer />
        </div>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
