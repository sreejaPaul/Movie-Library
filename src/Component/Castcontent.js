import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser ,faSadTear} from '@fortawesome/free-solid-svg-icons';
import Card from'./Card';
import {faImdb} from '@fortawesome/free-brands-svg-icons';
import './Castdetail.css';

const Castcontent = (props)=>{
    
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const onclick = (event)=>{
        const targetid = event.target.id;
        
        if(targetid === "websitelink")
            openInNewTab(props.website);
        else if(targetid === "IMDBlink")
            openInNewTab("https://www.imdb.com/name/"+props.imdb+"/");
    }


    return(
        <div >      
        <div className="detail">
        
            <div className="leftdiv">
                {(props.profile_path === null) ? <FontAwesomeIcon icon={faUser} size="6x" className="castimgstyle"/> :
                                            <img id="posterImage"src={process.env.REACT_APP_MOVIEDETAIL_ImageBaseAPI + props.profile_path} alt={props.name}/>
                }
            </div>
        

            <div className="rightdiv" style={{marginTop: "40px"}}>
                <div id="castname">{props.name}</div>
                <p></p>

                <div className="bday"> 

                    <b>{"Birth Day : "}</b>                 
                    {(props.bday === null ? "No Information Available about Birthday" : props.bday)}
                </div>
                
                
                <div id="castbio">
                    <b>{"Biography"}</b>
                    <p></p>
                    {(props.bio === "" ? "No Information Available" : props.bio)}
                </div>
                
                <div className="castbtndiv">
                    {(props.website === null ? "" : 
                        <button id={"websitelink"} onClick={onclick} className="castbtn">
                            {"Know More"}
                        </button>
                    )}
                    {(props.imdb === null ? "" : 
                        <button id={"IMDBlink"} onClick={onclick} className="castbtn">
                            <FontAwesomeIcon icon={faImdb} size="lg" style={{marginRight: "10px"}}/>
                            {"IMDB"}
                        </button>
                    )}
               </div>
                
                
            </div>
        
        </div>
        <div>
            <h2 style={{marginLeft:"50px",color:"grey"}}>{"Also appeared in"}</h2>
            <div style={{marginLeft: "25px"}}>
                        {(props.movielist.length > 0) ?   
                        props.movielist.map(
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
       
        
    </div>
    );
}

export default Castcontent;