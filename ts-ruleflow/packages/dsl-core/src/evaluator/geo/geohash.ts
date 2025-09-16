// Minimal geohash encode/decode utilities (WGS84)
// Base32 map for geohash
const BASE32 = '0123456789bcdefghjkmnpqrstuvwxyz';
const BASE32_MAP: Record<string, number> = Object.fromEntries(
  Array.from(BASE32).map((c, i) => [c, i])
);

export function geohashEncode(lat: number, lon: number, precision = 12): string {
  let idx = 0;
  let bit = 0;
  let even = true;
  let hash = '';
  let latMin = -90, latMax = 90;
  let lonMin = -180, lonMax = 180;

  while (hash.length < precision) {
    if (even) {
      const mid = (lonMin + lonMax) / 2;
      if (lon >= mid) {
        idx = (idx << 1) + 1;
        lonMin = mid;
      } else {
        idx = (idx << 1) + 0;
        lonMax = mid;
      }
    } else {
      const mid = (latMin + latMax) / 2;
      if (lat >= mid) {
        idx = (idx << 1) + 1;
        latMin = mid;
      } else {
        idx = (idx << 1) + 0;
        latMax = mid;
      }
    }

    even = !even;
    if (++bit === 5) {
      hash += BASE32[idx];
      bit = 0;
      idx = 0;
    }
  }

  return hash;
}

export function geohashDecode(hash: string): [number, number] {
  let even = true;
  let latMin = -90, latMax = 90;
  let lonMin = -180, lonMax = 180;

  for (const c of hash.toLowerCase()) {
    const val = BASE32_MAP[c];
    if (val == null) throw new Error(`Invalid geohash character: ${c}`);
    for (let n = 4; n >= 0; n--) {
      const bit = (val >> n) & 1;
      if (even) {
        const mid = (lonMin + lonMax) / 2;
        if (bit === 1) lonMin = mid;
        else lonMax = mid;
      } else {
        const mid = (latMin + latMax) / 2;
        if (bit === 1) latMin = mid;
        else latMax = mid;
      }
      even = !even;
    }
  }

  const lat = (latMin + latMax) / 2;
  const lon = (lonMin + lonMax) / 2;
  return [lat, lon];
}

// Haversine distance in kilometers between two coordinates
export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}