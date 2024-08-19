export default function SearchBar(props) {
  return (
    <form class="w-25 ms-auto input-group border border-dark rounded">
      <input
        class="form-control mr-sm-2"
        type="search"
        placeholder="Search Videos"
        aria-label="Search"
      />
      <button class="btn btn-light group-addon" type="submit">
        Search
      </button>
    </form>
  );
}
