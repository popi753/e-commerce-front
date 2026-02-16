import { Button } from "@/components/ui/button"
import {
  Card as CardComponent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { product } from "@/services/productsFetch"

export default function Card({ product }: { product: product }) {

  return (
    <CardComponent className="flex-1 relative mx-auto w-full max-w-sm pt-0 flex justify-between">
      <img
        src= {product.cover_image || "https://picsum.photos/300/200"}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover rounded-t-md"
      />
      <CardHeader>

        <CardTitle>{product?.name}</CardTitle>
        <CardDescription     className="truncate" title={product.description}>
          {product.description}
        </CardDescription>
        <div className="flex flex-col gap-4">
            <span className="font-bold">${product.price.toFixed(4)}</span>

            <span className="wrap-normal">by: {product.user?.username || "Unknown User"}</span>
        </div>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Product</Button>
      </CardFooter>
    </CardComponent>
  )
}
