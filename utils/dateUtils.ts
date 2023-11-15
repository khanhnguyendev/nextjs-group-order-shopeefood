import { format } from "date-fns";

export const getDateAsString = (createdAt: Date | string): string => {
  const date = typeof createdAt === "string" ? new Date(createdAt) : createdAt;
  return format(date, "MMMM dd, yyyy HH:mm:ss");
};
