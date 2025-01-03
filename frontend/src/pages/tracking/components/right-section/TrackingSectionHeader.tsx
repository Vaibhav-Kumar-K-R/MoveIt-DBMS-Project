import { formatDate } from "@/helpers/format-date";
import { ORDER_STATUS } from "@/config/order";
import { Order, Tracking } from "@/types/customer";

type TrackingSectionHeaderProps = {
  order: Order;
  tracking: Tracking[];
};

const TrackingSectionHeader = ({
  order,
  tracking,
}: TrackingSectionHeaderProps) => {
  return (
    <>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">Tracking ID</p>
          <p className="font-medium">#{order.tracking_id}</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Your order is</p>
        <h1 className="text-2xl font-bold">{ORDER_STATUS[order.status]}</h1>
        <p className="text-sm text-zinc-500">
          as on {formatDate(order.order_placed_date)}
        </p>
        <p className="text-xs text-muted-foreground">
          Last updated on{" "}
          {formatDate(
            order.order_delivered_date ||
              tracking?.[tracking.length - 1]?.updatedAt ||
              order.updatedAt,
          )}
        </p>
      </div>
    </>
  );
};

export default TrackingSectionHeader;
