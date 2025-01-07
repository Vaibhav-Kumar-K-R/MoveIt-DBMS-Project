import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineTitle,
} from "@/components/ui/timeline";
import { ORDER_TRACKING_STATUS } from "@/config/order";
import { formatDate, formatTime } from "@/helpers/format-date";
import { formatIndianPincode } from "@/helpers/format-pincode";
import { Tracking } from "@/types/customer";
import { Order } from "@/types/order";
import { Fragment } from "react/jsx-runtime";

type TrackingHistoryTimelineProps = {
  tracking: Tracking[];
  order: Order;
};

const TrackingHistoryTimeline = ({
  tracking,
  order,
}: TrackingHistoryTimelineProps) => {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-xl">Tracking History</h3>
      <div className="space-y-4">
        <Timeline>
          <TimelineItem>
            {tracking.length > 0 && (
              <TimelineConnector className="bg-slate-950" />
            )}

            <TimelineHeader>
              <TimelineIcon className="bg-slate-950" />
              <TimelineTitle className="flex flex-col gap-1">
                {formatDate(order.order_placed_date)}
                <p className="text-sm text-zinc-600 font-normal">
                  At {formatTime(order.order_placed_date)}
                </p>
              </TimelineTitle>
            </TimelineHeader>
            <TimelineContent>
              <TimelineDescription>
                <span className="font-semibold">Order Placed</span>

                <div className="flex flex-col">
                  <span className="text-zinc-500">
                    {order.vendor.shop_name}
                  </span>
                  <span className="text-zinc-500">
                    {order.vendor.city}, {order.vendor.state}
                  </span>
                  <span className="text-zinc-500">
                    {formatIndianPincode(order.vendor.pincode || "000000")}
                  </span>
                </div>
              </TimelineDescription>
            </TimelineContent>
          </TimelineItem>
          {tracking.map((event, index, { length }) => (
            <Fragment key={event._id}>
              <TimelineItem>
                {(length - 1 !== index || order.order_delivered_date) && (
                  <TimelineConnector className="bg-slate-950" />
                )}
                <TimeLineTemplate
                  message={`Package ${ORDER_TRACKING_STATUS[event.status]}`}
                  event={event}
                  date={event.createdAt}
                />
              </TimelineItem>
            </Fragment>
          ))}

          {order.order_delivered_date && (
            <TimelineItem>
              <TimelineHeader>
                <TimelineIcon className="bg-slate-950" />
                <TimelineTitle className="flex flex-col gap-1">
                  {formatDate(order.order_delivered_date)}
                  <p className="text-sm text-zinc-600 font-normal">
                    At {formatTime(order.order_delivered_date)}
                  </p>
                </TimelineTitle>
              </TimelineHeader>
              <TimelineContent>
                <TimelineDescription>
                  <span className="font-semibold">Order Delivered</span>

                  <div className="flex flex-col">
                    <span className="text-zinc-500">{order.customer_name}</span>
                    <span className="text-zinc-500">
                      {order.customer_address}
                    </span>
                  </div>
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          )}
        </Timeline>
      </div>
    </div>
  );
};

const TimeLineTemplate = ({
  event,
  message,
  date,
}: {
  event: Tracking;
  message: string;
  date: Date;
}) => {
  return (
    <>
      <TimelineHeader>
        <TimelineIcon className="bg-slate-950" />
        <TimelineTitle className="flex flex-col gap-1">
          {formatDate(date)}
          <p className="text-sm text-zinc-600 font-normal">
            At {formatTime(date)}
          </p>
        </TimelineTitle>
      </TimelineHeader>
      <TimelineContent>
        <TimelineDescription>
          <span className="font-semibold">{message}</span>

          <div className="flex flex-col">
            <span className="text-zinc-500">{event.warehouse.name}</span>
            <span className="text-zinc-500">
              {event.warehouse.city}, {event.warehouse.state}
            </span>
            <span className="text-zinc-500">
              {formatIndianPincode(event.warehouse.pincode)}
            </span>
          </div>
        </TimelineDescription>
      </TimelineContent>
    </>
  );
};

export default TrackingHistoryTimeline;
