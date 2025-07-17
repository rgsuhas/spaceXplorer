import { render, screen } from '@testing-library/react';
import RiskMeter from '@/components/RiskMeter';

describe('RiskMeter', () => {
  it('should display hazardous status correctly', () => {
    render(<RiskMeter isHazardous={true} />);
    expect(screen.getByText("Potentially Hazardous")).toBeInTheDocument();
    expect(screen.getByText('⚠️')).toBeInTheDocument();
  });

  it('should display non-hazardous status correctly', () => {
    render(<RiskMeter isHazardous={false} />);
    expect(screen.getByText("Not Potentially Hazardous")).toBeInTheDocument();
    expect(screen.getByText('✅')).toBeInTheDocument();
  });
});