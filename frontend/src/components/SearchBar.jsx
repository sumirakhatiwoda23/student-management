const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by name or course..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border p-2 w-full mb-3"
    />
  );
};

export default SearchBar;