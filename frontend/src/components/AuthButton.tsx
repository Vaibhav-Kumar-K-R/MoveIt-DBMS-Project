import { LogOut, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { formatPhoneNumber } from "@/helpers/format-phone-number";
import { avatarFallbackColor } from "@/constants/avatar-colors";
import { cn } from "@/lib/utils";

type AuthButtonProps = {
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  logOut?: () => void;
  children?: React.ReactNode;
};

const AuthButton = ({
  name,
  email,
  phone,
  imageUrl,
  logOut,
  children,
}: AuthButtonProps) => {
  const avatarColor = avatarFallbackColor();

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback className={cn(avatarColor)}>
              {name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="mr-4">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={imageUrl} />
                  <AvatarFallback className={cn(avatarColor)}>
                    {name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Separator orientation="vertical" />
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm text-zinc-500">{email}</p>
                </div>
              </div>
              <Separator className="my-3" />
              <div>
                <p className="text-sm text-zinc-500 flex justify-between items-center gap-2">
                  <span className="flex items-center gap-2 font-semibold text-zinc-800">
                    <Phone size={16} /> Contact
                  </span>
                  {formatPhoneNumber(phone)}
                </p>
              </div>
            </div>
            {children}
            <Button onClick={logOut} className="w-full">
              Logout
              <LogOut />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AuthButton;
