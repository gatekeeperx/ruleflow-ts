export function getIgnoreCase(obj: Record<string, unknown>, key: string): unknown {
  if (key in obj) return obj[key];
  const lowerKey = key.toLowerCase();
  for (const k of Object.keys(obj)) {
    if (k.toLowerCase() === lowerKey) return obj[k];
  }
  return undefined;
}

export function hasKeyIgnoreCase(obj: Record<string, unknown>, key: string): boolean {
  if (key in obj) return true;
  const lowerKey = key.toLowerCase();
  for (const k of Object.keys(obj)) {
    if (k.toLowerCase() === lowerKey) return true;
  }
  return false;
}
