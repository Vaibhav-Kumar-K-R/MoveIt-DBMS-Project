import AppLogo from "@/components/AppLogo";
import { cn } from "@/lib/utils";

type RedirectProps = {
  className?: string;
};

const Redirect = ({ className }: RedirectProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center h-screen animate-pulse",
        className,
      )}
    >
      <AppLogo />
    </div>
  );
};

export default Redirect;
