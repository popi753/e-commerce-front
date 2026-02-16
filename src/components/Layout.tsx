import { useContext, useEffect, useRef } from "react";
import { Link, Outlet, useNavigate} from "react-router-dom"

import { UserContext, type contextType } from "../App";
import PrimaryButton from "./PrimaryButton";
import { onLogout } from "@/services/auth";


export default function Layout() {

    const detailsRef = useRef<HTMLDetailsElement>(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        
        document.addEventListener("click", (e) => handleClickOutside(e, detailsRef));
        return () => document.removeEventListener("click", (e) => handleClickOutside(e, detailsRef));
    }, []);
    
    const [user] = useContext<contextType>(UserContext) || [null, () => { }];

    return (
        <>
            <header className="w-full h-auto flex flex-row justify-between items-center px-24 p-4 border-b border-gray-300 max-sm:px-6">
            <div className="flex flex-row justify-between items-center gap-10 max-sm:w-full">

                <Link to="/">
                    logo
                </Link>
                <Link to="/listing" className="hover:underline max-sm:hidden" >
                    <span className="font-semibold text-sm leading-6 tracking-normal text-gray-600">Products</span>
                </Link>


            </div>



            <div className="flex flex-row justify-between items-center gap-2 font-raleway max-sm:hidden">
       
                {user?.username ? (
                    <div className="flex flex-row gap-4">
                         <Link to={"/product/create"} className="flex justify-center items-center gap-2 border border-gray-400 rounded-lg px-4 py-2 cursor-pointer">
                            add product
                        </Link>
                        <details ref={detailsRef}>
                            <summary className="flex justify-center items-center gap-2 border border-gray-400 rounded-lg px-4 py-2 cursor-pointer">
                                👱 profile
                            </summary>
                            <div className="z-100 right-20 w-80 h-36 absolute flex flex-col rounded-lg border border-gray-400 bg-white shadow-[0px_1px_4px_0px_#00000026]">
                                <div className="flex-1 flex flex-row justify-between items-end px-6 py-8">
                                    <div className="h-full flex flex-col justify-between items-start">
                                        👱
                                        <div className="flex flex-col">
                                            <Link to="/myproducts" className="text-sm font-semibold text-blue-600 hover:underline">
                                                View Products
                                            </Link>
                                            <span className="font-semibold text-sm leading-5" >{user.username}</span>
                                            <span className="text-sm leading-5">{user.email}</span>
                                        </div>
                                    </div>
                                    <div onClick={() => {onLogout();}} className="cursor-pointer">
                                        Log out
                                    </div>
                                </div>
                            </div>
                        </details>
                    </div>
                ) :

                    <>
                        <PrimaryButton btnType="dark" className="w-25 h-10 rounded-sm" type="button" onClick={() => navigate("/register")}>
                            Sign up
                        </PrimaryButton>
                        <PrimaryButton btnType="light" className="w-25 h-10 rounded-sm" type="button" onClick={() => navigate("/login")}>
                            Login
                        </PrimaryButton>
                    </>

                }
            </div>
        </header>


            <main className="flex-1 flex p-20">
                <Outlet />
            </main>



        </>
    )
}


function handleClickOutside(event: MouseEvent, Ref : React.RefObject<HTMLDetailsElement | null>) {
            // this function is also in header use one from helpers
            const details = Ref.current;
            if (details && details.open && !details.contains(event.target as Node)) {
                details.open = false;
            };
        };