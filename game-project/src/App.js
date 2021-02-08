
import Navbar from './components/navbar';
import './App.css';
import Sidenavbar from './components/sidenavbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="main content">
        <Sidenavbar/>
      </div>
    </div>
  );
}

export default App;
