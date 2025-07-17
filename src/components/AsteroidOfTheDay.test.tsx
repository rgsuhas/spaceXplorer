import { render, screen } from '@testing-library/react';
import AsteroidOfTheDay from '@/components/AsteroidOfTheDay';

describe('AsteroidOfTheDay', () => {
  it('should render asteroid details correctly', () => {
    const mockAsteroid = {
      name: "Test Asteroid",
      nasa_jpl_url: "http://example.com",
      is_potentially_hazardous_asteroid: false,
      estimated_diameter: {
        kilometers: {
          estimated_diameter_min: 0.1,
          estimated_diameter_max: 0.2,
        },
      },
    };

    render(<AsteroidOfTheDay asteroid={mockAsteroid} />);

    expect(screen.getByText("Test Asteroid")).toBeInTheDocument();
    expect(screen.getByText(/Not Potentially Hazardous/i)).toBeInTheDocument();
    expect(screen.getByText(/Estimated Diameter:/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /NASA JPL Link/i })).toHaveAttribute('href', 'http://example.com');
  });
});
