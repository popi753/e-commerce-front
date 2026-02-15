/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils"
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
import { Link, useNavigate } from "react-router"
import { useContext, useState } from "react"
import { onLogin } from "@/services/auth"
import { UserContext, type contextType } from "@/App"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [errors, setErrors] = useState<Record<string, string>>({});

    const navigate = useNavigate();

    const [user,setUser] = useContext<contextType>(UserContext) || [null, () => { }];



  return (
    <div className={cn("flex flex-col gap-6 min-h-screen  items-center justify-center p-4", className)} {...props}>
      <Link className="self-start pl-10 pb-10 -mt-40" to="/">← Back to home</Link>
      <Card className="w-full max-w-md ">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          {errors.body && <p className="text-sm text-red-500">{errors.body}</p>}
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => {
            e.preventDefault();
            const loginData = new FormData(e.currentTarget);
            console.log(Object.fromEntries(loginData));

            onLogin({
              email: loginData.get("email") as string,
              password: loginData.get("password") as string,
            }).then((data) => {
              console.log(data)
              console.log("Login successful");
              localStorage.setItem("token", data.token);
              setUser(data.user);
              navigate("/")
            }).catch((error) => {
              console.error("Login failed:", error);
              setErrors(prev => ({ ...prev, ...error }));
            });

          }}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" name="password" type="password" required />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </Field>
              <Field>
                <Button type="submit">Login</Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to="/register">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
