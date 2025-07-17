import "server-only";

export async function fetchAsteroidOfTheDay() {
  const NASA_API_KEY = process.env.NASA_API_KEY;
  if (!NASA_API_KEY) {
    throw new Error("NASA_API_KEY is not defined in environment variables.");
  }

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`NASA API error: ${response.statusText}`);
    }
    const data = await response.json();

    const asteroidsToday = data.near_earth_objects[today];

    if (!asteroidsToday || asteroidsToday.length === 0) {
      throw new Error("No asteroids found for today.");
    }

    // Pick a random asteroid from today's list
    const randomIndex = Math.floor(Math.random() * asteroidsToday.length);
    const randomAsteroid = asteroidsToday[randomIndex];

    return {
      name: randomAsteroid.name,
      nasa_jpl_url: randomAsteroid.nasa_jpl_url,
      is_potentially_hazardous_asteroid: randomAsteroid.is_potentially_hazardous_asteroid,
      estimated_diameter: randomAsteroid.estimated_diameter,
    };
  } catch (error) {
    console.error("Failed to fetch asteroid of the day:", error);
    throw error;
  }
}

export async function fetchCloseApproachAsteroids() {
  const NASA_API_KEY = process.env.NASA_API_KEY;
  if (!NASA_API_KEY) {
    throw new Error("NASA_API_KEY is not defined in environment variables.");
  }

  const today = new Date();
  const startDate = today.toISOString().split('T')[0];
  const endDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`NASA API error: ${response.statusText}`);
    }
    const data = await response.json();

    const allAsteroids: { name: string; close_approach_date: string; miss_distance_km: string; }[] = [];
    for (const date in data.near_earth_objects) {
      data.near_earth_objects[date].forEach((asteroid: { name: string; close_approach_data: { close_approach_date: string; miss_distance: { kilometers: string; }; }[]; }) => {
        if (asteroid.close_approach_data && asteroid.close_approach_data.length > 0) {
          allAsteroids.push({
            name: asteroid.name,
            close_approach_date: asteroid.close_approach_data[0].close_approach_date,
            miss_distance_km: asteroid.close_approach_data[0].miss_distance.kilometers,
          });
        }
      });
    }

    return allAsteroids;
  } catch (error) {
    console.error("Failed to fetch close approach asteroids:", error);
    throw error;
  }
}
