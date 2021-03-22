import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Login from './login';
import Register from './register';
import './navbar.css';
import { useContext, useState } from 'react';
import { GlobalContext } from '../App';

export default function Navbar() {
    const {setDataPath,register,setRegister}=useContext(GlobalContext);
    const search=(e)=>{
        if(e.target.value===""){
            setDataPath("http://localhost:8888/games/1");
        }else{
            setDataPath(`http://localhost:8888/search/${e.target.value}`);
        }
    }

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        setRegister(false);
    }

    const showRegister=()=>{
        if(register){
            return(
                <Register/>
            );
        }else{
            return(
                <Login/>
            );
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
                <Button onClick={()=>setOpen(true)} variant="contained">Log in</Button>
            </div>
            <Dialog maxWidth={'md'} onClose={handleClose} open={open}>
                {showRegister()}
            </Dialog>
        </nav>
    )
}
