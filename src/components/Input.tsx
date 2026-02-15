
type inputProps = {
    type: string;
    id: string;
    placeholder: string;
    required: boolean;
    minLength?: number;
    error: string;
    checkoutEmail?: boolean;
    value?: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
}


export default function Input({ type, id, placeholder, required, minLength, error, value, setValue }: inputProps) {


    return (
        <>
            <div className=" flex ">
                <input
                    value={value}
                    onChange={(e) => setValue && setValue(e.target.value)}
                    autoComplete='off'
                    minLength={minLength}
                    type={type}
                    name={id} id={id}
                    placeholder={placeholder}
                    required={required}
                    className='px-3 max-w-40 border border-gray-600 h-10 flex-1 rounded-lg'
                />


                {error && <span className="error-msg">{error}</span>}
            </div>

        </>
    )
}




