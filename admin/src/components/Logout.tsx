import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminLogoutRequest, useAdminAuth } from "@/api/AdminsApi";
const Logout = () => {
  const { isSignedIn } = useAdminAuth();
  const { logout, isLogoutLoading } = useAdminLogoutRequest();
  if (!isSignedIn) {
    return null;
  }

  return (
    <div>
      {isLogoutLoading ? (
        <Button className="flex text-md items-center gap-2">
          <Loader2 className="animate-spin" /> Logging you out...
        </Button>
      ) : (
        <Button
          onClick={() => logout()}
          className="flex text-md hover:opacity-85 items-center gap-2"
        >
          Logout <LogOut />
        </Button>
      )}
    </div>
  );
};
export default Logout;
