'use client'

import * as Dialog from '@radix-ui/react-dialog';
import { NoteCardComponents } from './primitives/note-card-components';
import { X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useNotesContext } from '@/contexts/notes-context';
import { useCallback } from 'react';
import { toast } from 'sonner';

interface NoteCardProps{
    note: {
        id: number;
        date: Date;
        content: string;
    }
}

export const NoteCard = ({ note }: NoteCardProps) => {
    const { handleDeleteNote: onDeleteNote } = useNotesContext();

    const handleDeleteNote = useCallback((id: number) => {
        onDeleteNote(id);
        toast.info('Nota deletada com sucesso!');
    }, [])

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
                <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full h-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col overflow-hidden">
                    <Dialog.Close className="absolute top-0 right-0 p-1.5 bg-slate-800"><X className="size-5 text-slate-500"/></Dialog.Close>
                    <div className="flex-1 p-5">
                        <Dialog.Title className="text-slate-200 font-medium text-sm mb-3">{formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}</Dialog.Title>
                        <Dialog.Description className="text-slate-400 text-sm">{note.content}</Dialog.Description>
                    </div>
                    <button onClick={() => handleDeleteNote(note.id)} className="bg-slate-800 text-slate-300 w-full py-4 text-sm group">Deseja <span className='text-red-400 group-hover:underline'>apagar essa nota</span>?</button>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}