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

    const getNames = (array) => {
        let names = "";
        array.forEach((value, index) => {
            if (index === 0) {
                names = value.name;
            } else {
                names += `, ${value.name}`;
            };
        });
        return (names);
    };
    const getPlatforms = (array) => {
        let platforms = "";
        array.forEach((value, index) => {
            if (index === 0) {
                platforms = value.platform.name;
            } else {
                platforms += `, ${value.platform.name}`;
            };
        });
        return (platforms);
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
                    <hr />
                    <p>Developers: {getNames(selectedGame.developers)}</p>
                    <p>Genres: {getNames(selectedGame.genres)}</p>
                    <p>Platforms available: {getPlatforms(selectedGame.parent_platforms)}</p>
                    <p>Released on: {selectedGame.released}</p>
                </div>
            </div>
            <ModalTabs />
        </div>
    )
}
