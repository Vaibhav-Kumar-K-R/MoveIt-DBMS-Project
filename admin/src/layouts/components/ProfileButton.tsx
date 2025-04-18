import { useAdminAuth } from "@/api/AdminsApi";
import { SidebarMenuButton } from "@/components/ui/sidebar";

function ProfileButton() {
  const { user } = useAdminAuth();
  return (
    <div className="bg-slate-200 mb-2 text-black rounded-md">
      <SidebarMenuButton className="h-fit">
        <div className="w-full flex justify-start gap-2  ">
          <img
            src={user?.profile_img_url}
            className="rounded-md  "
            width={75}
            height={75}
            alt="admin_profile_image"
          />
          <div className="flex justify-center items-center flex-col">
            <p className="font-bold">{user?.name}</p>
            <p className="font-semibold">{user?.email}</p>
          </div>
        </div>
      </SidebarMenuButton>
    </div>
  );
}

export default ProfileButton;
