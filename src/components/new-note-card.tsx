'use client'

import * as Dialog from "@radix-ui/react-dialog";
import { NoteCardComponents } from "./primitives/note-card-components";
import { ArrowUpRight, X } from 'lucide-react';
import { toast } from "sonner";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNotesContext } from "@/contexts/notes-context";

export const NewNoteCard = () => {
    const { handleAddNote } = useNotesContext();

    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [speechRecognition, setSpeechRecognition] = useState<string | SpeechRecognition>('');

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

        if (!isSpeechRecognitionAPIAvailable) {
            setSpeechRecognition('Infelizmente seu navegador não suporta a API de gravação!');
        }

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

        const speechRecognitionInstance = new SpeechRecognitionAPI();

        speechRecognitionInstance.lang = 'pt-BR';
        speechRecognitionInstance.continuous = true;
        speechRecognitionInstance.maxAlternatives = 1;
        speechRecognitionInstance.interimResults = true;

        setSpeechRecognition(speechRecognitionInstance);
    }, [])

    const handleSaveNote = useCallback((event: React.FormEvent) => {
        event.preventDefault();

        if (!textareaRef.current?.value) {
            toast.error('Nota sem conteúdo.');
            return;
        }

        handleAddNote({ id: Math.random(), date: new Date(), content: textareaRef.current.value.toString() });

        toast.success('Nota criada com sucesso!');

        setShouldShowOnboarding(false);
    }, [])

    const handleVoidText = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!event.currentTarget.value) setShouldShowOnboarding(false);
    }, [])

    const handleStartRecording = useCallback(() => {
        if (typeof speechRecognition === "string") {
            toast.warning(speechRecognition);
            return;
        }

        setIsRecording(true);
        setShouldShowOnboarding(true);

        speechRecognition.onresult = (event) => {
            const transcription = Array.from(event.results).reduce((text, result) => {
                return text.concat(result[0].transcript);
            }, '')

            textareaRef.current!.value = transcription;
        };

        speechRecognition.onerror = (event) => {
            console.error(event)
        }

        speechRecognition.start();
    }, [speechRecognition])

    const handleStopRecording = useCallback(() => {
        setIsRecording(false);

        if (typeof speechRecognition === "string") {
            toast.warning(speechRecognition);
            return;
        }

        speechRecognition.stop();
    }, [speechRecognition])

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <NoteCardComponents.root className="relative bg-slate-700">
                    <div className="absolute top-0 right-0 p-1.5 bg-slate-800"> <ArrowUpRight className="text-slate-600 size-5" /> </div>
                    <NoteCardComponents.title>Adicionar nota</NoteCardComponents.title>
                    <NoteCardComponents.content>Grave uma nota em áudio que será convertida para texto automaticamente.</NoteCardComponents.content>
                </NoteCardComponents.root>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/50" />
                <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full h-full md:h-[60vh] bg-slate-700 md:rounded-md flex overflow-hidden">
                    <Dialog.Close className="absolute top-0 right-0 p-1.5 bg-slate-800"><X className="size-5 text-slate-500" /></Dialog.Close>
                    <form className="flex flex-col flex-1">
                        <div className="flex-1 flex flex-col p-5">
                            <Dialog.Title className="text-slate-200 font-medium text-sm mb-3">Adicionar nota</Dialog.Title>
                            {shouldShowOnboarding ?
                                <textarea autoFocus ref={textareaRef} className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none" onChange={handleVoidText} />
                                :
                                <Dialog.Description className="text-slate-400 text-sm">Comece <button type="button" onClick={handleStartRecording} className="text-lime-400 hover:underline">gravando uma nota</button> em áudio ou se preferir <button type="button" onClick={() => setShouldShowOnboarding(true)} className="text-lime-400 hover:underline">utilize apenas texto</button>.</Dialog.Description>
                            }
                        </div>
                        {isRecording ? (
                            <button type="button" onClick={handleStopRecording} className="w-full flex items-center justify-center gap-2 py-4 font-medium text-sm outline-none bg-slate-900 text-slate-300 hover:text-slate-100">
                                <div className="size-3 rounded-full bg-red-500 animate-pulse"></div>
                                Gravando! (clique p/ interromper)
                            </button>
                        ) : (
                            <button type="button" onClick={handleSaveNote} className="bg-lime-400 w-full py-4 font-medium text-sm hover:bg-lime-500">Salvar nota</button>
                        )}
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}