'use client'

import * as Dialog from "@radix-ui/react-dialog";
import { NoteCardComponents } from "./primitives/note-card-components";
import { ArrowUpRight, X } from 'lucide-react';

export const NewNoteCard = () => {
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
                <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[600px] bg-slate-700 rounded-md flex flex-col overflow-hidden">
                    <Dialog.Close className="absolute top-0 right-0 p-1.5 bg-slate-800"><X className="size-5 text-slate-500"/></Dialog.Close>
                    <div className="flex-1 p-5">
                        <Dialog.Title className="text-slate-200 font-medium text-sm mb-3">Adicionar nota</Dialog.Title>
                        <Dialog.Description className="text-slate-400 text-sm">Comece <button className="text-lime-400 hover:underline">gravando uma nota</button> em áudio ou se preferir <button className="text-lime-400 hover:underline">utilize apenas texto</button>.</Dialog.Description>
                    </div>
                    <button className="bg-lime-400 w-full py-4 font-semibold text-sm">Salvar nota</button>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}