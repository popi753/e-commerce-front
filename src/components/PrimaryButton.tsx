import { cn } from "@/lib/utils";

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    btnType: "dark" | "light" | "purple";
    children: React.ReactNode;
};

export default function PrimaryButton({ btnType, children, ...props }: PrimaryButtonProps) {
    return (
        <button {...props}
            className={cn("hover:scale-110 py-3.5 flex justify-center items-center disabled:cursor-wait! disabled:opacity-50 disabled:hover:scale-100",
                props.className,
                {
                    "bg-black text-white": btnType === "dark",
                    "bg-gray-100 text-purple hover:bg-gray-200": btnType === "light",
                    "bg-purple text-white": btnType === "purple",
                })}>
            <span className=" font-bold text-sm leading-none">
                {children}
            </span>
        </button>
    );
};