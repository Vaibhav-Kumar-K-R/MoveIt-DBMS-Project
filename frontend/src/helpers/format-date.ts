import { format } from "date-fns";

export const formatDate = (date: Date | null): string => {
  if (!date) return "";
  return format(date, "do MMM yyyy");
};

export const formatTime = (date: Date | null): string => {
  if (!date) return "";
  return format(date, "HH:mm:ss");
};
