'use client'

import { useSearchContext } from "@/contexts/search-context";
import { Input } from "./primitives/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useCallback } from "react";

export const InputMain = () => {
    const { handleOnChange } = useSearchContext();
    const debounce = useDebounce(500);

    const handleOnChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value)
        debounce(() => {
            handleOnChange(event.currentTarget.value);
        })
    }, [])

    return(
        <Input className="text-4xl" placeholder="Busque em suas notas..." onChange={handleOnChangeInput} />
    );
}