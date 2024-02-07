import { twMerge } from "tailwind-merge"

export const NoteCardTitle = ({children, className, ...rest}: React.ComponentProps<'span'>) => {
    return <span className={twMerge('text-slate-200 font-medium text-sm mb-3', className)} {...rest}>{children}</span>
}