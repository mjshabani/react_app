export function toDateString(date) {
  return new Date(`${date}Z`).toLocaleDateString("fa-IR");
}

export function toWeekdayString(date) {
  return new Date(`${date}Z`).toLocaleString("fa-IR", {
    weekday: "long"
  });
}

export function toHourString(date) {
  return new Date(`${date}Z`).toLocaleString("fa-IR", {
    hour: "numeric",
    minute: "numeric"
  });
}
