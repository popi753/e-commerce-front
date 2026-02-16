import { useState, useEffect, useMemo,  } from 'react'
import { useSearchParams, useNavigate,  } from "react-router-dom";

import { type product, type meta, onFetchProducts } from '../services/productsFetch'

import Filter from '../components/Filter'
import Sorter from '../components/Sorter'
import Card from '../components/Card'
import Pagination from '../components/Pagination'

export default function ListingPage() {

    const navigate = useNavigate();

    const [products, setProducts] = useState<product[]>([]);
    const [meta, setMeta] = useState<meta>();

    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const [sort, setSort] = useState<string>("");
    const [searchString, setSearchString] = useState<string>("");

    const [searchParams] = useSearchParams();
    const [page, setPage] = useState<string>(searchParams.get("page") || "");

    const [error, setError] = useState<boolean>(false);

    const pageArr: (number | string)[] = useMemo(() => {
        const currentPage = meta?.current_page || 1;
        const totalPages = meta?.last_page || 1;
        const pages = [];
        // Always show first 2 pages
        for (let i = 1; i <= Math.min(2, totalPages); i++) {
            pages.push(i);
        }

        // Add dots if gap exists
        if (currentPage > 4) {
            pages.push('...');
        }

        // Add neighbors (current page and adjacent pages)
        const start = Math.max(3, currentPage - 1);
        const end = Math.min(totalPages - 2, currentPage + 1);

        for (let i = start; i <= end; i++) {
            if (!pages.includes(i)) {
                pages.push(i);
            }
        }

        // Add dots if gap exists
        if (currentPage < totalPages - 3) {
            pages.push('...');
        }

        // Always show last 2 pages
        for (let i = Math.max(totalPages - 1, 3); i <= totalPages; i++) {
            if (!pages.includes(i)) {
                pages.push(i);
            }
        }

        return pages;
    }, [meta?.current_page, meta?.last_page]);


    useEffect(() => {
        if (Number(from) < 0 && Number(to) < 0 && Number(from) > Number(to)) {
            alert("Invalid price range");
            return;
        }
        onFetchProducts({ page, from, to, sort, searchString }).then((res) => {
            console.log(res)
            if (res instanceof Error) {
                alert(res.message);
                setError(true);
            } else {
                if (res.meta.last_page < Number(page)) {
                    setPage(String(res.meta.last_page));
                    navigate(`?page=${res.meta.last_page}`, { replace: true });
                }
                setProducts(res.products);
                setMeta(res.meta);
            }
        }).catch((err) => { alert(err.message); setError(true) });
    }, [page, sort, from, to, searchString]);


    return (
        <>
            <div className="w-full flex flex-col flex-wrap">
                <header className="flex items-center justify-between">
                    <div className='flex flex-row gap-6 items-end'>
                        <p className="text-5xl font-semibold">Products</p>
                        
                    </div>
                    <form 
                        className='flex flex-row gap-4'
                    onSubmit={(e)=>{
                        e.preventDefault();
                        setSearchString(e.currentTarget.querySelector('input')?.value || "");
                    }}>
                        <input type='search' placeholder="Search products..." 
                                className='p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                        <button type='submit' name='search' id='search' className='border border-gray-300 rounded-lg px-2'>
                            search
                        </button>
                    </form>
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col h-max">
                            {meta ? <p className="results-found">
                                Showing {meta?.from}-{meta?.to} of {meta?.total} results
                            </p> : null}
                        </div>
                        <div className="vertical-line"></div>
                        <Filter setFrom={setFrom} setTo={setTo} />
                        <Sorter sort={sort} setSort={setSort} />
                    </div>
                </header>
                {(from || to) && <div className="my-2 mx-25 p-3 flex flex-row items-center gap-2 borer border-gray-300 rounded-3xl text-sm w-fit">
                    <p>Price: <span>{from || 0} - {to || "∞"}</span></p>
                    <div className="icon-wrapper-tiny" onClick={() => { setFrom(""); setTo("") }}>
                        X
                    </div>
                </div>}
                <div className="flex flex-col flex-wrap gap-6 flex-1 py-4">
                    {error ? "something went wrong" :
                        <>
                            <div className="flex-1 flex flex-row flex-wrap gap-y-12 gap-x-6 justify-center">
                                {meta?.total ? products.map((product, index) => (
                                    <Card
                                        key={product._id + index.toLocaleString()}
                                        product={product}>
                                    </Card>
                                )) : "No products found"
                                }
                            </div>
                            {meta?.total ? <Pagination page={page || "1"} setPage={setPage} pageArr={pageArr} /> : null}
                        </>}
                </div>
            </div>
        </>
    )
}