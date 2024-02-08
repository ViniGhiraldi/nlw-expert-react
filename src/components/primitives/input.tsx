import { twMerge } from "tailwind-merge"

export const Input = ({className, ...rest}: React.ComponentProps<'input'>) => {
    return(
        <input type="text" className={twMerge('bg-transparent font-semibold outline-none placeholder:text-slate-500', className)} {...rest} />
    );
}