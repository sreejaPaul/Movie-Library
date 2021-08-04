import axios from "axios";
import { useEffect,useState } from "react";
import { useParams,Link } from "react-router-dom";
import Card from '../Component/Card';
import "./genre.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft ,faArrowRight} from '@fortawesome/free-solid-svg-icons';

const Movielist = ()=>{
    const[movie,setmovie] = useState([]);
    const[title,settitle] = useState("");
    const[pageNumber,setpageno] = useState(1);
    
    const input = useParams().Input;


    useEffect(()=>{
        try{
            axios.get(process.env.REACT_APP_MOVIE_FIRST_PART
                        + input
                        +process.env.REACT_APP_MOVIE_SECOND_PART
                        + process.env.REACT_APP_API_KEY
                        + process.env.REACT_APP_MOVIE_LAST_PART
                        +pageNumber)
            .then((datas)=>{
                setmovie(datas.data.results);
                heading(input);
                
            })
        }catch(error){
            if(axios.isCancel(error)){
                console.log("Cancelled");
            }else{
                throw error;
            }
        }
    },[pageNumber,input]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pageNumber])

    
    const onbtnclick = (event)=>{
        (event.target.id === "nextbtn") ? setpageno(pageNumber+1) : setpageno(pageNumber-1); 
    }


    const heading = (input)=>{
        switch(input){
            case "top_rated":
                settitle("Top Rated Movies: ");
                break;
            case "now_playing":
                settitle("Ongoing Movies: ");
                break;
            case "popular":
                settitle("Popular Movies: ");
                break;
            case "upcoming":
                settitle("Upcoming Movies: ");
                break;
            default:
                settitle("Invalid");
                break;

        }
    }


    
    return(
        <div>          
            <h1>{title}</h1>
            <div className="movie">
            {movie.map((movie)=>{
                return(
                

                        <Link to = {"/MovieDetail/"+ movie.id} style={{textDecoration: "none",color:"inherit"}}>
                            <Card 
                                keys={movie.id} 
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
    );
}

export default Movielist;