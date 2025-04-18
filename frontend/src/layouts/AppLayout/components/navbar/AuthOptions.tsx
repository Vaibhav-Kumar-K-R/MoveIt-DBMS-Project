import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import {
  LogIn,
  Store,
  UserCircle,
  UserCog,
  UserPlus,
  Users,
  Warehouse,
} from "lucide-react";
import { Link } from "react-router-dom";

const AuthOptions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <InteractiveHoverButton
          className="sm:block text-[.9rem] text-zinc-800 w-20 sm:w-36 flex items-center justify-center"
          text={
            <div className="flex items-center gap-2">
              <UserCircle className="h-4 w-4" />
              <span className="hidden sm:block">Account</span>
            </div>
          }
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-zinc-100">
         <DropdownMenuItem className="bg-zinc-100 focus:bg-zinc-200">
          <a href="https://moveitadmin.netlify.app/" target="_blank" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            <span>Sign in as Admin</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-zinc-200" />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            <span>Vendor Options</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-48 bg-zinc-100">
            <DropdownMenuItem className="bg-zinc-100 focus:bg-zinc-200">
              <Link to="/vendor/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                <span>Sign in as Vendor</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-200" />
            <DropdownMenuItem className="bg-zinc-100 focus:bg-zinc-200">
              <Link to="/vendor/sign-up" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                <span>Sign up as Vendor</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator className="bg-zinc-200" />

        <DropdownMenuItem className="bg-zinc-100 focus:bg-zinc-200">
          <Link to="/manager/login" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            <span>Sign in as Manager</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-zinc-200" />

        <DropdownMenuItem className="bg-zinc-100 focus:bg-zinc-200">
          <Link to="/warehouse/login" className="flex items-center gap-2">
            <Warehouse className="h-4 w-4" />
            <span>Sign in as Warehouse</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-zinc-200" />

        <DropdownMenuItem className="bg-zinc-100 focus:bg-zinc-200">
          <Link to="/employee/login" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Sign in as Employee</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthOptions;
