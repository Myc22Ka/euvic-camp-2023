export function formatDate(inputDate: string, format: "full" | "short" | "time" = "full") {
  const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const date: Date = new Date(inputDate);

  if (isNaN(date.getTime())) return "Invalid Date";

  const dayOfWeek: string = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getUTCDay()];
  const day: number = date.getUTCDate();
  const month: string = months[date.getUTCMonth()];
  const year: number = date.getUTCFullYear();
  let hours: number = date.getUTCHours();
  const minutes: number = date.getUTCMinutes();

  const ampm: string = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12

  if (format === "full") {
    return `${dayOfWeek}, ${day} ${month} ${year} ${hours}:${padZero(minutes)} ${ampm}`;
  } else if (format === "short") {
    return `${day} ${month} ${year}`;
  } else if (format === "time") {
    return `${hours}:${padZero(minutes)} ${ampm}`;
  }

  return "Invalid format";
}

function padZero(number: number) {
  return number < 10 ? "0" + number : String(number);
}

export function formatDateTimeRange(startDate: string, endDate: string, duration: number) {
  return duration === 0 ? formatDate(startDate) : `${formatDate(startDate)} • ${formatDate(endDate)}`;
}
