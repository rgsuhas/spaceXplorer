import { getRiskStatus } from '@/lib/riskMeter';

describe('getRiskStatus', () => {
  it('should return hazardous status for true', () => {
    const status = getRiskStatus(true);
    expect(status.message).toBe("Potentially Hazardous");
    expect(status.emoji).toBe("⚠️");
  });

  it('should return non-hazardous status for false', () => {
    const status = getRiskStatus(false);
    expect(status.message).toBe("Not Potentially Hazardous");
    expect(status.emoji).toBe("✅");
  });
});
