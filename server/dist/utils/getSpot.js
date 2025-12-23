// File: src/utils/getSpot.ts
import axios from "axios";
// In-memory cache (key: lowercase spot name)
const spotCache = new Map();
// Get your Vercel proxy URL from environment
const PROXY_URL = process.env.PROXY_URL;
/**
 * Fetches the closest matching Surfline spot by name via Vercel proxy.
 */
export async function getSpot(spot) {
    const key = spot.toLowerCase();
    if (spotCache.has(key)) {
        const cached = spotCache.get(key);
        console.log(`Using cached result for "${spot}":`, cached.spotName);
        return cached;
    }
    try {
        // CALL THE VERCEL PROXY INSTEAD OF SURFLINE DIRECTLY
        const { data } = await axios.get(`${PROXY_URL}/api/spot-search`, {
            params: {
                endpoint: "search/site",
                q: spot,
                type: "spot"
            }
        });
        // The data structure is the same! The proxy returns Surfline's response.
        const spotsData = data?.[0];
        const hits = spotsData?.hits?.hits ?? [];
        if (hits.length === 0) {
            console.log(`❌ No spots found for "${spot}"`);
            return null;
        }
        const firstHit = hits[0];
        const src = firstHit._source;
        const result = {
            spotId: firstHit._id,
            spotName: src.name,
            href: src.href,
            region: src.breadCrumbs?.join(" › ") ?? "",
        };
        console.log(`✅ Found spot via proxy for "${spot}":`, result.spotName);
        spotCache.set(key, result);
        return result;
    }
    catch (err) {
        console.error("❌ Error fetching spot via proxy:", err);
        return null;
    }
}
