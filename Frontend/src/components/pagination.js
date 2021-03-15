import { useContext } from 'react';
import { FaArrowAltCircleLeft,FaArrowAltCircleRight } from 'react-icons/fa';
import { GlobalContext } from '../App';
import './pagination.css';

export default function Pagination() {
    const {nextPage,previousPage,setDataPath,dataPath,maxPages}=useContext(GlobalContext);
    const prevPage=()=>{
        if(previousPage>=1){
            
            let prevPagePath=dataPath.split("/");
            prevPagePath[4]=previousPage;
            prevPagePath=prevPagePath.join("/");
            console.log(prevPagePath);
            setDataPath(prevPagePath);
            window.scrollTo(0,0);
        }
    };

    const nextPageFunction=()=>{
        if(nextPage<=maxPages){
            
            let nextPagePath=dataPath.split("/");
            nextPagePath[4]=nextPage;
            nextPagePath=nextPagePath.join("/");
            setDataPath(nextPagePath);
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
