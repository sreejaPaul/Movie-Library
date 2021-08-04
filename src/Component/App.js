import React from 'react';
import Uppernavbar from './Uppernavbar';
import Frontslider from '../Container/Frontslider';
import Movieslider from'../Container/Movieslider';
import{Route} from 'react-router-dom';
import Moviedetail from '../Container/Moviedetail';
import Castdetail from '../Container/Castdetail';
import Searchmovie from '../Container/Searchmovie';
import Genredetail from '../Container/Genredetail';
import Movielist from '../Container/Movielist';


function App() {
  return (
    <div>
      <Route path="/Movie-Library" exact>
        <Uppernavbar/>
        <Frontslider/>
        <Movieslider/>
  
      </Route>

      <Route path="/Movie-Library/Search/:SearchItem" exact>
          <Searchmovie/>
      </Route>


    <Route path="/Movie-Library/MovieList/:Input" exact>
        <Movielist/>
    </Route>

      <Route path="/Movie-Library/MovieDetail/:MovieID" exact>       
        <Moviedetail/>
      </Route> 

      <Route path="/Movie-Library/Genre/:Genrename/:GenreID" exact>
        <Genredetail/>
      </Route>

      <Route path="/Movie-Library/Cast/:CastID" exact>
        <Castdetail/>
      </Route>
  
    </div>
  );
}

export default App;
