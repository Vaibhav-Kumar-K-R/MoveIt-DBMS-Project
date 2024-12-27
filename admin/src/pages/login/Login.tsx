import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Mail, Lock, Loader2, User2 } from "lucide-react";
import PasswordInput from "@/components/ui/password-input";
import { useAdminAuth, useLoginUserRequestMutation } from "@/api/AdminsApi";
import { formSchema, LoginFormData } from "./types";
import AppLogo from "@/components/AppLogo";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Redirect from "../redirect/Redirect";
import { toast } from "sonner";

const LoginPage = () => {
  const { loginUser, isLoading: isLoginRequestLoading } =
    useLoginUserRequestMutation();
  const {
    isSignedIn,
    isLoading: isAuthLoading,
    isError: isAuthError,
  } = useAdminAuth();
  const navigate = useNavigate();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard", { replace: true });
    }

    if (isAuthError) {
      toast("You need to be logged in to access this page", { icon: "⚠️" });
    }
  }, [isSignedIn, isAuthError, navigate]);

  if (isAuthLoading) {
    return <Redirect />;
  }

  const onSubmit = async (data: LoginFormData) => {
    loginUser(data);
  };

  return (
    <div className="flex md:flex-row h-screen items-center justify-center gap-5 bg-gradient-to-tl from-zinc-100 to-zinc-50 relative">
      <div className="absolute top-4 left-7">
        <AppLogo />
      </div>
      {/* Login Form */}
      <div className="md:w-[50vw] w-full px-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <div className="flex flex-col items-center justify-center gap-1">
              <h1 className="text-[1.7rem] font-bold flex items-center gap-2">
                <User2 />
                Admin Login
              </h1>
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
                              className="outline-none"
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

                  <Button
                    type="submit"
                    className={`w-full ${
                      isLoginRequestLoading && "opacity-80"
                    }`}
                    disabled={isLoginRequestLoading}
                  >
                    {isLoginRequestLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <span className="flex items-center justify-center gap-1">
                        Sign In
                      </span>
                    )}
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
          src="/images/admin_login_illustration.png"
          alt="Login"
          draggable="false"
        />
      </div>
    </div>
  );
};

export default LoginPage;
