import { useState,useEffect } from "react";
import {Link} from 'react-router-dom';
import Card from '../Component/Card';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear} from '@fortawesome/free-solid-svg-icons';


const Recomendation = (props)=>{
    const[movielist,setmovie] = useState([]);
    
    useEffect(()=>{
        try{
            axios.get(process.env.REACT_APP_RECOMENDATION_FIRSTPART
                +props.movieid
                +process.env.REACT_APP_RECOMENDATION_SECONDPART
                +process.env.REACT_APP_API_KEY
                +process.env.REACT_APP_RECOMENDATION_LASTPART)
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
    
    },[props.movieid])

    
    return(
        <div>
            <h2 style={{marginLeft: "45px",marginTop:"39px",color:"grey"}}>What to watch next</h2>
            <div style={{marginLeft: "25px"}}>
                {(movielist.length > 0) ?   
                        movielist.map(
                                (movie,i)=>{
                                    return(
                                        
                                        <Link to = {"/Movie-Library/MovieDetail/"+ movie.id} className="link" key={movie.id} >
                                            <Card 
                                                    key={movie.id} 
                                                    imagelinks={process.env.REACT_APP_IMAGE_WIDTH200  + movie.poster_path} 
                                                    alternatelinks={movie.title}
                                                    linkvalid={movie.poster_path === null ? "Not" : "Yes"}
                                            />
                                            
                                                
                                        </Link>
                                        
                                    ); 
                                }
                            )
                        : <div >
                            <FontAwesomeIcon icon={faSadTear} size="6x" style={{marginLeft: "700px"}}/>
                            <h3 style={{marginLeft: "630px"}}>{"No Recomendation available"}</h3>
                            </div>
                }

                
                
            </div>
        </div>
    );
}

export default Recomendation;