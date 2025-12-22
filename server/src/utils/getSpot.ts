import { surflineClient } from "./surflineClient.js";

export interface SurflineSpot {
  spotId: string;
  spotName: string;
  href: string;
  region: string;
}

// In-memory cache (key: lowercase spot name)
const spotCache = new Map<string, SurflineSpot>();

/**
 * Fetches the closest matching Surfline spot by name.
 * - Uses Surfline's public search API (no scraping).
 * - Prioritizes exact name matches (case-insensitive).
 * - Caches results in memory for faster repeated lookups.
 */
export async function getSpot(spot: string): Promise<SurflineSpot | null> {
  const key = spot.toLowerCase();

  // Check cache first
  if (spotCache.has(key)) {
    return spotCache.get(key)!;
  }

  try {
    const { data } = await surflineClient.get(
      `/search/site?q=${spot}&type=spot`
    );

    // Get spots from first array element
    const spotsData = data?.[0];
    const hits = spotsData?.hits?.hits ?? [];

    if (hits.length === 0) {
      console.log(`No spots found for "${spot}"`);
      return null;
    }

    const searchTerm = spot.toLowerCase();

    // 1. Try exact match first
    const exactMatch = hits.find(
      (hit: any) => hit._source?.name?.toLowerCase() === searchTerm
    );

    if (exactMatch) {
      console.log(`Found exact match for "${spot}":`, exactMatch._source?.name);
      const src = exactMatch._source;
      const result = {
        spotId: exactMatch._id,
        spotName: src.name,
        href: src.href,
        region: src.breadCrumbs?.join(" › ") ?? "",
      };
      spotCache.set(key, result);
      return result;
    }

    // 2. Try partial match (spot name contains search term)
    const partialMatches = hits.filter((hit: any) =>
      hit._source?.name?.toLowerCase().includes(searchTerm)
    );

    if (partialMatches.length > 0) {
      // Use the highest scored partial match
      const bestMatch = partialMatches[0];
      console.log(
        `Found partial match for "${spot}":`,
        bestMatch._source?.name
      );
      const src = bestMatch._source;
      const result = {
        spotId: bestMatch._id,
        spotName: src.name,
        href: src.href,
        region: src.breadCrumbs?.join(" › ") ?? "",
      };
      spotCache.set(key, result);
      return result;
    }

    // 3. Fall back to first result if nothing matches
    console.log(
      `No direct match for "${spot}", using first result:`,
      hits[0]._source?.name
    );
    const src = hits[0]._source;
    const result = {
      spotId: hits[0]._id,
      spotName: src.name,
      href: src.href,
      region: src.breadCrumbs?.join(" › ") ?? "",
    };
    spotCache.set(key, result);
    return result;
  } catch (err) {
    console.error("Error fetching spot:", err);
    return null;
  }
}
