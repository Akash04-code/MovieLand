import React, { useEffect, useState } from 'react';
import './App.css'
import MovieCard from './MovieCard';
import searchIcon from './Search.svg'
//5727fec0 api key

const Api_Url = "http://www.omdbapi.com/?i=tt3896198&apikey=5727fec0";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm,setSearchTerm] =useState("");
    const searchMovie = async (tittle) => {
        const response = await fetch(`${Api_Url}&s=${tittle}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovie();
    }, [])
    return (
        <div className='App'>
            <h1>MovieLand</h1>
            <div className='search'>
                <input
                    placeholder='Search for Movies'
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value) }}
                />
                <img src={searchIcon} alt="search" onClick={() => {searchMovie(searchTerm) }} />
            </div>
            {
                movies.length > 0 ? (
                    <div className='container'>
                        {
                            movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                    </div>
                ) : (<div className='empty'>
                    <h2>No Movie Found</h2>
                </div>
                )}
        </div>
    )
}

export default App;