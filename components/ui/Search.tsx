"use client";

import { createContext, useContext, useMemo, useState } from "react";

const SearchContext = createContext<{
  query: string;
  setQuery: (next: string) => void;
}>({ query: "", setQuery: () => {} });

export const useSearch = () => useContext(SearchContext);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const value = useMemo(() => ({ query, setQuery }), [query]);
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}
