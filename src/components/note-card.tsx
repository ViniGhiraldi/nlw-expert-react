'use client'

import * as Dialog from '@radix-ui/react-dialog';
import { NoteCardComponents } from './primitives/note-card-components';
import { X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface NoteCardProps{
    note: {
        date: Date;
        content: string;
    }
}

export const NoteCard = ({ note }: NoteCardProps) => {
    return(
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <NoteCardComponents.root className="bg-gradient-to-b from-slate-800 from-50% to-black/40">
                    <NoteCardComponents.title>{formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}</NoteCardComponents.title>
                    <NoteCardComponents.content>{note.content}</NoteCardComponents.content>
                </NoteCardComponents.root>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/50" />
                <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[600px] bg-slate-700 rounded-md flex flex-col overflow-hidden">
                    <Dialog.Close className="absolute top-0 right-0 p-1.5 bg-slate-800"><X className="size-5 text-slate-500"/></Dialog.Close>
                    <div className="flex-1 p-5">
                        <Dialog.Title className="text-slate-200 font-medium text-sm mb-3">{formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}</Dialog.Title>
                        <Dialog.Description className="text-slate-400 text-sm">{note.content}</Dialog.Description>
                    </div>
                    <button className="bg-slate-800 text-slate-300 w-full py-4 text-sm group">Deseja <span className='text-red-400 group-hover:underline'>apagar essa nota</span>?</button>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}