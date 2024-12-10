import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 select-none">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-[7rem] md:text-[180px] font-bold text-sky-100 leading-none select-none">
          404
        </h1>

        <div className="relative w-64 h-64 mx-auto -mt-20">
          <img
            src="/images/sleeping-illustration.svg"
            alt="Sleeping illustration"
            className="md:scale-150"
            draggable={false}
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-[2.3rem] font-bold">Oops, page not found</h2>
          <p className="text-muted-foreground text-lg">
            This page is missing or you assembled the link incorrectly
          </p>
        </div>

        <Link
          to="/"
          replace
          className={cn(
            buttonVariants({
              variant: "link",
              className:
                "text-sm text-sky-500 hover:text-sky-600 transition-colors flex items-center gap-2 justify-center",
            })
          )}
        >
          Go back home <MoveRight />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
