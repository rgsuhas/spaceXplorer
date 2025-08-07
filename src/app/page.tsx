import { fetchLatestLaunch, fetchNextLaunch, fetchRecentLaunches, fetchRockets, fetchCompanyInfo } from '@/lib/spacex';
import SpaceBackground from '@/components/SpaceBackground';
import TeslaRoadster from '@/components/TeslaRoadster';
import SpaceXHero from '@/components/SpaceXHero';
import SpaceXLaunchCard from '@/components/SpaceXLaunchCard';
import SpaceXVehiclesSection from '@/components/SpaceXVehiclesSection';
import UpcomingMissionsSection from '@/components/UpcomingMissionsSection';
import ContactIcon from '@/components/ContactIcon';
import type { SpaceXLaunch } from '@/lib/spacex-types';
import { Rocket, Target, TrendingUp } from 'lucide-react';

export default async function Home() {
  let latestLaunch;
  let nextLaunch;
  let recentLaunches;
  let companyInfo;
  let error = null;

  try {
    [latestLaunch, nextLaunch, recentLaunches, companyInfo] = await Promise.all([
      fetchLatestLaunch(),
      fetchNextLaunch(),
      fetchRecentLaunches(6),
      fetchCompanyInfo()
    ]);
  } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    error = err.message;
    console.error('SpaceX API error:', err);
  }

  // Note: Event handlers moved to client components for Next.js 15 compatibility

  return (
    <>
      {/* Animated Space Background */}
      <SpaceBackground />
      
      {/* Tesla Roadster Animation */}
      <TeslaRoadster />
      
      {/* Fixed Contact Icon */}
      <ContactIcon />
      
      <main className="relative z-10 min-h-screen">
        {/* SpaceX Hero Section */}
        <SpaceXHero latestLaunch={latestLaunch} nextLaunch={nextLaunch} />
        
        {/* Error Display */}
        {error && (
          <section className="relative z-20 max-w-4xl mx-auto px-6 py-4">
            <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-200 px-6 py-4 rounded-xl" role="alert">
              <strong className="font-bold">Mission Control Alert:</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          </section>
        )}

        {/* Mission Gallery */}
        {recentLaunches && recentLaunches.length > 0 && (
          <section className="relative z-20 py-20 px-6">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-block">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-1 bg-white"></div>
                    <div className="text-sm font-mono text-gray-400 uppercase tracking-[0.2em]">
                      RECENT MISSIONS
                    </div>
                    <div className="w-16 h-1 bg-white"></div>
                  </div>
                  
                  <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-none font-mono">
                    MISSION
                    <br />
                    ARCHIVE
                  </h2>
                  
                  <div className="w-24 h-1 bg-white mx-auto"></div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="bg-black/60 backdrop-blur-sm border-2 border-gray-800 p-8 text-center">
                  <Rocket className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-blue-400 mb-2 font-mono">{recentLaunches.length}</div>
                  <div className="text-gray-300 font-mono uppercase tracking-wider text-sm">RECENT LAUNCHES</div>
                </div>
                <div className="bg-black/60 backdrop-blur-sm border-2 border-gray-800 p-8 text-center">
                  <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-green-400 mb-2 font-mono">
                    {recentLaunches.filter(l => l.success).length}
                  </div>
                  <div className="text-gray-300 font-mono uppercase tracking-wider text-sm">SUCCESSFUL MISSIONS</div>
                </div>
                <div className="bg-black/60 backdrop-blur-sm border-2 border-gray-800 p-8 text-center">
                  <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-purple-400 mb-2 font-mono">
                    {Math.round((recentLaunches.filter(l => l.success).length / recentLaunches.length) * 100)}%
                  </div>
                  <div className="text-gray-300 font-mono uppercase tracking-wider text-sm">SUCCESS RATE</div>
                </div>
              </div>

              {/* Launches Grid - 3x2 Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {recentLaunches.map((launch, index) => (
                  <SpaceXLaunchCard
                    key={launch.id}
                    launch={launch}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Upcoming Missions Section */}
        <UpcomingMissionsSection />
        
        {/* SpaceX Vehicles Section */}
        <SpaceXVehiclesSection />

        {/* Company Stats Section */}
        {companyInfo && (
          <section className="relative z-20 py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-1 bg-white"></div>
                    <div className="text-sm font-mono text-gray-400 uppercase tracking-[0.2em]">
                      COMPANY OVERVIEW
                    </div>
                    <div className="w-16 h-1 bg-white"></div>
                  </div>
                  
                  <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-none font-mono">
                    {companyInfo.name.toUpperCase()}
                  </h2>
                  
                  <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
                  
                  <p className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed font-mono">
                    {companyInfo.summary.toUpperCase()}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center bg-black/60 backdrop-blur-sm border-2 border-gray-800 p-8">
                  <div className="text-4xl font-bold text-blue-400 mb-2 font-mono">{companyInfo.employees?.toLocaleString()}</div>
                  <div className="text-gray-300 font-mono uppercase tracking-wider text-sm">EMPLOYEES</div>
                </div>
                <div className="text-center bg-black/60 backdrop-blur-sm border-2 border-gray-800 p-8">
                  <div className="text-4xl font-bold text-green-400 mb-2 font-mono">{companyInfo.vehicles}</div>
                  <div className="text-gray-300 font-mono uppercase tracking-wider text-sm">VEHICLE PROGRAMS</div>
                </div>
                <div className="text-center bg-black/60 backdrop-blur-sm border-2 border-gray-800 p-8">
                  <div className="text-4xl font-bold text-purple-400 mb-2 font-mono">{companyInfo.test_sites}</div>
                  <div className="text-gray-300 font-mono uppercase tracking-wider text-sm">TEST SITES</div>
                </div>
                <div className="text-center bg-black/60 backdrop-blur-sm border-2 border-gray-800 p-8">
                  <div className="text-4xl font-bold text-orange-400 mb-2 font-mono">
                    ${(companyInfo.valuation / 1e9).toFixed(0)}B
                  </div>
                  <div className="text-gray-300 font-mono uppercase tracking-wider text-sm">VALUATION</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="relative z-20 py-12 px-6 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400 mb-4">
              Data provided by SpaceX API - Making Life Multiplanetary
            </p>
            <p className="text-gray-500 text-sm">
              🚀 The future of space exploration starts here
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
