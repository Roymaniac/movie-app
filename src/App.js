import React, { useState, useEffect } from "react";
import "./index.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavorites from "./components/AddFavorites";
import RemoveFavorites from "./components/RemoveFavorites";
import Spinner from "./components/Spinner";
import Footer from "./components/Footer";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=ac7f5e75`;

    /* Setting the loading state to true. */
    if (searchValue !== "") {
      setLoading(true);
    }
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setLoading(false);
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem("react-movie-app-favorites")
    );

    if (movieFavorites) {
      setFavorites(movieFavorites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favorites", JSON.stringify(items));
  };

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );

    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  return (
    <>
      <div className="container-fluid movie-app">
        <div className="d-flex align-items-center mt-4 mb-4">
          <MovieListHeading title="Movie-Rated" />
          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>
        <div className="row mb-6">
          <h4 className="d-flex align-items-center justify-content-center my-1">
            Your Search
          </h4>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <MovieList
                movies={movies}
                handleFavoritesClick={addFavoriteMovie}
                favoriteComponent={AddFavorites}
              />
            </>
          )}
        </div>
        <div className="row d-flex align-items-center mt-4 mb-4"></div>
        <div className="row mb-6">
          <h4 className="d-flex align-items-center justify-content-center my-1">
            Your Favorite
          </h4>
          {favorites.length > 0 ? (
            <>
              <MovieList
                movies={favorites}
                handleFavoritesClick={removeFavoriteMovie}
                favoriteComponent={RemoveFavorites}
              />
            </>
          ) : (
            <>
              <div className="d-flex align-items-center justify-content-center my-3">
                You have no favorite movie
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
