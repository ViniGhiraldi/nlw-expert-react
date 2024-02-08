'use client'

import { createContext, useCallback, useContext, useState } from "react";

interface SearchContextProps{
    search: string;
    handleOnChange: (searchVal: string) => void;
}

const SearchContext = createContext({} as SearchContextProps);

export const useSearchContext = () => {
    return useContext(SearchContext);
}

export const SearchProvider = ({children}: {children: React.ReactNode}) => {
    const [search, setSearch] = useState('');

    const handleOnChange = useCallback((searchVal: string) => {
        setSearch(searchVal);
    }, [])

    return(
        <SearchContext.Provider value={{search, handleOnChange}}>
            {children}
        </SearchContext.Provider>
    )
}