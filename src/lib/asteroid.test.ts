import { fetchAsteroidOfTheDay } from '@/lib/asteroid';

describe('fetchAsteroidOfTheDay', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch asteroid of the day data', async () => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const mockData = {
      near_earth_objects: {
        [today]: [
          {
            name: "Test Asteroid",
            nasa_jpl_url: "http://example.com",
            is_potentially_hazardous_asteroid: false,
            estimated_diameter: {
              kilometers: {
                estimated_diameter_min: 0.1,
                estimated_diameter_max: 0.2,
              },
            },
          },
        ],
      },
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const asteroidData = await fetchAsteroidOfTheDay();

    expect(asteroidData).toBeDefined();
    expect(asteroidData).toHaveProperty('name', 'Test Asteroid');
    expect(asteroidData).toHaveProperty('nasa_jpl_url', 'http://example.com');
    expect(asteroidData).toHaveProperty('is_potentially_hazardous_asteroid', false);
    expect(asteroidData).toHaveProperty('estimated_diameter');
    expect(asteroidData.estimated_diameter).toHaveProperty('kilometers');
  });

  it('should throw an error if NASA_API_KEY is not defined', async () => {
    const originalApiKey = process.env.NASA_API_KEY;
    delete process.env.NASA_API_KEY;

    await expect(fetchAsteroidOfTheDay()).rejects.toThrow("NASA_API_KEY is not defined in environment variables.");

    process.env.NASA_API_KEY = originalApiKey; // Restore the API key
  });

  it('should throw an error if API call fails', async () => {
    fetchMock.mockResponseOnce('', { status: 500, statusText: 'Internal Server Error' });

    await expect(fetchAsteroidOfTheDay()).rejects.toThrow("NASA API error: Internal Server Error");
  });

  it('should throw an error if no asteroids are found for today', async () => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const mockData = {
      near_earth_objects: {
        [today]: [],
      },
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    await expect(fetchAsteroidOfTheDay()).rejects.toThrow("No asteroids found for today.");
  });
});
