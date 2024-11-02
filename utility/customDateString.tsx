export function customDateString(dateString: string): string {
  const date = new Date(dateString);

  // Array of abbreviated day names
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayName = days[date.getDay()]; // Get day name using local time

  // Get hours and minutes in 12-hour format using local time
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Format minutes to always be two digits
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Return formatted string
  return `${dayName} ${hours}:${formattedMinutes} ${amPm}`;
}
