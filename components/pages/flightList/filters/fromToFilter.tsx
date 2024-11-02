import { Flight } from "@/data/flights";

export function filterStops(
  flights: Flight[],
  startStop: string,
  arrivalStop: string
): Flight[] {
  return flights.reduce<Flight[]>((result, flight) => {
    const startIndex = flight.stops.findIndex(
      (stop) => stop.stopName === startStop
    );
    const endIndex = flight.stops.findIndex(
      (stop) => stop.stopName === arrivalStop
    );

    if (startIndex !== -1 && endIndex !== -1 && startIndex <= endIndex) {
      // Include only if both stops are found and in the correct order
      result.push({
        ...flight,
        stops: flight.stops.slice(startIndex, endIndex + 1),
      });
    }

    return result;
  }, []);
}
