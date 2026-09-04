import { describe, expect, it } from "vitest";
import { normalizeImageUrls } from "@/utils/image-urls";

describe("normalizeImageUrls", () => {
  it("returns [] for nullish", () => {
    expect(normalizeImageUrls(null)).toEqual([]);
    expect(normalizeImageUrls(undefined)).toEqual([]);
    expect(normalizeImageUrls("")).toEqual([]);
  });

  it("handles a plain url", () => {
    expect(normalizeImageUrls("https://storage.vietprodev.com/x.jpg")).toEqual([
      "https://storage.vietprodev.com/x.jpg",
    ]);
  });

  it("handles a quoted url coming from API (double-encoded)", () => {
    expect(normalizeImageUrls('"https://storage.vietprodev.com/x.jpg"')).toEqual([
      "https://storage.vietprodev.com/x.jpg",
    ]);
  });

  it("handles JSON array", () => {
    expect(normalizeImageUrls('["https://a.com/1.jpg","https://b.com/2.jpg"]')).toEqual([
      "https://a.com/1.jpg",
      "https://b.com/2.jpg",
    ]);
  });

  it("handles JSON stringified array (string -> array)", () => {
    expect(
      normalizeImageUrls('"[\\"https://a.com/1.jpg\\",\\"https://b.com/2.jpg\\"]"')
    ).toEqual(["https://a.com/1.jpg", "https://b.com/2.jpg"]);
  });

  it("handles comma-separated urls with extra quotes", () => {
    expect(normalizeImageUrls('"https://a.com/1.jpg", "https://b.com/2.jpg"')).toEqual([
      "https://a.com/1.jpg",
      "https://b.com/2.jpg",
    ]);
  });
});
