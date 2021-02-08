import React, { useContext, useState } from 'react';
import { GlobalContext } from '../App';
import Dialog from '@material-ui/core/Dialog';
import './gameContainer.css';

export default function GameContainer() {
    const { gamesArray } = useContext(GlobalContext);
    let selectedGameId = 0;
    const [selectedGame,setSelectedGame] = useState([])
    const [open, setOpen] = useState(false);
    const selectGame = (game) => {
        setSelectedGame(game);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <>
            <div className="game-container">
                {gamesArray.map(game => {
                    return (
                        <div onClick={()=>selectGame(game)} key={game.id} className="each-game-preview">
                            <img src={`${game.background_image}`} alt="poster" />
                            <p>{game.name}</p>
                        </div>
                    );
                })}
            </div>
            <Dialog fullWidth={true} maxWidth={'xl'} onClose={handleClose} open={open}>
                        <div className="selected-game">
                            <img src={`${selectedGame.background_image}`} alt="poster" />
                        </div>
            </Dialog>
        </>
    )
}
