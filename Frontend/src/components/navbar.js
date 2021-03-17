import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import './navbar.css';
import { useContext } from 'react';
import { GlobalContext } from '../App';

export default function Navbar() {
    const {setDataPath}=useContext(GlobalContext);
    const search=(e)=>{
        if(e.target.value===""){
            setDataPath("http://localhost:8888/games/1");
        }else{
            setDataPath(`http://localhost:8888/search/${e.target.value}`);
        }
    }
    return (
        <nav className="upper-nav">
            <h2><span>R</span>Games</h2>
            <div className="searchfield">
                <SearchIcon />
                <input onChange={search} className="search-input" placeholder="Search..." type="text" />
            </div>
            <div className="user-avatar">
                <Button variant="contained">Sign in</Button>
            </div>
        </nav>
    )
}
