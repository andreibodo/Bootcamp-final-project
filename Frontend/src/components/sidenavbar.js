import SettingsIcon from '@material-ui/icons/Settings';
import Dialog from '@material-ui/core/Dialog';
import { FaCrown } from 'react-icons/fa';
import { GiQueenCrown } from 'react-icons/gi';
import { MdComputer } from 'react-icons/md';
import { IoGameController, IoLogoPlaystation, IoLogoXbox } from 'react-icons/io5';
import './sidenavbar.css';
import { useContext, useState } from 'react';
import { GlobalContext } from '../App';
import GameContainer from './gameContainer';

export default function Sidenavbar() {
    const {setDataPath,user,logedIn,playlist}=useContext(GlobalContext);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <div className="side-nav">
            <div className={logedIn?"user-loged-in":"userUndefined"}>
                <div className="user-name">
                    <div className="avatar" >{user.username?user.username.charAt(0).toUpperCase():"Z"}</div>
                    <h4>{user.username?user.username:"Username"}</h4>
                </div>
                <hr />
                <div className="options" onClick={()=>setOpen(true)}>
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
                    <p onClick={()=>setDataPath("http://localhost:8888/best/1")}>All time top</p>
                </div>
                <div className="options">
                    <FaCrown className="icon" />
                    <p onClick={()=>setDataPath("https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31")}>Last year top</p>
                </div>
                <div className="options"></div>
                <hr />
            </div>
            <div className="sort-platforms">
                <h4>Platforms</h4>
                <hr />
                <div className="options" onClick={()=>setDataPath("http://localhost:8888/platform=PlayStation/1")}>
                    <IoLogoPlaystation className="icon" />
                    <p>Playstation</p>
                </div>
                <div className="options" onClick={()=>setDataPath("http://localhost:8888/platform=Xbox/1")}>
                    <IoLogoXbox className="icon" />
                    <p>X Box</p>
                </div>
                <div className="options" onClick={()=>setDataPath("http://localhost:8888/platform=PC/1")}>
                    <MdComputer className="icon" />
                    <p>PC</p>
                </div>
                <hr />
            </div>
            <div className="sort-genres">
                <h4>Genres</h4>
                <hr />
                <div className="options" onClick={()=>setDataPath("http://localhost:8888/genre=Action/1")}>
                    <p>Action</p>
                </div>
                <div className="options" onClick={()=>setDataPath("http://localhost:8888/genre=RPG/1")}>
                    <p>RPG</p>
                </div>
                <div className="options" onClick={()=>setDataPath("http://localhost:8888/genre=Adventure/1")}>
                    <p>Adventure</p>
                </div>
                <div className="options" onClick={()=>setDataPath("http://localhost:8888/genre=Shooter/1")}>
                    <p>Shooter</p>
                </div>
                <div className="options" onClick={()=>setDataPath("http://localhost:8888/genre=Strategy/1")}>
                    <p>Strategy</p>
                </div>
            </div>
            <Dialog fullWidth={true} onClose={handleClose} open={open}>
                <button className="close-modal" onClick={() => setOpen(false)}>x</button>
                <GameContainer gamesArray={playlist} playlistDisplay={true} />
            </Dialog>
        </div>
    )
}
