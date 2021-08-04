import axios from "axios";
import { useState,useEffect } from "react";
import {Link} from 'react-router-dom';
import './genrecard.css';

const Genrecard = ()=>{

    const[genre,setgenrelist] = useState([]);

    useEffect(()=>{
        try{
            axios.get(process.env.REACT_APP_GENRECARD_FIRSTPART
                +process.env.REACT_APP_API_KEY
                +process.env.REACT_APP_GENRECARD_SECONDPART)
            .then((datas)=>{
                setgenrelist(datas.data.genres);
            })
        }catch(error){
            if(axios.isCancel(error)){
                console.log("Cancelled");
            }else{
                throw error;
            }
        }
                
    },[]);
   
    return(
        <div>
            <h2 style={{margin:"45px"}}>Choose Genres</h2>
            <div className="genre">
                {genre.map((genre,i)=>{     
                    return(
                        <Link to={"/Movie-Library/Genre/"+ genre.name +"/" + genre.id} style={{textDecoration:"none",color: "inherit"}} key={genre.id}>
                            <button className="genrecard" key={genre.id}>
                                
                                <span id="genrename">{genre.name}</span>

                            </button>
                        </Link>
                        
                    );
                })}
            
            </div>
        </div>
    );
}

export default Genrecard;