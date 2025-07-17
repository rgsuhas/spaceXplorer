import { fetchAsteroidOfTheDay, fetchCloseApproachAsteroids } from '@/lib/asteroid';
import AsteroidOfTheDay from '@/components/AsteroidOfTheDay';
import CloseApproachList from '@/components/CloseApproachList';

export default async function Home() {
  let asteroidData;
  let closeApproachAsteroids;
  let error = null;

  try {
    asteroidData = await fetchAsteroidOfTheDay();
    closeApproachAsteroids = await fetchCloseApproachAsteroids();
  } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    error = err.message;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">Asteroid App</h1>
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''_] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''_] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        {error && <p className="text-red-500">Error: {error}</p>}
        {asteroidData ? (
          <AsteroidOfTheDay asteroid={asteroidData} />
        ) : (
          !error && <p>Loading Asteroid of the Day...</p>
        )}

        <div className="mt-8">
          {closeApproachAsteroids ? (
            <CloseApproachList asteroids={closeApproachAsteroids} />
          ) : (
            !error && <p>Loading Close Approach Asteroids...</p>
          )}
        </div>

        <FunFactSection />
        <SocialShare shareText={"Check out this awesome asteroid app!"} />

        {asteroidData && (
          <VisualComparison diameterInKilometers={asteroidData.estimated_diameter.kilometers.estimated_diameter_max} />
          <RiskMeter isHazardous={asteroidData.is_potentially_hazardous_asteroid} />
        )}

        <AboutSection />
      </div>
    </main>
  );
}
