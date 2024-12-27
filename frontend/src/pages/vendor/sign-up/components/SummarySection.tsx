import {
  Lock,
  Mail,
  Map,
  MapPin,
  Phone,
  Pin,
  Podcast,
  Store,
  User2,
} from "lucide-react";
import { VendorsSignUpData } from "../types";
import { Separator } from "@/components/ui/separator";
import { MultiStepFormButtons } from "@/components/ui/multi-step-form";
import { useMultiStepFormContext } from "@/context/MultiStepFormContext";
import { useVendorSignUpRequest } from "@/api/VendorsApi";

type SummarySectionProps = {
  signUpData: VendorsSignUpData;
};

const SummarySection = ({ signUpData }: SummarySectionProps) => {
  const { controls } = useMultiStepFormContext();
  const { signUpVendor, isLoading } = useVendorSignUpRequest();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpVendor(signUpData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <h1 className="text-xl font-bold mb-2">Verify your details</h1>
      <Separator className="my-4" />

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Personal Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
          <div className="flex items-center w-full gap-3">
            <User2 className="text-zinc-600" />
            <Separator orientation="vertical" />
            <div className="text-sm">
              <p className="font-semibold">Name</p>
              <p className="text-zinc-500">{signUpData.name}</p>
            </div>
          </div>
          <div className="flex items-center w-full gap-3">
            <Mail className="text-zinc-600 size-6" />
            <Separator orientation="vertical" />
            <div className="text-sm flex-1">
              <p className="font-semibold">Email</p>
              <p className="text-zinc-500">{signUpData.email}</p>
            </div>
          </div>
          <div className="flex items-center w-full gap-3">
            <Phone className="text-zinc-600" />
            <Separator orientation="vertical" />
            <div className="text-sm">
              <p className="font-semibold">Phone</p>
              <p className="text-zinc-500">{signUpData.phone}</p>
            </div>
          </div>
          <div className="flex items-center w-full gap-3">
            <Lock className="text-zinc-600" />
            <Separator orientation="vertical" />
            <div className="text-sm">
              <p className="font-semibold">Password</p>
              <p className="text-zinc-500">••••••••</p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Shop Details</h3>
        <div className="grid grid-cols-1 gap-y-4">
          <div className="flex items-center w-full gap-3">
            <Store className="text-zinc-600" />
            <Separator orientation="vertical" />
            <div className="text-sm">
              <p className="font-semibold">Shop Name</p>
              <p className="text-zinc-500">{signUpData.shop_name}</p>
            </div>
          </div>
          <div className="flex items-center w-full gap-3">
            <Podcast className="text-zinc-600 size-6" />
            <Separator orientation="vertical" />
            <div className="text-sm flex-1">
              <p className="font-semibold">Description</p>
              <p className="text-zinc-500">{signUpData.shop_description}</p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Address Details</h3>
        <div className="grid grid-cols-2 gap-y-4">
          <div className="flex items-center w-full gap-3">
            <Map className="text-zinc-600" />
            <Separator orientation="vertical" />
            <div className="text-sm">
              <p className="font-semibold">City</p>
              <p className="text-zinc-500">{signUpData.city}</p>
            </div>
          </div>
          <div className="flex items-center w-full gap-3">
            <MapPin className="text-zinc-600" />
            <Separator orientation="vertical" />
            <div className="text-sm">
              <p className="font-semibold">State</p>
              <p className="text-zinc-500">{signUpData.state}</p>
            </div>
          </div>
          <div className="flex items-center w-full gap-3">
            <Pin className="text-zinc-600" />
            <Separator orientation="vertical" />
            <div className="text-sm">
              <p className="font-semibold">Pin Code</p>
              <p className="text-zinc-500">{signUpData.pin_code}</p>
            </div>
          </div>
        </div>
      </div>

      <MultiStepFormButtons {...controls} isLoading={isLoading} />
    </form>
  );
};

export default SummarySection;
