import React, { useRef, useState } from "react";
import debounce from "../../utils/debounce";
type Props = {
  onSearch: (query: string) => void;
};

function SearchBar({ onSearch }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  // Create a debounced function using `useRef` to avoid re-creating it on every render
  const debouncedSearch = useRef(
    debounce((query: string) => {
      onSearch(query);
    }, 500)
  ).current;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query); // Call the debounced function
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleSearchChange}
      className="border p-2"
    />
  );
}

export default SearchBar;
