const stripOuterQuotesAndBackslashes = (value: string): string =>
  value.replace(/^\\*"+|"+\\*$/g, "");

const dedupePreserveOrder = (values: string[]): string[] => {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const value of values) {
    if (seen.has(value)) continue;
    seen.add(value);
    result.push(value);
  }
  return result;
};

const tryJsonParse = (value: string): unknown => {
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
};

/**
 * Normalize API "images" field to a list of URLs.
 *
 * Handles common backend encodings:
 * - Comma-separated string: "https://a,https://b"
 * - JSON stringified string: "\"https://a\"" (arrives as '"https://a"')
 * - JSON stringified array: "[\"https://a\",\"https://b\"]"
 */
export const normalizeImageUrls = (input: unknown): string[] => {
  if (!input) return [];

  if (Array.isArray(input)) {
    return dedupePreserveOrder(input.flatMap((item) => normalizeImageUrls(item)));
  }

  if (typeof input !== "string") return [];

  const trimmed = input.trim();
  if (!trimmed) return [];

  // If it looks like JSON, try parsing once (and possibly recursively).
  if (trimmed.startsWith("[") || trimmed.startsWith('"')) {
    const parsed = tryJsonParse(trimmed);
    if (parsed !== undefined) {
      return normalizeImageUrls(parsed);
    }
  }

  // Fallback: comma-separated list.
  const urls = trimmed
    .split(",")
    .map((part) => stripOuterQuotesAndBackslashes(part.trim()))
    .map((url) => (url.includes(" ") ? encodeURI(url) : url))
    .filter(Boolean);

  return dedupePreserveOrder(urls);
};
