'use client'

import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface Note{
    id: number;
    date: Date;
    content: string;
}

interface NotesContextProps{
    notes: Note[];
    handleAddNote: (note: Note) => void;
}

const NotesContext = createContext({} as NotesContextProps);

export const useNotesContext = () => {
    return useContext(NotesContext);
}

export const NotesProvider = ({children}: {children: React.ReactNode}) => {
    const [notes, setNotes] = useState<Note[]>(() => {
        const localNotes = localStorage.getItem('notes');
        if(localNotes) return JSON.parse(localNotes) as Note[];
        return [];
    });

    const handleAddNote = useCallback((note: Note) => {
        if(note.content) setNotes(currentValues => {
            const newNotesValue = [note, ...currentValues];
            localStorage.setItem('notes',JSON.stringify(newNotesValue));
            return newNotesValue;
        });
    }, [])

    return(
        <NotesContext.Provider value={{notes, handleAddNote}}>
            {children}
        </NotesContext.Provider>
    )
}