import AppLogo from "@/components/AppLogo";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HandPlatter, Home, Menu, Phone, ShoppingCart } from "lucide-react";
import { NavLink, NavLinkRenderProps } from "react-router-dom";

const MobileNav = () => {
  const navStyles = ({ isActive }: NavLinkRenderProps) => {
    return `text-[1.03rem] w-full py-2 rounded-full flex flex-col items-center ${
      isActive
        ? "bg-zinc-800 text-zinc-100"
        : "text-zinc-800 hover:bg-zinc-100 hover:text-zinc-800"
    } transition-all duration-300`;
  };

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent className="w-[330px]">
          <SheetHeader className="flex flex-col gap-2">
            <SheetTitle>
              <AppLogo />
            </SheetTitle>
            <Separator className="my-7" />
            <SheetDescription className="flex flex-col gap-2 items-center transition-all duration-300">
              {[
                { path: "/", label: "Home", icon: <Home /> },
                { path: "/services", label: "Services", icon: <HandPlatter /> },
                {
                  path: "/products",
                  label: "Products",
                  icon: <ShoppingCart />,
                },
                { path: "/contact", label: "Contact", icon: <Phone /> },
              ].map(({ path, label, icon }, index) => (
                <NavLink key={index} to={path} className={navStyles}>
                  <SheetClose className="flex items-center gap-2">
                    {icon}
                    {label}
                  </SheetClose>
                </NavLink>
              ))}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
