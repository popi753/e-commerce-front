import { useEffect, useRef, useCallback } from "react"

import Input from "./Input"

import PrimaryButton from "./PrimaryButton";

type filterProps = {
    setFrom: React.Dispatch<React.SetStateAction<string>>;
    setTo: React.Dispatch<React.SetStateAction<string>>;
}

export default function Filter({ setFrom, setTo }: filterProps) {

    const detailsRef = useRef<HTMLDetailsElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const details = detailsRef.current;
            if (details && details.open && !details.contains(event.target as Node)) {
                details.open = false;
            };
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        setFrom((e.target as HTMLFormElement).from.value);
        setTo((e.target as HTMLFormElement).to.value);
    }, []);

    return (
        <>
            <details ref={detailsRef}>
                <summary className="flex items-center gap-2 text-lg">
                    <p className="filter-label">Filter</p>
                </summary>
                <div className="z-50 w-100 flex flex-col absolute rounded-lg border border-gray-400 shadow-[0px_1px_4px_0px_#00000026] bg-white right-48">
                    <div className="flex p-4 gap-5 flex-col">
                        <p className="self-start font-semibold gap-3">Select Price</p>
                        <form className="flex flex-col gap-3" onSubmit={(e) => handleSubmit(e)}>
                            <div className="flex flex-row justify-between gap-3">

                                <Input type="number" placeholder="From" error=""  id="from" required={false}></Input>

                                <Input type="number" placeholder="To" error=""  id="to" required={false}></Input>
                            </div>
                            <PrimaryButton btnType="dark" className="rounded-lg" >Apply</PrimaryButton>
                        </form>
                    </div>
                </div>
            </details>
        </>

    )

}

