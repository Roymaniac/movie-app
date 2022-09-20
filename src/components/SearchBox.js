const SearchBox = ({ searchValue, setSearchValue }) => {
  return (
    <>
      <div className="row d-sm-block">
        <form className="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Movies..."
            aria-label="Search"
          ></input>
        </form>
      </div>
    </>
  );
};

export default SearchBox;
