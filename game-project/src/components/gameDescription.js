import { useContext } from "react";
import { GlobalContext } from "../App";
import parse from 'html-react-parser';
import metacritic from '../logos/metacritic.png';
import ModalTabs from "./modalTabs";
import './gameDescription.css';

export default function GameDescription() {
    const { selectedGame } = useContext(GlobalContext);

    const setRating = () => {
        if (selectedGame.metacritic >= 70) {
            return ("good-rating");
        };
        if (selectedGame.metacritic <= 45) {
            return ("bad-rating");
        };
        if (selectedGame.metacritic < 70 && selectedGame.metacritic > 45) {
            return ("normal-rating");
        };
    };

    return (
        <div className="game-description">
            <div className="image-description">
                <img className="main-poster" src={selectedGame.background_image} alt="" />
                <div>
                    <div className="name-rating">
                        <h1>{selectedGame.name}</h1>
                        <div className="rating">
                            <img src={metacritic} alt="metacritic" />
                            <div className={setRating()}><h3>{selectedGame.metacritic}</h3></div>
                        </div>
                    </div>
                    {parse(selectedGame.description)}
                </div>
            </div>
            <ModalTabs/>
        </div>
    )
}
