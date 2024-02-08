'use client'

import { NoteCard } from "./note-card";
import { useNotesContext } from "@/contexts/notes-context";

export const Cards = () => {
    const { notes } = useNotesContext();

    return(
        <>
            {notes.map((note) => <NoteCard key={note.id} note={note}/>)}
        </>
    );
}