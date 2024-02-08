'use client'

import * as Dialog from "@radix-ui/react-dialog";
import { NoteCardComponents } from "./primitives/note-card-components";
import { ArrowUpRight, X } from 'lucide-react';
import { toast } from "sonner";
import { useCallback, useRef, useState } from "react";
import { useNotesContext } from "@/contexts/notes-context";

export const NewNoteCard = () => {
    const { handleAddNote } = useNotesContext();

    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSaveNote = useCallback((event: React.FormEvent) => {
        event.preventDefault();

        if(!textareaRef.current?.value) {
            toast.error('Nota sem conteúdo.');
            return;
        }

        handleAddNote({id: Math.random(), date: new Date(), content: textareaRef.current.value.toString()});

        toast.success('Nota criada com sucesso!');

        setShouldShowOnboarding(false);
    }, [])
    
    const handleVoidText = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if(!event.currentTarget.value) setShouldShowOnboarding(false);
    }, [])

    return(
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <NoteCardComponents.root className="relative bg-slate-700">
                    <div className="absolute top-0 right-0 p-1.5 bg-slate-800"> <ArrowUpRight className="text-slate-600 size-5"/> </div>
                    <NoteCardComponents.title>Adicionar nota</NoteCardComponents.title>
                    <NoteCardComponents.content>Grave uma nota em áudio que será convertida para texto automaticamente.</NoteCardComponents.content>
                </NoteCardComponents.root>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/50" />
                <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full max-h-[600px] h-full bg-slate-700 rounded-md flex overflow-hidden">
                    <Dialog.Close className="absolute top-0 right-0 p-1.5 bg-slate-800"><X className="size-5 text-slate-500"/></Dialog.Close>
                    <form onSubmit={handleSaveNote} className="flex flex-col flex-1">
                        <div className="flex-1 p-5">
                            <Dialog.Title className="text-slate-200 font-medium text-sm mb-3">Adicionar nota</Dialog.Title>
                            {shouldShowOnboarding ?
                            <textarea autoFocus ref={textareaRef} className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none" onChange={handleVoidText} />
                            :
                            <Dialog.Description className="text-slate-400 text-sm">Comece <button className="text-lime-400 hover:underline">gravando uma nota</button> em áudio ou se preferir <button onClick={() => setShouldShowOnboarding(true)} className="text-lime-400 hover:underline">utilize apenas texto</button>.</Dialog.Description>
                            }
                        </div>
                        <button className="bg-lime-400 w-full py-4 font-semibold text-sm">Salvar nota</button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}