import { useContext } from 'react';
import { FaArrowAltCircleLeft,FaArrowAltCircleRight } from 'react-icons/fa';
import { GlobalContext } from '../App';
import './pagination.css';

export default function Pagination() {
    const {nextPage,previousPage,setDataPath}=useContext(GlobalContext);
    const prevPage=()=>{
        if(previousPage!==""){
            setDataPath(previousPage)
            window.scrollTo(0,0);
        }
    };

    const nextPageFunction=()=>{
        if(nextPage!==""){
            setDataPath(nextPage)
            window.scrollTo(0,0);
        }
    };

    return (
        <div className="pagination">
            <button onClick={prevPage} className="pages"><FaArrowAltCircleLeft/></button>
            <button onClick={nextPageFunction} className="pages"><FaArrowAltCircleRight/></button>
        </div>
    )
}
