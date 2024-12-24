import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail, Lock, Loader2 } from "lucide-react";
import PasswordInput from "@/components/ui/password-input";
import { useLoginUserRequestMutation } from "@/api/AdminsApi";

const formSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

export type LoginFormData = z.infer<typeof formSchema>;

const LoginPage = () => {
  const { loginUser, isLoading } = useLoginUserRequestMutation();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    loginUser(data);
  };

  return (
    <div className="flex md:flex-row h-screen items-center justify-center gap-5 bg-gradient-to-tl from-zinc-100 to-zinc-50">
      {/* Login Form */}
      <div className="md:w-[50vw] w-full px-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <div className="flex flex-col items-center justify-center gap-1">
              <h1 className="text-3xl font-bold">Admin Login</h1>
              <p className="text-muted-foreground text-gray-400 text-[0.9rem]">
                Login to your account
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2 w-full"
                >
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className={
                            form.formState.errors.email ? "text-red-400" : ""
                          }
                        >
                          Email
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-md px-3 py-2">
                            <Mail className="mr-2 text-gray-500" />
                            <Input
                              placeholder="Enter your email"
                              type="email"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className={
                            form.formState.errors.password ? "text-red-400" : ""
                          }
                        >
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-md px-3 py-2">
                            <Lock className="mr-2 text-gray-500" />
                            <PasswordInput
                              placeholder="Enter your password"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className={`w-full ${isLoading && "opacity-80"}`}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="animate-spin" /> : <span>Sign up</span>}
                  </Button>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Image Section */}
      <div className="w-[50vw] h-full hidden md:block">
        <img
          className="w-full h-full object-scale-down py-10"
          src="/images/admin_login.png"
          alt="Login"
          draggable="false"
        />
      </div>
    </div>
  );
};

export default LoginPage;
