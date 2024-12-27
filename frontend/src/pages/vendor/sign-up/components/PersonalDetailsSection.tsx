import { useForm } from "react-hook-form";
import { PersonalDetailsData, personalDetailsSchema } from "../types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import { Key, KeyRound, Mail, User2 } from "lucide-react";
import { MultiStepFormButtons } from "@/components/ui/multi-step-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMultiStepFormContext } from "@/context/MultiStepFormContext";

type PersonalDetailsSectionProps = {
  updateSignUpData: (data: PersonalDetailsData) => void;
  signUpData: PersonalDetailsData;
};

const PersonalDetailsSection = ({
  updateSignUpData,
  signUpData,
}: PersonalDetailsSectionProps) => {
  const form = useForm<PersonalDetailsData>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: signUpData,
  });
  const { controls } = useMultiStepFormContext();
  const { isLastStep, next } = controls;

  const onSubmit = (data: PersonalDetailsData) => {
    updateSignUpData(data);
    if (!isLastStep) return next();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full"
        >
          <h1 className="text-xl font-bold mb-2">Personal Details</h1>

          <div className="flex flex-col gap-3">
            <div className="flex items-start w-full gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md px-3 py-2">
                        <User2 className="mr-2 text-gray-500" />
                        <Input
                          type="text"
                          placeholder="John Doe"
                          {...field}
                          className="w-full text-sm placeholder:text-muted-foreground"
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Please enter your full name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md px-3 py-2">
                        <Mail className="mr-2 text-gray-500" />
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                          className="w-full text-sm placeholder:text-muted-foreground"
                        />
                      </div>
                    </FormControl>
                    <FormDescription>Please enter your Email</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone *</FormLabel>
                  <FormControl>
                    <div className="flex items-center border rounded-md px-3 py-2">
                      <div className="flex items-center mr-2 py-[0.38rem] rounded-l-md text-sm select-none font-semibold">
                        <img
                          className="mr-2 h-4"
                          src="/images/indian-flag.png"
                          draggable={false}
                        />
                        +91
                      </div>
                      <Input
                        type="tel"
                        placeholder="12345 67890"
                        {...field}
                        className="flex-1 text-sm placeholder:text-muted-foreground border rounded-r-md focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Please enter your Phone number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-start w-full gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md px-3 py-2">
                        <Key className="mr-2 text-gray-500" />
                        <PasswordInput
                          className="text-sm placeholder:text-muted-foreground"
                          placeholder="••••••••"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Please enter your Password
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Confirm Password *</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md px-3 py-2">
                        <KeyRound className="mr-2 text-gray-500" />
                        <PasswordInput
                          className="text-sm placeholder:text-muted-foreground"
                          placeholder="••••••••"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Please confirm your Password
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <MultiStepFormButtons {...controls} />
        </form>
      </Form>
    </div>
  );
};

export default PersonalDetailsSection;
