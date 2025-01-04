import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideProps } from "lucide-react";

type StatsCardProps = {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  information: string;
};

const StatsCard = ({ icon: Icon, information, title }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="font-semibold text-xl">
        <div className="flex items-center justify-between">
          <span>{title}</span>
          <Icon />
        </div>
      </CardHeader>
      <CardContent>
        <p>{information}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
