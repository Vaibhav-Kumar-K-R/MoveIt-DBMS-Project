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
import MiniInformationCard from "@/components/MiniInformationCard";

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
          {[
            { icon: User2, title: "Name", information: signUpData.name },
            { icon: Mail, title: "Email", information: signUpData.email },
            {
              icon: Phone,
              title: "Phone",
              information: formatPhoneNumber(signUpData.phone),
            },
            { icon: Lock, title: "Password", information: "••••••••" },
          ].map((item) => (
            <MiniInformationCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Shop Details</h3>
        <div className="grid grid-cols-1 gap-y-4">
          {[
            {
              icon: Store,
              title: "Shop Name",
              information: signUpData.shop_name,
            },
            {
              icon: Podcast,
              title: "Description",
              information: signUpData.shop_description,
            },
          ].map((item) => (
            <MiniInformationCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Address Details</h3>
        <div className="grid grid-cols-1 gap-y-4">
          <MiniInformationCard
            icon={LocateFixedIcon}
            title={"Full Address"}
            information={signUpData.address}
          />
        </div>
        <div className="grid grid-cols-2 gap-y-4">
          {[
            { icon: Map, title: "City", information: signUpData.city },
            { icon: MapPin, title: "State", information: signUpData.state },
            { icon: Pin, title: "Pin Code", information: signUpData.pincode },
          ].map((item) => (
            <MiniInformationCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      <MultiStepFormButtons {...controls} isLoading={isLoading} />
    </form>
  );
};

export default SummarySection;
