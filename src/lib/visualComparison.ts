export function convertDiameterToSchoolBuses(diameterInKilometers: number): number {
  const SCHOOL_BUS_LENGTH_KM = 0.012; // Approximately 12 meters
  return Math.round(diameterInKilometers / SCHOOL_BUS_LENGTH_KM);
}
