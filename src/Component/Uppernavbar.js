import React from 'react';
import './Uppernavbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {Redirect,Link} from 'react-router-dom';

class Uppernavbar extends React.Component{
    constructor(){
        super();
        this.state={
            visibility: "hidden",
            searchtext : "",
            
        };
    }

    onbtnclick = ()=>{   
        if(this.state.visibility === "hidden" )
            this.setState({visibility : "visible"});
        else{
            this.onsearchbtnclick();
            this.setState({visibility : "hidden"});
        }    
    }

    onentersearchclick = (event)=>{

        if(this.inputlength() > 0  && event.charCode===13){
            this.setState({searchtext : event.target.value});    
        } 
         
    }

    onsearchbtnclick = ()=>{
        if(this.inputlength() > 0){
            this.setState({searchtext : this.inputvalue()});            
        }
    }

    inputlength = ()=>{
        let input = document.getElementById("inputboxstyle");      
        return input.value.length;
    }

    inputvalue = () =>{
        let input = document.getElementById("inputboxstyle");
        return input.value;
    }

    ondivclick = (event)=>{
        if(event.target.id !== "inputboxstyle"){
            if(this.state.visibility === "visible")
                this.setState({visibility: "hidden"});
        }
        
    }
    
    
    render(){
        const inputstyle={
            visibility: this.state.visibility,
        };
         
        return(
            <div id="titledivstyle" onClick={this.ondivclick}>
                <div className="titlestyle">
                    <Link to="/Movie-Library" id="titlelink">
                        <h2>Movie Library</h2>
                    </Link>
                </div>
                
                
                <div id="searchdivstyle">
                    <input type={"text"} placeholder={" Search Movies Here..."} id="inputboxstyle" style={inputstyle} onKeyPress={this.onentersearchclick}></input>
                    <button id="searchbuttonstyle" onClick={this.onbtnclick}>
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
    
                </div>              
                
                
                {(this.state.searchtext !== "") ? <Redirect to={"/Movie-Library/Search/" + this.state.searchtext}/> : ""}
                
            </div>
        );
    }
}

export default Uppernavbar;