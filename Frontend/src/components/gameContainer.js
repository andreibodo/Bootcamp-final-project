import React, { useContext, useState } from 'react';
import { GlobalContext } from '../App';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import GameDescription from './gameDescription';
import './gameContainer.css';
import Pagination from './pagination';

export default function GameContainer({ gamesArray, playlistDisplay }) {
    const { setSelectedGame, playlist, logedIn, setToggleAction, user } = useContext(GlobalContext);
    const [open, setOpen] = useState(false);
    const selectGame = (game) => {
        setSelectedGame(game);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }
    const addGame = (game, playlist, logedIn, user) => {
        if (logedIn) {
            let isInPlaylist=false;

            playlist.forEach((value)=>{
                if(value.id===game.id){

                    isInPlaylist=true;
                }
            })

            if (isInPlaylist) {
                return (<Button onClick={() => {
                    fetch(`http://localhost:8888/playlist/remove/${user.username}/${game.id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error("Ha ido algo mal...");
                            }
                            return response.json();
                        })
                        .then(data => {
                            setToggleAction(Math.random());
                        })
                        .catch(error => alert("Algo ha ido mal"));
                }
                } className="playlistHandle" variant="contained" color="secondary">Remove from Playlist</Button>)
            } else {
                return (<Button onClick={() => {
                    fetch(`http://localhost:8888/playlist/add/${user.username}/${game.id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error("Ha ido algo mal...");
                            }
                            return response.json();
                        })
                        .then(data => {
                            setToggleAction(Math.random());
                        })
                        .catch(error => alert("Algo ha ido mal"));
                }
                } className="playlistHandle" variant="contained" color="primary">Add to Playlist</Button>)
            }
        }
    }
    return (
        <div className="game-page">
            <div className="game-container">
                {gamesArray.map(game => {
                    return (
                        <div className="previewLogedIn">
                            <div onClick={() => selectGame(game)} key={game.id} className="each-game-preview">
                                <img src={`${game.poster}`} alt="poster" />
                                <p>{game.name}</p>
                            </div>
                            {addGame(game,playlist,logedIn,user)}
                        </div>
                    );
                })}
            </div>
            <Dialog fullWidth={true} maxWidth={'xl'} onClose={handleClose} open={open}>
                <button className="close-modal" onClick={() => setOpen(false)}>x</button>
                <GameDescription />
            </Dialog>
            {playlistDisplay ? <div /> : <Pagination />}
        </div>
    )
}
