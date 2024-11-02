import { Flight } from "@/data/flights";
import { filterStops } from "./filters/fromToFilter";
import { FiltersType } from "./FlightList";

export const filtering = (flights: Flight[], filters: FiltersType) => {
  let tempFilterredFlights: Flight[] = flights;

  if (filters.travelFrom && filters.travelTo)
    tempFilterredFlights = filterStops(
      tempFilterredFlights,
      filters.travelFrom,
      filters.travelTo
    );

  if (filters.airline?.length > 0) {
    tempFilterredFlights = tempFilterredFlights.filter(
      (flight) => flight.airline === filters.airline[0]
    );
  }

  if (filters.airline?.length === 1) {
    tempFilterredFlights = tempFilterredFlights.filter(
      (flight) => flight.airline === filters.airline[0]
    );
  }
  if (filters.class) {
    tempFilterredFlights = tempFilterredFlights.filter(
      (flight) => flight.class === filters.class
    );
  }
  if (filters.trip) {
    tempFilterredFlights = tempFilterredFlights.filter(
      (flight) => flight.trip === filters.trip
    );
  }
  if (filters.departureDate) {
    tempFilterredFlights = tempFilterredFlights.map((flight) => ({
      ...flight,
      stops: flight.stops.filter((stop) => {
        if (!filters.departureDate) return true;
        return (
          new Date(stop.arrivalTime).toDateString() ===
          new Date(filters.departureDate)?.toDateString()
        );
      }),
    }));
    tempFilterredFlights = tempFilterredFlights.filter(
      (flight) => flight.stops.length > 0
    );
  }
  if (filters.travellers) {
    tempFilterredFlights = tempFilterredFlights.filter((flight) => {
      console.log(
        flight.totalSeats -
          Math.max(...flight.stops.map((stop) => stop.seatsBooked)),
        parseInt(filters.travellers ?? "0")
      );
      return (
        flight.totalSeats -
          Math.max(...flight.stops.map((stop) => stop.seatsBooked)) >=
        parseInt(filters.travellers ?? "0")
      );
    });
  }

  if (filters.stops?.length > 0) {
    tempFilterredFlights = tempFilterredFlights.filter((flight) => {
      let flag = false;
      filters.stops.forEach((stop: string) => {
        if (stop === "Nonstop" && flight.stops.length === 2) flag = true;
        if (stop === "1_stop" && flight.stops.length === 3) flag = true;
        if (stop === "2+_stop" && flight.stops.length > 3) flag = true;
      });
      return flag;
    });
  }

  if (filters.travelBaggage?.length > 0) {
    tempFilterredFlights = tempFilterredFlights.filter((flight) => {
      let flag = false;
      filters.travelBaggage.forEach((baggage: string) => {
        if (baggage === "carry-on" && !flight.checkedBag) flag = true;
        if (baggage === "checked-bag" && flight.checkedBag) flag = true;
      });
      return flag;
    });
  }

  if (filters.departureTimeRange) {
    tempFilterredFlights = tempFilterredFlights.filter((flight) => {
      return (
        flight.stops[0].arrivalTime >= (filters.departureTimeRange?.min ?? 0) &&
        flight.stops[0].arrivalTime <=
          (filters.departureTimeRange?.max ?? Infinity)
      );
    });
  }

  if (filters.arrivalTimeRange) {
    tempFilterredFlights = tempFilterredFlights.filter((flight) => {
      return (
        flight.stops[flight.stops.length - 1].arrivalTime >=
          (filters.arrivalTimeRange?.min ?? 0) &&
        flight.stops[flight.stops.length - 1].arrivalTime <=
          (filters.arrivalTimeRange?.max ?? Infinity)
      );
    });
  }

  if (filters.preference === "RECOMMENDED") {
  } else if (filters.preference === "CHEAPEST") {
    tempFilterredFlights = tempFilterredFlights.sort((a, b) => {
      return a.pricePerStop * a.stops.length - b.pricePerStop * b.stops.length;
    });
  } else if (filters.preference === "FASTEST") {
    tempFilterredFlights = tempFilterredFlights.sort((a, b) => {
      return (
        new Date(a.stops[a.stops.length - 1].arrivalTime).getTime() -
        new Date(b.stops[b.stops.length - 1].arrivalTime).getTime()
      );
    });
  }

  return tempFilterredFlights;
};
