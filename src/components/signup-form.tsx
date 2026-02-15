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

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {

  const [errors, setErrors] = useState<Record<string, string>>({});


  const navigate = useNavigate();

    const [user,setUser] = useContext<contextType>(UserContext) || [null, () => { }];



  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Link className="self-start pl-10 py-10" to="/">← Back to home</Link>
      <Card {...props} className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e)=>{
            e.preventDefault(); 
            const registerData = new FormData(e.currentTarget);
            console.log(Object.fromEntries(registerData));
            if (registerData.get("password") !== registerData.get("confirm-password")) {
              console.log("Passwords do not match");
              setErrors(prev => ({...prev, "password": "Passwords do not match"}));
              return;
            }

            onRegister({
              username: registerData.get("username") as string,
              email: registerData.get("email") as string,
              password: registerData.get("password") as string,
            }).then((data) => {
              console.log("Registration successful");
              localStorage.setItem("token", data.token);
              console.log(data)
              setUser(data.user);
              navigate("/");
            }).catch((error) => {
              console.error("Registration failed:", error);
              console.log(error)
              setErrors(prev => ({...prev, ...error}));
            });

          }}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Username</FieldLabel>
                <Input name="username" id="name" type="text" placeholder="John Doe" required />
                {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                 
                  name="email"
                  placeholder="m@example.com"
                  required
                />
                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your email
                  with anyone else.
                </FieldDescription>
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input name="password" id="password" type="password" required />
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}

              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input name="confirm-password" id="confirm-password" type="password" required />
                <FieldDescription>Please confirm your password.</FieldDescription>
                {errors["confirm-password"] && <p className="text-sm text-red-500">{errors["confirm-password"]}</p>}

              </Field>
              <FieldGroup>
                <Field>
                  <Button type="submit">Create Account</Button>
      
                  <FieldDescription className="px-6 text-center">
                    Already have an account? <Link to="/login">Sign in</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
