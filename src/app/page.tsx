import { fetchAsteroidOfTheDay, fetchCloseApproachAsteroids } from '@/lib/asteroid';
import AsteroidOfTheDay from '@/components/AsteroidOfTheDay';
import CloseApproachList from '@/components/CloseApproachList';
import FunFactSection from '@/components/FunFactSection';
import VisualComparison from '@/components/VisualComparison';
import RiskMeter from '@/components/RiskMeter';
import SocialShare from '@/components/SocialShare';
import AboutSection from '@/components/AboutSection';

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
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto space-y-12 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">Asteroid Explorer</h1>
          <p className="mt-3 text-xl text-gray-600">Discover the fascinating world of near-Earth objects.</p>
        </header>

        {error && (
          <section className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </section>
        )}

        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Asteroid of the Day</h2>
          {asteroidData ? (
            <div className="space-y-6">
              <AsteroidOfTheDay asteroid={asteroidData} />
              <VisualComparison diameterInKilometers={asteroidData.estimated_diameter.kilometers.estimated_diameter_max} />
              <RiskMeter isHazardous={asteroidData.is_potentially_hazardous_asteroid} />
            </div>
          ) : (
            !error && <p className="text-gray-600 text-lg">Loading Asteroid of the Day...</p>
          )}
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Close Approach Asteroids</h2>
          {closeApproachAsteroids ? (
            <CloseApproachList asteroids={closeApproachAsteroids} />
          ) : (
            !error && <p className="text-gray-600 text-lg">Loading Close Approach Asteroids...</p>
          )}
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Fun Fact</h2>
          <FunFactSection />
          <SocialShare shareText="Check out this awesome asteroid app!" />
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About</h2>
          <AboutSection />
        </section>
      </div>
    </main>
  );
}