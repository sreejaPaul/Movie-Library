import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc ,faExternalLinkSquareAlt, faFileVideo } from '@fortawesome/free-solid-svg-icons';
import {faImdb} from '@fortawesome/free-brands-svg-icons';
import Recomendation from '../Container/Recomendation';
import Cast from '../Container/Cast';
import {Link} from 'react-router-dom';
import './MovieDetail.css';

const Content = (props)=>{
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [props.id]);
    

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const onclick = (event)=>{
        const targetid = event.target.id;
        
        if(targetid === "watchlink")
            openInNewTab(props.visitlink);
        else if(targetid === "IMDBlink")
            openInNewTab(process.env.REACT_APP_IMDBlink+props.imdblink+"/");
    }

    

    const setcolor = (statewidth)=>{
        let color = (statewidth>70) ? "#008000" : ((statewidth>35) ? "#FFD700" : "#cc0000");
        return color;
    }
  

    

        return(
            
            <div >
                
                <div className="detail">
                
                    <div className="leftdiv">
                        {(props.poster_path===null) ? 
                        <FontAwesomeIcon icon={faFileVideo} size="6x" style={{margin: "95px"}}/>
                        : <img src={process.env.REACT_APP_MOVIEDETAIL_ImageBaseAPI + props.poster_path} alt={props.title}/>}
                    </div>
                

                    <div className="rightdiv" >
                        <div id="title">{props.title}</div>
                        <p></p>
                        <div><h3><b>{(props.tagline==="")? null: props.tagline}</b></h3></div>
                        <div className="slidediv">
                            <div className="date">
                                <b>{"In Theaters"}</b> <p></p> {(props.releasedate==="")?"No Records Found" : props.releasedate}
                            </div>
                            <div className="duration">
                                <b>{"Runtime"}</b> <p></p> {(props.runtime === null)? "No Records Found" : (props.runtime) + " Min"}
                            </div>
                            <div className="rating">
                                <b>{"User Rating"}</b> <p></p>
                                <div style={{float:"left",height : "8px",width: "100px", borderRadius: "5px", backgroundColor:"lightgrey"}}>
                                    <div style={{height : "8px",width: props.statewidth+"%", backgroundColor: setcolor(props.statewidth),borderRadius:"5px", transition:"1s"}}>

                                    </div>
                                </div>
                                <div id="vote">
                                    <b>{props.vote}</b>
                                </div>
                            </div>
                                
                        </div>

                        <br></br>
                        <div>
                            <b>{"Genre:"}</b>
                            {(props.genresname.length > 0)?
                            props.genresname.map((genre,i)=>{
                                return(
                                    <Link to={"/Movie-Library/Genre/" + genre + "/" + props.genresid[i]} className="genrelink" key={genre}>
                                        <FontAwesomeIcon icon={faCompactDisc} size="xs"/>
                                        {" " +genre}
                                    </Link>
                                );                                 
                            }) : "No Records Found" }
                        </div>

                        <div className="overview">
                            <b>{"Overview:"}</b>
                            <p></p>
                            {(props.overview==="") ? "No Records Found" : props.overview}
                        </div>

                        <div className="buttondiv">
                            {(props.visitlink !== "" ) ?
                                <button id={"watchlink"} onClick={onclick} className="btn">
                                    <FontAwesomeIcon icon={faExternalLinkSquareAlt} size="lg" style={{marginRight: "10px"}}/>
                                    {"Watch here"}
                                </button> : null}
                            {(props.imdblink !== "" ) ?
                            <button id={"IMDBlink"} onClick={onclick} className="btn">
                                <FontAwesomeIcon icon={faImdb} size="lg" style={{marginRight: "10px"}}/>
                                {"IMDB"}  
                            </button> : null}
                        </div>
                        
                    </div>
                
                </div>
                <div className="cast">
                    <h3>Cast </h3>
                    <Cast id={props.id}/>
                </div>
                <Recomendation movieid={props.id}/>
                
                
            </div>
        );
}




export default Content;