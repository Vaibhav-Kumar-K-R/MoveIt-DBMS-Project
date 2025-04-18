import { Loader2, LogOut, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { formatPhoneNumber } from "@/helpers/format-phone-number";
import { avatarFallbackColor } from "@/constants/avatar-colors";
import { cn } from "@/lib/utils";


const AuthButton = ({
  name,
  email,
  phone,
  imageUrl1,
  children,
  logOut,
  isLogoutLoading,
}: any) => {
  const avatarColor = avatarFallbackColor();

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src={imageUrl1} />
            <AvatarFallback className={cn(avatarColor)}>
              {name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="mr-4 w-[300px]">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={imageUrl1} />
                  <AvatarFallback className={cn(avatarColor)}>
                    {name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Separator orientation="vertical" />
                <div className="w-full">
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm text-zinc-500 line-clamp-1 text-ellipsis w-[300px]">
                    {email}
                  </p>
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
            <Button
              onClick={logOut}
              className="w-full"
              disabled={isLogoutLoading}
            >
              {isLogoutLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" /> Logging you out...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Logout <LogOut />
                </span>
              )}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AuthButton;
