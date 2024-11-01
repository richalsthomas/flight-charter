export function getTimeDifference(startDate: Date, endDate: Date): string {
  // Calculate the difference in milliseconds
  const diffInMs = Math.abs(endDate.getTime() - startDate.getTime());

  // Convert the difference to hours and minutes
  const totalMinutes = Math.floor(diffInMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Format the result
  return `${hours}hr ${minutes}min`;
}
