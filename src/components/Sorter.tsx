import { useEffect, useRef } from "react"


type sorterProps = {
  sort: string,
  setSort: React.Dispatch<React.SetStateAction<string>>;
};

export default function Sorter({ sort, setSort }: sorterProps) {

  const sortRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const details = sortRef.current;
      if (details && details.open && !details.contains(event.target as Node)) {
        details.open = false;
      };
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <details ref={sortRef} className="cursor-pointer">
        <summary className="flex items-center gap-1 text-xl">
          <p>{sort === "created_at" ? "New Products First" :
            sort === "-price" ? "Price, high to low" :
              sort === "price" ? "Price, low to high" : "Sort by"}</p>
          <div className="icon-wrapper-small">
            ⬇️
          </div>
        </summary>
        <div className="w-60 z-100 flex flex-col border border-gray-400 rounded-lg shadow-[0px_1px_4px_0px_#00000026] absolute right-20 bg-white">
          <div className="items-start gap-2 p-3 dropdown-container">
            <p className="font-semibold text-lg ">Sort by</p>
            <ul className="flex flex-col gap-2">
              <li className="hover:bg-gray-300 rounded-sm p-2" onClick={() => { setSort("created_at") }}> <span> New Products First </span></li>
              <li className="hover:bg-gray-300 rounded-sm p-2" onClick={() => { setSort("-price") }}> <span> Price, high to low</span></li>
              <li className="hover:bg-gray-300 rounded-sm p-2" onClick={() => { setSort("price") }}> <span> Price, low to high</span></li>
            </ul>
          </div>
        </div>
      </details>
    </>
  );
}
