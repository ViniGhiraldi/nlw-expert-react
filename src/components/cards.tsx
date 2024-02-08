'use client'

import { useSearchContext } from "@/contexts/search-context";
import { NoteCard } from "./note-card";
import { useNotesContext } from "@/contexts/notes-context";
import { useMemo } from "react";

export const Cards = () => {
    const { search } = useSearchContext();
    const { notes } = useNotesContext();

    const notesList = useMemo(() => {
        return notes.filter(note => note.content.includes(search));
    }, [notes, search])

    return(
        <>
            {notesList.map((note) => <NoteCard key={note.id} note={note}/>)}
        </>
    );
}