import { useEmployeeAuth } from "@/api/EmployeesApi";
import MiniInformationCard from "@/components/MiniInformationCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EMPLOYEE_ROLES } from "@/config/employee";
import { avatarFallbackColor } from "@/constants/avatar-colors";
import { calculateAge } from "@/helpers/calculate-age";
import { formatPhoneNumber } from "@/helpers/format-phone-number";
import { cn } from "@/lib/utils";
import Redirect from "@/pages/redirect/Redirect";
import {
  Briefcase,
  Calendar,
  Car,
  ChartLine,
  Edit2,
  IndianRupee,
  LocateFixedIcon,
  MailCheck,
  Map,
  MapPin,
  PhoneCall,
  Pin,
  Tag,
  UserCheck2,
} from "lucide-react";

const Profile = () => {
  const { employee: profile, isLoading } = useEmployeeAuth();

  if (isLoading) {
    return <Redirect />
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="px-5 py-7">
      <h1 className="text-[1.4rem] font-bold">My Profile</h1>
      <Separator className="my-4" />
      <div className="space-y-7">
        <div className="flex flex-col gap-3 mt-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="size-16">
                <AvatarImage src={profile.profile_img.profile_img_url} />
                <AvatarFallback
                  className={cn(avatarFallbackColor(), "text-2xl")}
                >
                  {profile.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Separator orientation="vertical" />
              <div className="flex flex-col">
                <p className="font-semibold text-[1.2rem]">{profile.name}</p>
                <p className="text-zinc-500 text-sm">
                  {EMPLOYEE_ROLES[profile.role]} | {profile.licence_number}
                </p>
              </div>
            </div>
            {/* TODO: Open Edit Modal */}
            <Button>
              <Edit2 />
              Edit
            </Button>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-main flex-1">
            <CardHeader>
              <h2 className="text-[1.1rem] font-bold">Personal Information</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-y-3">
                <MiniInformationCard
                  icon={UserCheck2}
                  title="Name"
                  information={profile.name}
                />
                <MiniInformationCard
                  icon={Calendar}
                  title="Date of Birth (DOB)"
                  information={profile.dob}
                />
                <MiniInformationCard
                  icon={Tag}
                  title="Age"
                  information={calculateAge(
                    profile.dob.split("-").reverse().join("-")
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-main flex-1">
            <CardHeader>
              <h2 className="text-[1.1rem] font-bold">Contact Information</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-y-3">
                <MiniInformationCard
                  icon={MailCheck}
                  title="Email"
                  information={profile.email}
                />
                <MiniInformationCard
                  icon={PhoneCall}
                  title="Phone"
                  information={formatPhoneNumber(profile.phone)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-main flex-1">
            <CardHeader>
              <h2 className="text-[1.1rem] font-bold">Address Information</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-y-3">
                <MiniInformationCard
                  icon={LocateFixedIcon}
                  title="Address"
                  information={profile.address || "N/A"}
                />
                <MiniInformationCard
                  icon={MapPin}
                  title="City"
                  information={profile.city || "N/A"}
                />
                <MiniInformationCard
                  icon={Map}
                  title="State"
                  information={profile.state || "N/A"}
                />
                <MiniInformationCard
                  icon={Pin}
                  title="Pin Code"
                  information={profile.pincode || "N/A"}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-main flex-1">
            <CardHeader>
              <h2 className="text-[1.1rem] font-bold">Other Information</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-y-3">
                <MiniInformationCard
                  icon={Briefcase}
                  title="Driving Experience"
                  information={`${profile.driving_experience} Years`}
                />
                <MiniInformationCard
                  icon={Car}
                  title="Vehicle Licence Number"
                  information={`${profile.licence_number}`}
                />
                <MiniInformationCard
                  icon={IndianRupee}
                  title="Salary"
                  information={`₹ ${profile.salary || 10000}`}
                />
                <MiniInformationCard
                  icon={ChartLine}
                  title="Work Status"
                  information={profile.work_status}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
