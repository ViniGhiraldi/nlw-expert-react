'use client'

import { useSearchContext } from "@/contexts/search-context";
import { Input } from "./primitives/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useCallback } from "react";

export const InputMain = () => {
    const { handleOnChange } = useSearchContext();
    const debounce = useDebounce();

    const handleOnChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.currentTarget.value;
        debounce(() => {
            handleOnChange(val);
        })
    }, [])

    return(
        <Input className="text-4xl" placeholder="Busque em suas notas..." onChange={handleOnChangeInput} />
    );
}