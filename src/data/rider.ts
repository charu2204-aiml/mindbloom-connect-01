export type RiderAssignment = {
  id: string;
  riderName: string;
  initials: string;
  rating: number;
  tripsCompleted: number;
  vehicleType: string;
  vehicleModel: string;
  vehiclePlateMasked: string;
  licenseMasked: string;
  phoneMasked: string;
  verificationStatus: "Demo data — not independently verified";
  experienceYears: number;
};

export const sampleRider: RiderAssignment = {
  id: "rider-demo-01",
  riderName: "Rajesh Kumar",
  initials: "RK",
  rating: 4.9,
  tripsCompleted: 340,
  vehicleType: "AC Sedan (Sanitized & Quiet Cabin)",
  vehicleModel: "White Hyundai Verna",
  vehiclePlateMasked: "TN-09-****-2041",
  licenseMasked: "DL-04****2021",
  phoneMasked: "+91 98*** ***12",
  verificationStatus: "Demo data — not independently verified",
  experienceYears: 7,
};
