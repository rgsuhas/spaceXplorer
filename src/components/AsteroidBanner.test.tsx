import { render, screen } from '@testing-library/react';
import AsteroidBanner from '@/components/AsteroidBanner';
import { ImageProps } from 'next/image';

// Mock next/image
jest.mock('next/image', () => {
  const MockImage = ({ src, alt, ...props }: ImageProps) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src as string} alt={alt as string} {...props} />;
  };
  MockImage.displayName = 'MockImage';
  return MockImage;
});

describe('AsteroidBanner', () => {
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
    imageUrl: "http://example.com/banner-image.jpg",
  };

  it('should render the asteroid banner with image and details', () => {
    render(<AsteroidBanner asteroid={mockAsteroid} />);

    expect(screen.getByRole('img', { name: /Test Asteroid/i })).toHaveAttribute('src', 'http://example.com/banner-image.jpg');
    expect(screen.getByText("Test Asteroid")).toBeInTheDocument();
    expect(screen.getByText(/Estimated Diameter:/i)).toBeInTheDocument();
    expect(screen.getByText(/Hazardous:/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View on NASA JPL/i })).toHaveAttribute('href', 'http://example.com');
  });

  it('should display a message if no image is available', () => {
    const asteroidWithoutImage = { ...mockAsteroid, imageUrl: null };
    render(<AsteroidBanner asteroid={asteroidWithoutImage} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText("No image available for this asteroid.")).toBeInTheDocument();
  });
});
