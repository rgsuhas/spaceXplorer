import { render, screen } from '@testing-library/react';
import VisualComparison from '@/components/VisualComparison';

describe('VisualComparison', () => {
  it('should display the correct number of school buses', () => {
    render(<VisualComparison diameterInKilometers={0.012} />); // 1 bus
    const busCountElement = screen.getByText('1');
    expect(busCountElement.tagName).toBe('STRONG');
    expect(busCountElement.parentElement).toHaveTextContent(/1 school buses!/i);
    expect(screen.getByText('🚌')).toBeInTheDocument();
  });

  it('should display multiple school buses', () => {
    render(<VisualComparison diameterInKilometers={0.024} />); // 2 buses
    const busCountElement = screen.getByText('2');
    expect(busCountElement.tagName).toBe('STRONG');
    expect(busCountElement.parentElement).toHaveTextContent(/2 school buses!/i);
    expect(screen.getAllByText('🚌').length).toBe(2);
  });

  it('should display a message for more than 10 buses', () => {
    render(<VisualComparison diameterInKilometers={0.12 * 15} />); // 15 buses
    const busCountElement = screen.getByText('150');
    expect(busCountElement.tagName).toBe('STRONG');
    expect(busCountElement.parentElement).toHaveTextContent(/150 school buses!/i);
    expect(screen.getAllByText('🚌').length).toBe(10);
    expect(screen.getByText(/...and 140 more!/i)).toBeInTheDocument();
  });

  it('should handle zero diameter', () => {
    render(<VisualComparison diameterInKilometers={0} />);
    const busCountElement = screen.getByText('0');
    expect(busCountElement.tagName).toBe('STRONG');
    expect(busCountElement.parentElement).toHaveTextContent(/0 school buses!/i);
    expect(screen.queryAllByText('🚌').length).toBe(0);
  });
});
