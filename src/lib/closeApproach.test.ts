import { fetchCloseApproachAsteroids } from '@/lib/asteroid';

describe('fetchCloseApproachAsteroids', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch a list of close approach asteroids', async () => {
    const today = new Date().toISOString().split('T')[0];
    const sevenDaysLater = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const mockData = {
      near_earth_objects: {
        [today]: [
          {
            name: "Asteroid 1",
            close_approach_data: [
              {
                close_approach_date: today,
                miss_distance: { kilometers: "100000" },
              },
            ],
          },
        ],
        [sevenDaysLater]: [
          {
            name: "Asteroid 2",
            close_approach_data: [
              {
                close_approach_date: sevenDaysLater,
                miss_distance: { kilometers: "200000" },
              },
            ],
          },
        ],
      },
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const asteroids = await fetchCloseApproachAsteroids();

    expect(asteroids).toBeDefined();
    expect(asteroids.length).toBeGreaterThan(0);
    expect(asteroids[0]).toHaveProperty('name');
    expect(asteroids[0]).toHaveProperty('close_approach_date');
    expect(asteroids[0]).toHaveProperty('miss_distance_km');
  });

  it('should throw an error if API call fails', async () => {
    fetchMock.mockResponseOnce('', { status: 500, statusText: 'Internal Server Error' });

    await expect(fetchCloseApproachAsteroids()).rejects.toThrow("NASA API error: Internal Server Error");
  });

  it('should return an empty array if no asteroids are found', async () => {
    const mockData = {
      near_earth_objects: {},
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const asteroids = await fetchCloseApproachAsteroids();
    expect(asteroids).toEqual([]);
  });
});
