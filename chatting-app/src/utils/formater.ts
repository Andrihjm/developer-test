import dayjs from "dayjs";
import "dayjs/locale/id";

export function formatDateTime(date: string) {
  const now = dayjs();
  const d = dayjs(date);

  if (now.isSame(d, "day")) {
    return d.format("HH:mm");
  }

  if (now.subtract(1, "day").isSame(d, "day")) {
    return "Kemarin";
  }

  if (now.isSame(d, "month")) {
    return d.locale("id").format("dddd");
  }

  return d.format("DD/MM/YYYY");
}

export const formatTime = (date: string) => {
  return dayjs(date).format("HH:mm");
};
