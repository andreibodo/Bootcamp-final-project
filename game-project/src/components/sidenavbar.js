import SettingsIcon from '@material-ui/icons/Settings';
import { FaCrown } from 'react-icons/fa';
import { GiQueenCrown } from 'react-icons/gi';
import { MdComputer } from 'react-icons/md';
import { IoGameController, IoLogoPlaystation, IoLogoXbox } from 'react-icons/io5';
import './sidenavbar.css';

export default function Sidenavbar() {
    return (
        <div className="side-nav">
            <div className="user-loged-in">
                <div className="user-name">
                    <img className="avatar" alt="Username" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" />
                    <h4>Username</h4>
                </div>
                <hr />
                <div className="options">
                    <IoGameController className="icon" />
                    <p>Playlist</p>
                </div>
                <div className="options">
                    <SettingsIcon />
                    <p>Settings</p>
                </div>
                <hr />
            </div>
            <div className="sort-top-rated">
                <h4>Top Rated</h4>
                <hr />
                <div className="options">
                    <GiQueenCrown className="icon" />
                    <p>All time top</p>
                </div>
                <div className="options">
                    <FaCrown className="icon" />
                    <p>Last year top</p>
                </div>
                <div className="options"></div>
                <hr />
            </div>
            <div className="sort-platforms">
                <h4>Platforms</h4>
                <hr />
                <div className="options">
                    <IoLogoPlaystation className="icon" />
                    <p>Playstation</p>
                </div>
                <div className="options">
                    <IoLogoXbox className="icon" />
                    <p>X Box</p>
                </div>
                <div className="options">
                    <MdComputer className="icon" />
                    <p>PC</p>
                </div>
                <hr />
            </div>
            <div className="sort-genres">
                <h4>Genres</h4>
                <hr />
                <div className="options">
                    <p>Action</p>
                </div>
                <div className="options">
                    <p>RPG</p>
                </div>
                <div className="options">
                    <p>Adventure</p>
                </div>
                <div className="options">
                    <p>Shooter</p>
                </div>
                <div className="options">
                    <p>Strategy</p>
                </div>
            </div>
        </div>
    )
}
