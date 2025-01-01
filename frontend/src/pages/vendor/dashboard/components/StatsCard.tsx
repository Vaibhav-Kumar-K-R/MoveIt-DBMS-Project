import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Text } from "lucide-react";

const StatsCard = () => {
  return (
    <Card>
      <CardHeader className="font-semibold text-xl">
        <div className="flex items-center justify-between">
          <span>Title</span>
          <Text />
        </div>
      </CardHeader>
      <CardContent>
        <p>Content</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
