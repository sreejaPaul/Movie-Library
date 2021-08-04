import axios from "axios";
import { useEffect,useState } from "react";
import { useParams,Link } from "react-router-dom";
import Card from '../Component/Card';
import "./genre.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft ,faArrowRight,faHome} from '@fortawesome/free-solid-svg-icons';
require("dotenv").config();

const Genredetail = ()=>{
    const[movie,setmovie] = useState([]);
    const[pageNumber,setpageno] = useState(1);
    const genreid = useParams().GenreID;
    const genrename = useParams().Genrename;
    

    useEffect(()=>{
        try{
            axios.get(process.env.REACT_APP_GENRE_FIRSTPART
                + process.env.REACT_APP_API_KEY
                + process.env.REACT_APP_GENRE_SECOND_PART
                + genreid
                + process.env.REACT_APP_GENRE_THIRD_PART
                +pageNumber)
            .then((datas)=>{
                setmovie(datas.data.results);
            })
        }catch(error){
            if(axios.isCancel(error)){
                console.log("Cancelled");
            }else{
                throw error;
            }
        }
    },[pageNumber,genreid]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pageNumber])

    
    const onbtnclick = (event)=>{
        (event.target.id === "nextbtn") ? setpageno(pageNumber+1) : setpageno(pageNumber-1); 
    }


    
    return(
        <div>
           
            <div>
                <h1>{"Popular in " + genrename}</h1>
                <Link to="/Movie-Library" style={{textDecoration:"none",color:"inherit"}}>
                    <button style={{border:"none",backgroundColor:"white",float:"right"}}>
                        <FontAwesomeIcon icon={faHome} size="2x" id="homebutton"/>
                    </button>
                </Link>
                <div className="movie">
                {movie.map((movie)=>{
                    return(
                    

                            <Link to = {"/Movie-Library/MovieDetail/"+ movie.id} style={{textDecoration: "none",color:"inherit"}} key={movie.id} >
                                <Card 
                                    key={movie.id} 
                                    imagelinks={process.env.REACT_APP_IMAGE_WIDTH200  + movie.poster_path}
                                    alternatelinks={movie.title}
                                    linkvalid={movie.poster_path === null ? "Not" : "Yes"}
                                                
                                />
                            </Link>
                            
                        
                    );
                })}
                </div>
                {(pageNumber > 1) ?                
                    <button id="prevbtn" onClick={onbtnclick}>
                        <FontAwesomeIcon icon={faArrowLeft}/>
                        {" page " + (pageNumber-1) + "  "}
                        
                    </button>
                    : ""}
                <button id="nextbtn" onClick={onbtnclick}>
                    {" page " + (pageNumber+1) + "  "}
                    <FontAwesomeIcon icon={faArrowRight}/>
                </button>
            </div>
        </div>
    );
}

export default Genredetail;