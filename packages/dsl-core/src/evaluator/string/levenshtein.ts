export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a) return b.length;
  if (!b) return a.length;
  const m = a.length;
  const n = b.length;
  const dp = new Array(n + 1);
  for (let j = 0; j <= n; j++) dp[j] = j;
  for (let i = 1; i <= m; i++) {
    let prev = i - 1;
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const temp = dp[j];
      const cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
      dp[j] = Math.min(
        dp[j] + 1,        // deletion
        dp[j - 1] + 1,    // insertion
        prev + cost       // substitution
      );
      prev = temp;
    }
  }
  return dp[n];
}

export function similarityPercent(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length) || 1;
  const dist = levenshtein(a, b);
  const score = 1 - dist / maxLen;
  return Math.round(score * 100);
}

export function similarityScore(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length) || 1;
  const dist = levenshtein(a, b);
  const score = 1 - dist / maxLen;
  return Math.round(score * 1000) / 1000; // 3 decimales
}

export function tokenSort(s: string): string {
  return s
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => t.toLowerCase())
    .sort()
    .join(' ');
}

export function tokenSet(s: string): string {
  const set = new Set(
    s
      .split(/\s+/)
      .filter(Boolean)
      .map((t) => t.toLowerCase())
  );
  return Array.from(set).sort().join(' ');
}

export function partialRatio(a: string, b: string): number {
  // Aprox simple: usa ventana del tamaño del más corto en el más largo
  let s1 = a;
  let s2 = b;
  if (s1.length > s2.length) [s1, s2] = [s2, s1];
  const len = s1.length;
  let best = 0;
  for (let i = 0; i + len <= s2.length; i++) {
    const window = s2.substring(i, i + len);
    const p = similarityPercent(s1, window);
    if (p > best) best = p;
    if (best === 100) break;
  }
  return best;
}
