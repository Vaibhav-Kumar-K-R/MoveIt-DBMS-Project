import { LucideProps } from "lucide-react";

type MiniInformationCardProps = {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  information: string;
};

const MiniInformationCard = ({
  icon: Icon,
  title,
  information,
}: MiniInformationCardProps) => {
  return (
    <div className="flex items-center w-full gap-4">
      <Icon className="text-zinc-600 size-6" />
      <div className="text-sm flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-zinc-500">{information}</p>
      </div>
    </div>
  );
};

export default MiniInformationCard;
