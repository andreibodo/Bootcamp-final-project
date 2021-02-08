import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import './navbar.css';

export default function Navbar() {
    return (
        <nav className="upper-nav">
            <h2>LOGO</h2>
            <div className="searchfield">
                <SearchIcon />
                <input className="search-input" placeholder="Search..." type="text" />
            </div>
            <div className="user-avatar">
                <Button variant="contained">Sign in</Button>
            </div>
        </nav>
    )
}
