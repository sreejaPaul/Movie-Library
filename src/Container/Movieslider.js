import React from 'react';
import Card from '../Component/Card.js';
import './Movieslider.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Genrecard from './Genrecard';
require("dotenv").config();



class Movieslider extends React.Component{

    constructor(){
        super();
        this.state={
            TopRatedList : [],
            NowplayingList : [],
            PopularList : [],
            UpcomingList: [],           
        };
    }
    
    

    componentDidMount(){
        try{
            axios.get(process.env.REACT_APP_MOVIE_FIRST_PART
                        +"top_rated"
                        +process.env.REACT_APP_MOVIE_SECOND_PART
                        + process.env.REACT_APP_API_KEY 
                        + process.env.REACT_APP_MOVIE_LAST_PART
                        +"1")       
            .then(datas => {
                this.setState({TopRatedList : datas.data.results});
            });
        }catch(error){
            if(axios.isCancel(error)){
                console.log("Cancelled");
            }else{
                throw error;
            }
        }

        try{
            axios.get(process.env.REACT_APP_MOVIE_FIRST_PART
                        +"now_playing"
                        +process.env.REACT_APP_MOVIE_SECOND_PART
                        + process.env.REACT_APP_API_KEY 
                        + process.env.REACT_APP_MOVIE_LAST_PART
                        +"1")       
            .then(datas => {
                this.setState({NowplayingList : datas.data.results});
            });
        }catch(error){
            if(axios.isCancel(error)){
                console.log("Cancelled");
            }else{
                throw error;
            }
        }

        try{
            axios.get(process.env.REACT_APP_MOVIE_FIRST_PART
                        +"popular"
                        +process.env.REACT_APP_MOVIE_SECOND_PART
                        + process.env.REACT_APP_API_KEY 
                        + process.env.REACT_APP_MOVIE_LAST_PART
                        +"1")       
            .then(datas => {
                this.setState({PopularList : datas.data.results});
            });
        }catch(error){
            if(axios.isCancel(error)){
                console.log("Cancelled");
            }else{
                throw error;
            }
        }

        try{
            axios.get(process.env.REACT_APP_MOVIE_FIRST_PART
                        +"upcoming"
                        +process.env.REACT_APP_MOVIE_SECOND_PART
                        + process.env.REACT_APP_API_KEY 
                        + process.env.REACT_APP_MOVIE_LAST_PART
                        +"1")       
            .then(datas => {
                this.setState({UpcomingList : datas.data.results});
            });
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
            <div>
                <div className="movslider">
                    <Link to={"/Movie-Library/MovieList/top_rated"} className="movlink">
                        <h2>TopRated Movies</h2>
                    </Link>
                    
                    <div className="scroller">
                        {    this.state.TopRatedList.map(
                                (movie,i)=>{
                                    return(
                                        <Link to = {"/Movie-Library/MovieDetail/"+ movie.id} className="link" key={movie.id}>
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

                        }
                    </div>
                </div>

                <div className="movslider">
                    <Link to={"/Movie-Library/MovieList/now_playing"} className="movlink">
                        <h2>In Theaters Now</h2>
                    </Link>
                    
                    <div className="scroller">
                        {    this.state.NowplayingList.map(
                                (movie,i)=>{
                                    return(
                                        <Link to = {"/Movie-Library/MovieDetail/"+ movie.id} className="link" key={movie.id}>
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

                        }
                    </div>
                </div>

                <div className="movslider">
                    <Link to={"/Movie-Library/Movielist/popular"} className="movlink">
                        <h2>Fan Favourites</h2>
                    </Link>
                    
                    <div className="scroller">
                        {    this.state.PopularList.map(
                                (movie,i)=>{
                                    return(
                                        <Link to = {"/Movie-Library/MovieDetail/"+ movie.id} className="link" key={movie.id}>
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

                        }
                    </div>
                </div>

                <div className="movslider">
                    <Link to={"/Movie-Library/Movielist/upcoming"} className="movlink">
                        <h2>Upcoming Movies</h2>
                    </Link>
                    
                    <div className="scroller">
                        {    this.state.UpcomingList.map(
                                (movie,i)=>{
                                    return(
                                        <Link to = {"/Movie-Library/MovieDetail/"+ movie.id} className="link" key={movie.id}>
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

                        }
                    </div>
                </div>
            
                <Genrecard/>

            </div>
            
                
                
            
        );
    }
}

export default Movieslider;