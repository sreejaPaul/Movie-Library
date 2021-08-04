import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import Card from '../Component/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft ,faArrowRight,faHome} from '@fortawesome/free-solid-svg-icons';

const Searchmovie = ()=>{
    const[movie,setmovie] = useState([]);
    const[pageNumber,setpageno] = useState(1);
    const search = useParams().SearchItem;

    useEffect(()=>{
        try{
            axios.get(process.env.REACT_APP_SEARCH_FIRSTPART
                +search
                + process.env.REACT_APP_SEARCH_SECONDPART
                +process.env.REACT_APP_API_KEY
                +process.env.REACT_APP_SEARCH_THIRDPART
                +pageNumber
                +process.env.REACT_APP_SEARCH_FOURTHPART)
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
    },[search,pageNumber]);
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pageNumber])

    
    const onbtnclick = (event)=>{
        (event.target.id === "nextbtn") ? setpageno(pageNumber+1) : setpageno(pageNumber-1); 
    }

    
    return(
        <div style={{overflow:"hidden"}}>
            <h1>{"Related Movies"}</h1>
            <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
                    <button style={{border:"none",backgroundColor:"white",float:"right"}}>
                        <FontAwesomeIcon icon={faHome} size="2x" id="homebutton"/>
                    </button>
                
            </Link>
            <div style={{margin:"20px"}}>
                {movie.map((movie)=>{
                    return(
                        <Link to = {"/MovieDetail/"+ movie.id} style={{textDecoration: "none",color:"inherit"}} key={movie.id} >
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
            {(pageNumber > 1 )?                
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

export default Searchmovie;