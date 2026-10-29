export type TripStatus =
  "Awaiting assignment" | "Rider assigned" | "On the way" | "Arrived" | "Trip completed";

export type TrackingData = {
  tripId: string;
  status: TripStatus;
  pickupLocation: string;
  clinicDestination: string;
  consultantName: string;
  riderName?: string;
  vehicleModel?: string;
  progressPercent: number;
  distanceFormatted: string;
  etaFormatted: string;
};

export const TRIP_STATUSES: TripStatus[] = [
  "Awaiting assignment",
  "Rider assigned",
  "On the way",
  "Arrived",
  "Trip completed",
];

export function getStatusProgress(status: TripStatus): number {
  switch (status) {
    case "Awaiting assignment":
      return 10;
    case "Rider assigned":
      return 25;
    case "On the way":
      return 60;
    case "Arrived":
      return 90;
    case "Trip completed":
      return 100;
  }
}
