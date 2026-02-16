import Card from "@/components/Card";
import myProducts from "@/services/myProducts";
import type { product } from "@/services/productsFetch";
import { useEffect, useState } from "react";

export default function MyProducts() {

        const [error, setError] = useState<boolean>(false);
    
            const [products, setProducts] = useState<product[]>([]);
        

        useEffect(() => {
                
                myProducts().then((res) => {
                    console.log(res)
                    if (res instanceof Error) {
                        alert(res.message);
                        setError(true);
                    } else {
                        
                        setProducts(res);
                    }
                }).catch((err) => { alert(err.message); setError(true) });
            }, []);

            console.log(products);

    
    return (
        <>
            <div className="flex flex-col flex-wrap gap-6 flex-1 py-4">
                                {error ? "something went wrong" :
                                    <>
                                        <div className="flex-1 flex flex-row flex-wrap gap-y-12 gap-x-6 justify-center">
                                            {products?.map((product, index) => (
                                                <Card
                                                    key={product._id + index.toLocaleString()}
                                                    product={product}>
                                                </Card>
                                            )) ?? "No products found"
                                            }
                                        </div>
                                      
                                    </>}
                            </div>
        </>
    )
}