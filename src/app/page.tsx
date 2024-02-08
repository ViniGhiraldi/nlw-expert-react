import { Cards } from '@/components/cards';
import { NewNoteCard } from '@/components/new-note-card';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-slate-900 min-h-screen text-slate-400 pt-16 flex items-start justify-center">
      <div className="max-w-6xl w-full flex flex-col gap-6">
        <Image src='/logo.svg' height={24} width={124.5} alt='logo' />
        <input type="text" placeholder='Busque em suas notas...' className='bg-transparent font-semibold text-4xl outline-none placeholder:text-slate-500' />
        <div className='w-full h-px bg-slate-700'></div>
        <div className='grid grid-cols-3 gap-6'>
          <NewNoteCard/>
          <Cards/>
        </div>
      </div>
    </main>
  );
}
