import "server-only";

// SpaceX API Types
export interface SpaceXLaunch {
  id: string;
  name: string;
  date_utc: string;
  date_local: string;
  success: boolean | null;
  upcoming: boolean;
  details: string | null;
  flight_number: number;
  rocket: string;
  payloads: string[];
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    reddit: {
      campaign: string | null;
      launch: string | null;
      media: string | null;
      recovery: string | null;
    };
    flickr: {
      small: string[];
      original: string[];
    };
    presskit: string | null;
    webcast: string | null;
    youtube_id: string | null;
    article: string | null;
    wikipedia: string | null;
  };
}

export interface SpaceXRocket {
  id: string;
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  wikipedia: string;
  description: string;
  flickr_images: string[];
  height: {
    meters: number;
    feet: number;
  };
  diameter: {
    meters: number;
    feet: number;
  };
  mass: {
    kg: number;
    lb: number;
  };
}

export interface SpaceXCapsule {
  id: string;
  serial: string;
  status: string;
  type: string;
  dragon: string;
  reuse_count: number;
  water_landings: number;
  land_landings: number;
  last_update: string | null;
  launches: string[];
}

const SPACEX_API_BASE = 'https://api.spacexdata.com/v4';

// Fetch recent launches
export async function fetchRecentLaunches(limit: number = 10): Promise<SpaceXLaunch[]> {
  try {
    const response = await fetch(`${SPACEX_API_BASE}/launches/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: {},
        options: {
          sort: { date_utc: 'desc' },
          limit: limit,
          populate: ['rocket', 'payloads']
        }
      })
    });

    if (!response.ok) {
      throw new Error(`SpaceX API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error('Failed to fetch SpaceX launches:', error);
    throw error;
  }
}

// Fetch upcoming launches
export async function fetchUpcomingLaunches(limit: number = 5): Promise<SpaceXLaunch[]> {
  try {
    const response = await fetch(`${SPACEX_API_BASE}/launches/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: { upcoming: true },
        options: {
          sort: { date_utc: 'asc' },
          limit: limit,
          populate: ['rocket', 'payloads']
        }
      })
    });

    if (!response.ok) {
      throw new Error(`SpaceX API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error('Failed to fetch upcoming SpaceX launches:', error);
    return [];
  }
}

// Fetch latest launch
export async function fetchLatestLaunch(): Promise<SpaceXLaunch | null> {
  try {
    const response = await fetch(`${SPACEX_API_BASE}/launches/latest`);
    
    if (!response.ok) {
      throw new Error(`SpaceX API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch latest SpaceX launch:', error);
    throw error;
  }
}

// Fetch next launch
export async function fetchNextLaunch(): Promise<SpaceXLaunch | null> {
  try {
    const response = await fetch(`${SPACEX_API_BASE}/launches/next`);
    
    if (!response.ok) {
      throw new Error(`SpaceX API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch next SpaceX launch:', error);
    return null;
  }
}

// Fetch all rockets
export async function fetchRockets(): Promise<SpaceXRocket[]> {
  try {
    const response = await fetch(`${SPACEX_API_BASE}/rockets`);
    
    if (!response.ok) {
      throw new Error(`SpaceX API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch SpaceX rockets:', error);
    return [];
  }
}

// Fetch company info
export async function fetchCompanyInfo() {
  try {
    const response = await fetch(`${SPACEX_API_BASE}/company`);
    
    if (!response.ok) {
      throw new Error(`SpaceX API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch SpaceX company info:', error);
    return null;
  }
}

// Helper function to get mission status
export function getMissionStatus(launch: SpaceXLaunch): 'success' | 'failure' | 'upcoming' | 'unknown' {
  if (launch.upcoming) return 'upcoming';
  if (launch.success === true) return 'success';
  if (launch.success === false) return 'failure';
  return 'unknown';
}

// Helper function to format date
export function formatLaunchDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
}

// Helper function to get countdown
export function getCountdown(dateString: string): string {
  const now = new Date();
  const target = new Date(dateString);
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) return 'Launched';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `T-${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `T-${hours}h ${minutes}m`;
  return `T-${minutes}m`;
}
