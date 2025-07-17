import { render, screen } from '@testing-library/react';
import CloseApproachList from '@/components/CloseApproachList';

describe('CloseApproachList', () => {
  it('should render a list of asteroids', () => {
    const mockAsteroids = [
      {
        name: "Asteroid 1",
        close_approach_date: "2025-07-18",
        miss_distance_km: "100000",
      },
      {
        name: "Asteroid 2",
        close_approach_date: "2025-07-19",
        miss_distance_km: "200000",
      },
    ];

    render(<CloseApproachList asteroids={mockAsteroids} />);

    expect(screen.getByText("Close Approach Asteroids (Next 7 Days)")).toBeInTheDocument();
    expect(screen.getByText(/Asteroid 1/)).toBeInTheDocument();
    expect(screen.getByText(/Asteroid 2/)).toBeInTheDocument();
    expect(screen.getByText(/Approaching on 2025-07-18 at a distance of 100000.00 km/)).toBeInTheDocument();
  });

  it('should display a message when no asteroids are found', () => {
    render(<CloseApproachList asteroids={[]} />);

    expect(screen.getByText("No close approach asteroids found for the next 7 days.")).toBeInTheDocument();
  });
});
