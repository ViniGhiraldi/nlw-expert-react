'use client'

import { Github, Link as LucideLink, Linkedin } from "lucide-react"
import Link from "next/link"

export const Footer = () => {
    return (
        <footer className='w-full grid grid-cols-1 md:grid-cols-2 gap-10 p-5 bg-slate-600 text-slate-900 border-t-8 border-slate-700'>
            <div className='text-center space-y-4 max-w-80 w-full lg:max-w-96 h-full m-auto'>
                <h1 className='text-2xl font-semibold tracking-tight'>Vinícius Correia Ghiraldi</h1>
                <div className='w-full h-px bg-slate-800'></div>
                <div className='flex justify-between gap-3'>
                    <button className='p-2 border border-slate-800 hover:ring-2 hover:ring-slate-800 rounded-lg'><Link href="https://www.linkedin.com/in/vinighiraldi/" target='_blank'><Linkedin className='size-6' /></Link></button>
                    <button className='p-2 border border-slate-800 hover:ring-2 hover:ring-slate-800 rounded-lg'><Link href="https://github.com/ViniGhiraldi/" target='_blank'><Github className='size-6' /></Link></button>
                    <button className='p-2 border border-slate-800 hover:ring-2 hover:ring-slate-800 rounded-lg'><Link href="https://vinighiraldi.github.io/" target='_blank'><LucideLink className='size-6' /></Link></button>
                </div>
            </div>
            <div className='max-w-80 w-full lg:max-w-96 h-full m-auto'>
                <p className='text-sm font-medium tracking-tight'>Notes Expert foi desenvolvido durante a NLW Expert da <Link href='https://www.rocketseat.com.br/' className='text-purple-950 font-semibold hover:underline'>Rocketseat</Link>. Transcrevi este projeto que originalmente foi criado em ReactJs para NextJs. A aplicação tem por objetivo guardar notas criadas pelo usuário localmente e possui integração com a API Speech Recognition de gravação de áudio.</p>
            </div>
        </footer>
    )
}