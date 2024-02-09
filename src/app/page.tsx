import { Cards } from '@/components/cards';
import { InputMain } from '@/components/input-main';
import { NewNoteCard } from '@/components/new-note-card';
import Image from 'next/image';
import logo from '@/../public/nlwexpert.svg';

export default function Home() {
  return (
    <main className="bg-slate-900 min-h-screen text-slate-400 pt-16 pb-10 flex items-start justify-center px-5">
      <div className="max-w-6xl w-full flex flex-col gap-6">
        <Image src={logo} height={24} width={124.5} alt='logo' />
        <InputMain/>
        <div className='w-full h-px bg-slate-700'></div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <NewNoteCard/>
          <Cards/>
        </div>
      </div>
    </main>
  );
}
