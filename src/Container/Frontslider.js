import React from 'react';
import './Frontslider.css';
import Slider from '../Component/Slider';
import axios from 'axios';
import {Link} from 'react-router-dom';
require("dotenv").config();

class Frontslider extends React.Component{
    constructor(){
        super();
        this.state={
            now_playing_title : "",
            now_playing_bgimg : "",
            now_playing_overview:"",
            now_playing_id: 0,

            popular_image :"",
            popular_title:"",
            popular_bgimg:"",
            popular_overview:"",
            popular_id: 0,

            top_rated_image :"",
            top_rated_title:"",
            top_rated_bgimg:"",
            top_rated_overview:"",
            top_rated_id: 0,

            upcoming_image :"",
            upcoming_title:"",
            upcoming_bgimg:"",
            upcoming_overview:"",
            upcoming_id: 0,
            
        };
    }
    componentDidMount() {
        const img_basepath = process.env.REACT_APP_IMAGE_BASEPATH;

        const now_playing = process.env.REACT_APP_MOVIE_FIRST_PART+"now_playing"+process.env.REACT_APP_MOVIE_SECOND_PART
                         + process.env.REACT_APP_API_KEY + process.env.REACT_APP_MOVIE_LAST_PART+"1";
        
        const popular = process.env.REACT_APP_MOVIE_FIRST_PART+"popular"+process.env.REACT_APP_MOVIE_SECOND_PART
                        + process.env.REACT_APP_API_KEY + process.env.REACT_APP_MOVIE_LAST_PART+"1";

        const top_rated = process.env.REACT_APP_MOVIE_FIRST_PART+"top_rated"+process.env.REACT_APP_MOVIE_SECOND_PART
                        + process.env.REACT_APP_API_KEY + process.env.REACT_APP_MOVIE_LAST_PART+"1";

        const upcoming = process.env.REACT_APP_MOVIE_FIRST_PART+"upcoming"+process.env.REACT_APP_MOVIE_SECOND_PART
                        + process.env.REACT_APP_API_KEY + process.env.REACT_APP_MOVIE_LAST_PART+"1";
        
        //Now Playing Movie
        try{
            axios.get(now_playing)
            .then((datas)=>{
                const moviearr = this.filtermovies(datas.data.results);
                this.setState({now_playing_bgimg : img_basepath + moviearr[0].backdrop_path});
                this.setState({now_playing_title: moviearr[0].title});
                this.setState({now_playing_id : moviearr[0].id});
                this.setState({now_playing_overview: moviearr[0].overview});
            })
        }catch(error){
            if(axios.isCancel(error)){
                console.log("Cancelled");
            }else{
                throw error;
            }
        }

        //Popular Movie
        try{
            axios.get(popular)
            .then((datas)=>{
                const moviearr = this.filtermovies(datas.data.results);

                this.setState({popular_bgimg : img_basepath + moviearr[0].backdrop_path});
                this.setState({popular_title: moviearr[0].title});
                this.setState({popular_id : moviearr[0].id});
                this.setState({popular_overview: moviearr[0].overview});
                
                
            })
        }catch(error){
            if(axios.isCancel(error)){
                console.log("Cancelled");
            }else{
                throw error;
            }
        }

        //Top Rated Movie
        try{
            axios.get(top_rated)
            .then((datas)=>{
                const moviearr = this.filtermovies(datas.data.results);
                
                this.setState({top_rated_bgimg : img_basepath + moviearr[0].backdrop_path});
                this.setState({top_rated_title: moviearr[0].title});
                this.setState({top_rated_id : moviearr[0].id});
                this.setState({top_rated_overview: moviearr[0].overview});

            })
        }catch(error){
            if(axios.isCancel(error)){
                console.log("Cancelled");
            }else{
                throw error;
            }
        }

        //Upcoming Movie
        try{
            axios.get(upcoming)
            .then((datas)=>{
                
                const moviearr = this.filtermovies(datas.data.results);
            
                this.setState({upcoming_bgimg : img_basepath + moviearr[0].backdrop_path});
                this.setState({upcoming_title: moviearr[0].title});
                this.setState({upcoming_id : moviearr[0].id});
                this.setState({upcoming_overview: moviearr[0].overview});

            })
        }catch(error){
            if(axios.isCancel(error)){
                console.log("Cancelled");
            }else{
                throw error;
            }
        }


    }

    filtermovies = (movies)=>{
        const moviearr = movies.filter((movie)=>
            (movie.id !== this.state.now_playing_id && movie.id !== this.state.popular_id 
                && movie.id !== this.state.top_rated_id && movie.id !== this.state.upcoming_id));
        return moviearr;
    }


    
    render(){
        let sliderimage=[];
        return(
            <div className="frontsliderdiv" id="slider">
                {sliderimage=[
                
                    <Link to={"/MovieDetail/" + this.state.now_playing_id} key={0}>
                        <div className="slide" key={0}>  
                            <img src={this.state.now_playing_bgimg} alt={this.state.now_playing_title} className="bgimage"></img>      
                            <div className="titlecontent"> <h1>{"Ongoing Top Movie"} </h1></div> 
                            <div className="content">
                                <h1>{this.state.now_playing_title} </h1>
                                <h5><p>{this.state.now_playing_overview}</p></h5>
                            </div>
                        </div>
                    </Link>
                ,   <Link to={"/MovieDetail/" + this.state.popular_id} key={1}>
                        <div className="slide" key={1}>                  
                            <img src={this.state.popular_bgimg} alt={this.state.popular_title} className="bgimage"></img>             
                            <div className="titlecontent"> <h1>{"Most Popular Movie"} </h1></div> 
                            <div className="content"> 
                                <h1>{this.state.popular_title} </h1>
                                <h5><p>{this.state.popular_overview}</p></h5>
                            </div>
                        </div>
                    </Link>
                ,
                    <Link to={"/MovieDetail/" + this.state.top_rated_id} key={2}>
                        <div className="slide" key={2}>                   
                            <img src={this.state.top_rated_bgimg} alt={this.state.top_rated_title} className="bgimage"></img>                             
                            <div className="titlecontent"> <h1>{"User's Choice"} </h1></div>  
                            <div className="content"> 
                                <h1>{this.state.top_rated_title} </h1>
                                <h5><p>{this.state.top_rated_overview}</p></h5>
                            </div>
                        </div>
                    </Link>
                ,
                    <Link to={"/MovieDetail/" + this.state.upcoming_id} key={3}>
                        <div className="slide" key={3}> 
                            <img src={this.state.upcoming_bgimg} alt={this.state.upcoming_title} className="bgimage"></img>              
                            <div className="titlecontent"> <h1>{"Upcoming Movie"} </h1></div>  
                            <div className="content"> 
                                <h1>{this.state.upcoming_title}</h1>
                                <h5><p>{this.state.upcoming_overview}</p></h5> 
                            </div>
                        </div>
                    </Link>
                ]}
                
                

                <Slider imageList={sliderimage}/>
               
            </div>
        );
    }
}

export default Frontslider;