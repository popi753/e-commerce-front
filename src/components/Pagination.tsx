import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type paginationProps = {
    page: string,
    setPage: React.Dispatch<React.SetStateAction<string>>;
    pageArr: (string | number)[];
}

export default function Pagination({ page, setPage, pageArr }: paginationProps) {

    return (
        <>
            <div className="mt-5 flex flex-col">
                <div className="flex justify-center items-center gap-2">
                    <Link to={"?page=" + (page == "1" ? 1 : Number(page) - 1)} onClick={() => { setPage(page == "1" ? "1" : (Number(page) - 1).toString()) }} className="icon-wrapper-medium">
                        ⬅️
                    </Link>

                    {pageArr.map((pageNum, index) => {
                        if (pageNum === '...') {
                            return <button key={index} className="w-8 h-8 bg-transparent border border-gray-600 rounded-sm text-sm font-semibold leading-5 p-0 text-black">...</button>;
                        }
                        return (
                            <Link key={index} to={`?page=${pageNum}`} onClick={() => setPage(String(pageNum))}>
                                <button className={cn("w-8 h-8 bg-transparent border border-gray-600 rounded-sm text-sm font-semibold leading-5 p-0 text-black ",
                                     {"border-orange-500 text-orange-500" : page == String(pageNum)}
                                )}>
                                    {pageNum}
                                </button>
                            </Link>
                        );
                    })}

                    <Link to={"?page=" + (Number(page) == pageArr[pageArr.length - 1] ? page : Number(page) + 1)} onClick={() => { setPage(Number(page) == pageArr[pageArr.length - 1] ? page.toString() : (Number(page) + 1).toString()) }} className="icon-wrapper-medium">
                        ➡️
                    </Link>
                </div>
            </div>
        </>
    )



}