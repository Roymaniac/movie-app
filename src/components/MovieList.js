const MovieList = ({ movies, handleFavoritesClick, favoriteComponent }) => {
  console.log(movies);
  const FavoriteComponent = favoriteComponent;

  return (
    <>
      {movies.map((movie, index) => (
        <div className="col-xs-12 col-md-12 col-lg-6 col-xl-4">
          <div className="row g-0 border-1 rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary">
                {movie.Type.toUpperCase()}
              </strong>
              <h3 className="mb-0">{movie.Title}</h3>
              <div className="mb-auto">{movie.Year}</div>
              <p className="mb-auto text-light">{movie.Plot}</p>
              <div
                onClick={() => handleFavoritesClick(movie)}
                className="d-flex align-items-center justify-content-start my-2"
              >
                <FavoriteComponent />
              </div>
            </div>
            <div className="col-auto mx-auto d-md-block d-lg-block">
              <img
                src={movie.Poster}
                alt="movie"
                width={200}
                height={250}
                className="bd-placeholder-img"
              ></img>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
