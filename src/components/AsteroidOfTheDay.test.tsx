import { render, screen } from '@testing-library/react';
import AsteroidOfTheDay from '@/components/AsteroidOfTheDay';

// Mock next/image
jest.mock('next/image', () => {
  const MockImage = ({ src, alt, ...props }: { src: string; alt: string; [key: string]: any; }) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  };
  MockImage.displayName = 'MockImage'; // Add display name
  return MockImage;
});

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
      imageUrl: "http://example.com/image.jpg",
    };

    render(<AsteroidOfTheDay asteroid={mockAsteroid} />);

    expect(screen.getByText("Test Asteroid")).toBeInTheDocument();
    expect(screen.getByText(/Not Potentially Hazardous/i)).toBeInTheDocument();
    expect(screen.getByText(/Estimated Diameter:/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /NASA JPL Link/i })).toHaveAttribute('href', 'http://example.com');
    expect(screen.getByRole('img', { name: /Test Asteroid/i })).toHaveAttribute('src', 'http://example.com/image.jpg');
  });

  it('should not render image if imageUrl is not provided', () => {
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

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
