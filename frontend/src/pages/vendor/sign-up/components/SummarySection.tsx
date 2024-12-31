import {
  LocateFixedIcon,
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
import { formatPhoneNumber } from "@/helpers/format-phone-number";
import { MiniInformationCard } from "@/components/ui/MiniInformationCard";
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
            <MiniInformationCard Icon={User2} title={"Name"} information={signUpData.name} />
          </div>
          <div className="flex items-center w-full gap-3">
            <MiniInformationCard Icon={Mail} title={"Email"} information={signUpData.email} />
          </div>
          <div className="flex items-center w-full gap-3">
            <MiniInformationCard Icon={Phone} title={"Phone"} information={formatPhoneNumber(signUpData.phone)} />
          </div>
          <div className="flex items-center w-full gap-3">
            <MiniInformationCard Icon={Lock} title={"Password"} information={"••••••••"} />
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Shop Details</h3>
        <div className="grid grid-cols-1 gap-y-4">
          <div className="flex items-center w-full gap-3">
            <MiniInformationCard Icon={Store} title={"Shop Name"} information={signUpData.shop_name} />
          </div>
          <div className="flex items-center w-full gap-3">
             <MiniInformationCard Icon={Podcast} title={"Description"} information={signUpData.shop_description} />
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Address Details</h3>
        <div className="grid grid-cols-1 gap-y-4">
          <div className="flex items-center w-full gap-3">
             <MiniInformationCard Icon={LocateFixedIcon} title={"Full Address"} information={signUpData.address} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-4">
          <div className="flex items-center w-full gap-3">
            <MiniInformationCard Icon={Map} title={"City"} information={signUpData.city} />
          </div>
          <div className="flex items-center w-full gap-3">
             <MiniInformationCard Icon={MapPin} title={"State"} information={signUpData.state} />
          </div>
          <div className="flex items-center w-full gap-3">
            <MiniInformationCard Icon={Pin} title={"Pin Code"} information={signUpData.pin_code} />
          </div>
        </div>
      </div>

      <MultiStepFormButtons {...controls} isLoading={isLoading} />
    </form>
  );
};

export default SummarySection;
