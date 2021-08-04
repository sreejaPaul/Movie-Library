import axios from 'axios';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import'./Cast.css';
import {Link} from 'react-router-dom';
require("dotenv").config();

class Cast extends React.Component{
    constructor(){
        super();
        this.state={
            name: [],
            profilePath: [],
            id: []
        }
    }
    
    componentDidMount(){
        try{
            axios.get(process.env.REACT_APP_CAST_FIRSTPART_PUBLIC_URL
                        + this.props.id+process.env.REACT_APP_CAST_SECONDPART_PUBLIC_URL
                        + process.env.REACT_APP_API_KEY
                        + process.env.REACT_APP_CAST_THIRDPART_PUBLIC_URL)
            .then((datas)=>{
                for(let i=0;i<datas.data.cast.length;i++){
                    this.setState({name: [...this.state.name, datas.data.cast[i].name]});
                    this.setState({profilePath: [...this.state.profilePath, datas.data.cast[i].profile_path]});
                    this.setState({id: [...this.state.id, datas.data.cast[i].id]});
                }           
            })
        }catch(error){
            if(axios.isCancel(error)){
                console.log("Cancelled");
            }else{
                throw error;
            }
        }
    }

    
    render(){
        
        return(
            <div className="maindiv">
                {(this.state.name.length > 0)?
                this.state.name.map((elements,i) => {
                    return(
                        
                        <Link to={"/Movie-Library/Cast/"+ this.state.id[i]} className="namestyle" key={elements+i}>
                            <div className="divstyle" key={this.state.id[i]} >
                                {
                                (this.state.profilePath[i] === null) ? 
                                    <FontAwesomeIcon icon={faUser} size="6x" className="imgstyle"/> :
                                    <img src={process.env.REACT_APP_IMAGE_WIDTH200 + this.state.profilePath[i]} alt={this.state.id[i]} className="imgstyle"></img>
                                }
                                <br></br>
                                <h5>{elements}</h5>
                            </div>

                        </Link>
                        
                        
                    );
                    
                }): "No Information Available"}

                
    
            </div>
        );
    }
}


export default Cast;