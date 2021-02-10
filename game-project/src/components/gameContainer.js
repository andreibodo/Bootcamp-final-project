import React, { useContext, useState } from 'react';
import { GlobalContext } from '../App';
import Dialog from '@material-ui/core/Dialog';
import GameDescription from './gameDescription';
import './gameContainer.css';

export default function GameContainer() {
    const { gamesArray, setSelectedGamePath, setSelectedGameImages } = useContext(GlobalContext);
    const [open, setOpen] = useState(false);
    const selectGame = (game) => {
        setSelectedGamePath(`https://api.rawg.io/api/games/${game.id}`);
        setSelectedGameImages(game.short_screenshots);
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
                        <div onClick={() => selectGame(game)} key={game.id} className="each-game-preview">
                            <img src={`${game.background_image}`} alt="poster" />
                            <p>{game.name}</p>
                        </div>
                    );
                })}
            </div>
            <Dialog fullWidth={true} maxWidth={'xl'} onClose={handleClose} open={open}>
                <button className="close-modal" onClick={()=>setOpen(false)}>x</button>
                <GameDescription />
            </Dialog>
        </>
    )
}
