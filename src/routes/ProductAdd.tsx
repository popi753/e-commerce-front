/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserContext, type contextType } from "@/App"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { onRegister } from "@/services/auth"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router"
import { onProductAdd } from "../services/product"

export default function ProductAdd({ ...props }: React.ComponentProps<typeof Card>) {

    const [errors, setErrors] = useState<Record<string, string>>({});


    const navigate = useNavigate();

    const [user, setUser] = useContext<contextType>(UserContext) || [null, () => { }];



    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start p-4">
            <Link className="self-start pl-10 py-10" to="/listing">← Back to products</Link>
            <Card {...props} className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Add a product</CardTitle>
                    <CardDescription>
                        Enter your product information below
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const productData = new FormData(e.currentTarget);
                            console.log(Object.fromEntries(productData));

                            onProductAdd({
                                name: productData.get("name") as string,
                                description: productData.get("description") as string,
                                price: parseFloat(productData.get("price") as string),
                            }).then((data) => {
                                console.log("Product creation successful");

                                navigate("/listing");
                            }).catch((error) => {
                                console.error("Product creation failed:", error);
                                console.log(error)
                                setErrors(prev => ({ ...prev, ...error }));
                            });

                        }}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Product Name</FieldLabel>
                                <Input name="name" id="name" type="text" placeholder="Product Name" required />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="description">Product Description</FieldLabel>
                                <Input
                                    id="description"
                                    type="text"
                                    name="description"
                                    placeholder="Product Description"
                                    required
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}

                            </Field>
                            <Field>
                                <FieldLabel htmlFor="price">Product Price</FieldLabel>
                                <Input name="price" id="price" type="number" required />
                                <FieldDescription>
                                    Enter the price of the product.
                                </FieldDescription>
                                {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                            </Field>
                            
                            <FieldGroup>
                                <Field>
                                    <Button type="submit">Create product</Button>
                                </Field>
                            </FieldGroup>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
