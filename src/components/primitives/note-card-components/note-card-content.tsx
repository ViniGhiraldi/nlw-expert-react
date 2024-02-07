import { twMerge } from "tailwind-merge"

export const NoteCardContent = ({children, className, ...rest}: React.ComponentProps<'p'>) => {
    return <p className={twMerge('text-slate-400 text-sm leading-7', className)} {...rest}>{children}</p>
}