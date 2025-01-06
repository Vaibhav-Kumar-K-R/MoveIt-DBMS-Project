import { useForm } from "react-hook-form";
import { personalDetailsSchema, PersonalDetailsType } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar, Camera, Mail, User2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MultiStepFormButtons } from "@/components/ui/multi-step-form";
import { useMultiStepFormContext } from "@/context/MultiStepFormContext";
import { useState } from "react";
import { Label } from "@/components/ui/label";

type PersonalDetailsSectionProps = {
  employeeData: PersonalDetailsType;
  updateEmployeeData: (data: PersonalDetailsType) => void;
};

const PersonalDetailsSection = ({
  employeeData,
  updateEmployeeData,
}: PersonalDetailsSectionProps) => {
  const form = useForm<PersonalDetailsType>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: employeeData,
  });
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const { controls } = useMultiStepFormContext();
  const { isLastStep, next } = controls;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImg(reader.result as string);
      reader.readAsDataURL(file);
      form.setValue("profile_img", file);
    }
  };

  const onSubmit = (data: PersonalDetailsType) => {
    updateEmployeeData(data);
    if (!isLastStep) next();
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
            <FormField
              control={form.control}
              name="profile_img"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center gap-4">
                  <FormLabel>Profile Image</FormLabel>
                  <div className="relative">
                    <div className="group relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
                      {/* Profile Image */}
                      <img
                        src={
                          selectedImg ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />

                      {/* Upload Icon */}
                      <Label
                        htmlFor="avatar-upload"
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <Camera className="w-6 h-6 text-white" />
                        <Input
                          type="file"
                          id="avatar-upload"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            handleImageUpload(e);
                            field.onChange(e.target.files?.[0] || null); // Update field value
                          }}
                        />
                      </Label>
                    </div>
                  </div>
                  <FormDescription>
                    Click the camera icon to upload a new profile photo
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="flex items-start w-full gap-3 flex-col">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
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
                      Please enter the name of the employee
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
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
                    <FormDescription>
                      Please enter the email of the employee
                    </FormDescription>
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
                    Please enter the phone number of the employee
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex-1 w-full">
                  <FormLabel>DOB *</FormLabel>
                  <FormControl>
                    <div className="flex items-center border rounded-md px-3 py-2">
                      <Calendar className="mr-2 text-gray-500" />
                      <Input
                        className="w-full text-sm placeholder:text-muted-foreground"
                        type="text"
                        placeholder="YYYY-MM-DD"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Please enter the date of birth of the employee
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <MultiStepFormButtons {...controls} />
        </form>
      </Form>
    </div>
  );
};

export default PersonalDetailsSection;
