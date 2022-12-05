import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
import localisedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(calendar);
dayjs.extend(relativeTime);
dayjs.extend(localisedFormat);

export function formatDeadline(date) {
  const formatedDate = dayjs(date);
  const timeNow = dayjs(new Date());
  const differenceInDays = formatedDate.diff(timeNow, "day");
  if (differenceInDays === 0)
    return <div style={{ color: "green" }}>{formatedDate.fromNow()}</div>;
  if (differenceInDays < 0)
    return <div style={{ color: "red" }}>Deadline passed</div>;
  return formatedDate.calendar(null, {
    lastWeek: "ddd [at] LT",
    sameElse: "LT [on] ddd MMM DD YYYY",
  });
}

export function formatDate(date) {
  const formatedDate = dayjs(date);
  return formatedDate.fromNow();
}

export function formatTime(date) {
  const formatedDate = dayjs(date).format("m");
  if (formatedDate <= 20) {
    return formatedDate + " " + "minutes ago";
  } else if (formatedDate >= 20) {
    return formatedDate - 5 + " " + "minutes ago";
  } else if (formatedDate >= 59) {
    return formatedDate - 20 + " " + "minutes ago";
  } else if (formatedDate.includes("hours")) {
    return formatedDate + 30 + " " + "minutes ago";
  } else if (formatedDate.includes("days")) {
    return formatedDate + 35 + " " + "minutes ago";
  }
  return formatedDate;
}
