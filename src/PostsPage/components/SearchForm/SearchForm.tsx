import { Search, SearchInput } from "./styles";

/**
 * The `SearchForm` component renders a search input and displays the number of posts found.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.query - The current search query.
 * @param {Function} props.setQuery - The function to update the search query.
 *
 * @example
 * return (
 *   <SearchForm query={query} setQuery={setQuery} filteredPosts={filteredPosts} />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 */

type SearchFormProps = {
  query: string;
  setQuery: (query: string) => void;
};

export const SearchForm = ({ query, setQuery }: SearchFormProps) => {
  return (
    <Search role="search">
      <form
        action="#"
        method="get"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
      >
        <SearchInput
          type="search"
          name="search"
          id="search"
          placeholder="Search posts..."
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          aria-label="Search posts"
          autoComplete="off"
        />
      </form>
    </Search>
  );
};
