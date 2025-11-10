import axios from "axios";
import { getSpot } from "../utils/getSpot.js";
import type { SurflineSpot } from "../utils/getSpot.js";

export interface Swell {
  swell: string;
  height: string;
  period: string;
  power: string;
  direction: string;
}

export interface SurfReport {
  spotName: string;
  region: string;
  sessionStart: string;
  size: string;
  description: string;
  waveEnergy: string;
  rating: {
    value: number; // 1-5
    description: string; // "VERY POOR", "FAIR", "GOOD", etc.
  };
  swells: Swell[];
  wind?: {
    speed: string;
    direction: string;
    gust?: string;
  };
  tide?: {
    height: string;
    type: string;
  };
}

/**
 * Convert Surfline's 1-5 rating to text description
 */
function getRatingDescription(rating: number): string {
  switch (rating) {
    case 1:
      return "VERY POOR";
    case 2:
      return "POOR";
    case 3:
      return "FAIR";
    case 4:
      return "FAIR TO GOOD";
    case 5:
      return "GOOD";
    default:
      return "UNKNOWN";
  }
}

/**
 * Fetch combined Surfline forecast for a given spot and session time.
 * Now includes conditions/rating endpoint for more accurate ratings.
 */
export async function getSurfReport(
  sessionStart: string,
  name: string
): Promise<SurfReport | null> {
  try {
    // Step 1: Find the surf spot
    const surfInfo: SurflineSpot | null = await getSpot(name);
    if (!surfInfo) {
      console.warn(`No surf spot found for "${name}"`);
      return null;
    }

    const spotId = surfInfo.spotId;

    // Step 2: Build URLs for all APIs - ADD CONDITIONS/RATING ENDPOINT
    const base = "https://services.surfline.com/kbyg/spots/forecasts";
    const params = `spotId=${spotId}&days=1&intervalHours=1`;
    
    const waveUrl = `${base}/wave?${params}`;
    const windUrl = `${base}/wind?${params}`;
    const tideUrl = `${base}/tides?${params}`;
    const conditionsUrl = `${base}/conditions?${params}`; // NEW: Conditions endpoint

    // Step 3: Fetch all data in parallel - ADD CONDITIONS
    const [waveRes, windRes, tideRes, conditionsRes] = await Promise.all([
      axios.get(waveUrl),
      axios.get(windUrl),
      axios.get(tideUrl),
      axios.get(conditionsUrl), // NEW: Fetch conditions
    ]);

    const waveData = waveRes.data?.data?.wave ?? [];
    const windData = windRes.data?.data?.wind ?? [];
    const tideData = tideRes.data?.data?.tides ?? [];
    const conditionsData = conditionsRes.data?.data?.conditions ?? []; // NEW: Conditions data

    if (waveData.length === 0) return null;

    // Helper to format timestamps
    const toSessionString = (ts: number) =>
      new Date(ts * 1000).toISOString().slice(0, 16).replace("T", " ");

    // Step 4: Match entries by session time - ADD CONDITIONS MATCH
    const waveMatch = waveData.find(
      (w: any) => toSessionString(w.timestamp) === sessionStart
    );
    const windMatch = windData.find(
      (w: any) => toSessionString(w.timestamp) === sessionStart
    );
    const tideMatch = tideData.find(
      (t: any) => toSessionString(t.timestamp) === sessionStart
    );
    const conditionsMatch = conditionsData.find(
      (c: any) => toSessionString(c.timestamp) === sessionStart
    ); // NEW: Conditions match

    if (!waveMatch) return null;

    const surf = waveMatch.surf;
    const swells =
      waveMatch.swells?.slice(0, 3).map((swell: any, i: number) => ({
        swell: `Swell ${i + 1}`,
        height: `Height: ${swell.height ?? "N/A"}`,
        period: `Period: ${swell.period ?? "N/A"} seconds`,
        power: `Power: ${Math.round(swell.power ?? 0)}kJ`,
        direction: `Direction: ${swell.direction ?? "N/A"}`,
      })) ?? [];

    // PREFER CONDITIONS RATING OVER WAVE RATING - MORE ACCURATE
    const conditionsRating = conditionsMatch?.rating?.value;
    const waveRating = waveMatch.rating?.value;
    
    // Use conditions rating if available, fall back to wave rating
    const finalRating = conditionsRating ?? waveRating ?? 1;
    
    // Get additional rating info from conditions if available
    const ratingKey = conditionsMatch?.rating?.key; // e.g., "flat", "poor", "good"
    const fullDescription = conditionsMatch?.rating?.observation; // Full description

    const report: SurfReport = {
      spotName: surfInfo.spotName,
      region: surfInfo.region,
      sessionStart,
      size: `Surf: ${surf.min} - ${surf.max}`,
      description: surf.humanRelation,
      waveEnergy: `${Math.round(waveMatch.power)}kJ`,
      rating: {
        value: finalRating,
        description: getRatingDescription(finalRating),
      },
      swells,
      wind: windMatch
        ? {
            speed: `${Math.round(windMatch.speed)} km/h`,
            direction: `${windMatch.directionType ?? "N/A"}`,
            gust: `${Math.round(windMatch.gust ?? 0)} km/h`,
          }
        : undefined,
      tide: tideMatch
        ? {
            height: `${tideMatch.height.toFixed(2)} ft`,
            type: `${tideMatch.type ?? "N/A"}`,
          }
        : undefined,
    };

    // Log which rating source was used for debugging
    console.log(`Rating source for ${surfInfo.spotName}:`, {
      conditionsRating,
      waveRating,
      finalRating,
      ratingKey,
      usedSource: conditionsRating ? 'conditions' : 'wave'
    });

    return report;
  } catch (error) {
    console.error("Error fetching surf report:", error);
    return null;
  }
}