import { convertDiameterToSchoolBuses } from '@/lib/visualComparison';

describe('convertDiameterToSchoolBuses', () => {
  it('should correctly convert kilometers to school buses', () => {
    // 12 meters = 0.012 km
    expect(convertDiameterToSchoolBuses(0.012)).toBe(1);
    expect(convertDiameterToSchoolBuses(0.024)).toBe(2);
    expect(convertDiameterToSchoolBuses(0.006)).toBe(1); // Rounds up
    expect(convertDiameterToSchoolBuses(0.12)).toBe(10);
    expect(convertDiameterToSchoolBuses(1.2)).toBe(100);
    expect(convertDiameterToSchoolBuses(0)).toBe(0);
  });

  it('should handle large numbers correctly', () => {
    expect(convertDiameterToSchoolBuses(120)).toBe(10000);
  });
});
