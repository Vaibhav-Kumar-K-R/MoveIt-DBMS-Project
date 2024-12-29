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
import { formatDate, formatTime } from "@/helpers/format-date";
import { Tracking } from "@/types/customer";
import { Fragment } from "react/jsx-runtime";

type TrackingHistoryTimelineProps = {
  tracking: Tracking[];
};

const TrackingHistoryTimeline = ({
  tracking,
}: TrackingHistoryTimelineProps) => {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-xl">Tracking History</h3>
      <div className="space-y-4">
        <Timeline>
          {tracking.map((event, index, { length }) => (
            <Fragment key={event._id}>
              {event.departure_datetime && (
                <TimelineItem>
                  {(length - 1 !== index || event.departure_datetime) && (
                    <TimelineConnector className="bg-slate-950" />
                  )}
                  <TimeLineTemplate
                    message="Package Departed"
                    event={event}
                    date={event.departure_datetime}
                  />
                </TimelineItem>
              )}
              <TimelineItem>
                {length - 1 !== index && (
                  <TimelineConnector className="bg-slate-950" />
                )}
                <TimeLineTemplate
                  message="Package Arrived"
                  event={event}
                  date={event.arrival_datetime}
                />
              </TimelineItem>
            </Fragment>
          ))}
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
          {event.warehouse_id && (
            <div className="flex flex-col">
              <span className="text-zinc-500">{event.warehouse_id.name}</span>
              <span className="text-zinc-500">
                {event.warehouse_id.city}, {event.warehouse_id.state}
              </span>
              <span className="text-zinc-500">
                {event.warehouse_id.pincode}
              </span>
            </div>
          )}
        </TimelineDescription>
      </TimelineContent>
    </>
  );
};

export default TrackingHistoryTimeline;
