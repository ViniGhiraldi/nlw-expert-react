import { twMerge } from "tailwind-merge"

export const NoteCardRoot = ({children, className, ...rest}: React.ComponentProps<'button'>) => {
    return <button className={twMerge('h-[250px] rounded-md flex flex-col text-start overflow-hidden p-5 hover:ring-2 hover:ring-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-lime-400', className)} {...rest}>{children}</button>
}