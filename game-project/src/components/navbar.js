import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import './navbar.css';
import { useContext } from 'react';
import { GlobalContext } from '../App';

export default function Navbar() {
    const {setDataPath}=useContext(GlobalContext);
    const search=(e)=>{
        if(e.target.value===""){
            setDataPath("https://api.rawg.io/api/games");
        }else{
            setDataPath(`https://api.rawg.io/api/games?search=${e.target.value}`);
        }
    }
    return (
        <nav className="upper-nav">
            <h2>LOGO</h2>
            <div className="searchfield">
                <SearchIcon />
                <input onInput={search} className="search-input" placeholder="Search..." type="text" />
            </div>
            <div className="user-avatar">
                <Button variant="contained">Sign in</Button>
            </div>
        </nav>
    )
}
