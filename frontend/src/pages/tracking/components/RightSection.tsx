import { CustomerOrderDetail } from "@/types/customer";
import TrackingSectionHeader from "./right-section/TrackingSectionHeader";
import TrackingReviewSection from "./right-section/TrackingReviewSection";
import { Separator } from "@/components/ui/separator";
import TrackingHistoryTimeline from "./right-section/TrackingHistoryTimeline";

type RightSectionProps = {
  orderDetails: CustomerOrderDetail;
};

const RightSection = ({
  orderDetails: { order, tracking },
}: RightSectionProps) => {
  return (
    <div className="space-y-6">
      <TrackingSectionHeader order={order} tracking={tracking} />
      {order.status === "in_transit" && (
        <>
          <Separator />
          <TrackingReviewSection />
        </>
      )}
      <Separator />
      <TrackingHistoryTimeline tracking={tracking} order={order} />
    </div>
  );
};

export default RightSection;
