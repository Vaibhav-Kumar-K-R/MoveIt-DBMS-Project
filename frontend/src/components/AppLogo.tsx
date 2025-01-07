import { Package } from "lucide-react";

const AppLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <Package className="size-7" />
      <h1 className="text-[1.6rem] font-bold select-none">MoveIt</h1>
    </div>
  );
};

export default AppLogo;
