import { render, screen } from '@testing-library/react';
import CloseApproachList from '@/components/CloseApproachList';
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

describe('CloseApproachList', () => {
  it('should render a list of asteroids with images', () => {
    const mockAsteroids = [
      {
        name: "Asteroid 1",
        close_approach_date: "2025-07-18",
        miss_distance_km: "100000",
        imageUrl: "http://example.com/asteroid1.jpg",
      },
      {
        name: "Asteroid 2",
        close_approach_date: "2025-07-19",
        miss_distance_km: "200000",
        imageUrl: "http://example.com/asteroid2.jpg",
      },
    ];

    render(<CloseApproachList asteroids={mockAsteroids} />);

    expect(screen.getByText("Asteroid 1")).toBeInTheDocument();
    expect(screen.getByText("Asteroid 2")).toBeInTheDocument();

    // Check for the formatted date and distance within the list item
    const listItem1 = screen.getByText("Asteroid 1").closest('li');
    expect(listItem1).toHaveTextContent("Approaching on 2025-07-18 at a distance of 100000.00 km");
    expect(screen.getByRole('img', { name: /Asteroid 1/i })).toHaveAttribute('src', 'http://example.com/asteroid1.jpg');

    const listItem2 = screen.getByText("Asteroid 2").closest('li');
    expect(listItem2).toHaveTextContent("Approaching on 2025-07-19 at a distance of 200000.00 km");
    expect(screen.getByRole('img', { name: /Asteroid 2/i })).toHaveAttribute('src', 'http://example.com/asteroid2.jpg');
  });

  it('should display a message when no asteroids are found', () => {
    render(<CloseApproachList asteroids={[]} />);

    expect(screen.getByText("No close approach asteroids found for the next 7 days.")).toBeInTheDocument();
  });

  it('should not render image if imageUrl is not provided', () => {
    const mockAsteroids = [
      {
        name: "Asteroid 3",
        close_approach_date: "2025-07-20",
        miss_distance_km: "300000",
        imageUrl: null,
      },
    ];

    render(<CloseApproachList asteroids={mockAsteroids} />);

    expect(screen.getByText("Asteroid 3")).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /Asteroid 3/i })).not.toBeInTheDocument();
  });
});