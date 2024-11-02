export type Flight = {
  id: number;
  airline: string;
  airlineLogo: string;
  class: string;
  trip: string;
  totalSeats: number;
  refundable: string;
  selfTransfer: boolean;
  weight: string;
  pricePerStop: number;
  checkedBag?: boolean;
  stops: Stop[];
};

export type Stop = {
  stopName: string;
  arrivalTime: string;
  seatsBooked: number;
  facility?: string[];
};

export const flights = [
  {
    id: 1,
    airline: "ABC Airline",
    airlineLogo: "/logo.png",
    class: "Economy",
    trip: "One way",
    totalSeats: 100,
    refundable: "PARTIAL",
    selfTransfer: false,
    weight: "5kg",
    pricePerStop: 100,
    checkedBag: true,
    stops: [
      {
        stopName: "Moi Intl, Mombasa Kenya",
        arrivalTime: "2024-12-12T12:00:00",
        seatsBooked: 50,
        facility: ["wifi", "luggage", "entertainment", "info"],
      },
      {
        stopName: "Kotoka Intl, Accra Ghana",
        arrivalTime: "2024-12-12T18:00:00",
        seatsBooked: 30,
        facility: ["wifi", "luggage", "entertainment", "info"],
      },
      {
        stopName: "Murtala Muhammed Intl, Lagos Nigeria",
        arrivalTime: "2024-12-12T20:00:00",
        seatsBooked: 60,
        facility: ["wifi", "luggage", "entertainment", "info"],
      },
      {
        stopName: "OR Tambo Intl, Johannesburg South Africa",
        arrivalTime: "2024-12-12T23:00:00",
        seatsBooked: 20,
        facility: ["wifi", "luggage", "entertainment", "info"],
      },
      {
        stopName: "Jomo Kenyatta Intl, Nairobi Kenya",
        arrivalTime: "2024-12-13T02:00:00",
        seatsBooked: 40,
        facility: ["wifi", "luggage", "entertainment", "info"],
      },
    ],
  },
  {
    id: 2,
    airline: "ABC Airline",
    airlineLogo: "/logo.png",
    class: "Economy",
    trip: "Return",
    totalSeats: 100,
    refundable: "FULL",
    selfTransfer: true,
    weight: "5kg",
    pricePerStop: 100,
    stops: [
      {
        stopName: "Moi Intl, Mombasa Kenya",
        arrivalTime: "2024-12-12T11:00:00",
        seatsBooked: 50,
        facility: ["wifi", "info"],
      },
      {
        stopName: "Kotoka Intl, Accra Ghana",
        arrivalTime: "2024-12-12T18:00:00",
        seatsBooked: 30,
        facility: ["wifi", "info"],
      },
      {
        stopName: "Murtala Muhammed Intl, Lagos Nigeria",
        arrivalTime: "2024-12-12T20:00:00",
        seatsBooked: 60,
        facility: ["wifi", "info"],
      },
      {
        stopName: "OR Tambo Intl, Johannesburg South Africa",
        arrivalTime: "2024-12-12T23:00:00",
        seatsBooked: 20,
        facility: ["wifi", "info"],
      },
      {
        stopName: "Jomo Kenyatta Intl, Nairobi Kenya",
        arrivalTime: "2024-12-13T05:00:00",
        seatsBooked: 40,
        facility: ["wifi", "info"],
      },
    ],
  },
  {
    id: 3,
    airline: "ABC Airline",
    airlineLogo: "/logo.png",
    class: "First Class",
    trip: "One way",
    totalSeats: 80,
    refundable: "NO",
    selfTransfer: false,
    weight: "5kg",
    pricePerStop: 150,
    stops: [
      {
        stopName: "Moi Intl, Mombasa Kenya",
        arrivalTime: "2024-12-12T13:00:00",
        seatsBooked: 50,
        facility: ["wifi", "luggage", "entertainment"],
      },
      {
        stopName: "OR Tambo Intl, Johannesburg South Africa",
        arrivalTime: "2024-12-12T23:00:00",
        seatsBooked: 20,
        facility: ["wifi", "luggage", "entertainment"],
      },
      {
        stopName: "Jomo Kenyatta Intl, Nairobi Kenya",
        arrivalTime: "2024-12-13T01:00:00",
        seatsBooked: 40,
        facility: ["wifi", "luggage", "entertainment"],
      },
    ],
  },
  {
    id: 4,
    airline: "ABC Airline",
    airlineLogo: "/logo.png",
    class: "Economy",
    trip: "One way",
    totalSeats: 100,
    refundable: "PARTIAL",
    selfTransfer: false,
    weight: "5kg",
    pricePerStop: 100,
    checkedBag: true,
    stops: [
      {
        stopName: "Moi Intl, Mombasa Kenya",
        arrivalTime: "2024-12-12T14:00:00",
        seatsBooked: 50,
        facility: ["luggage", "entertainment"],
      },
      {
        stopName: "Jomo Kenyatta Intl, Nairobi Kenya",
        arrivalTime: "2024-12-13T06:00:00",
        seatsBooked: 40,
        facility: ["luggage", "entertainment"],
      },
    ],
  },
];
