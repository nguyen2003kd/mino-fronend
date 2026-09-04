import { pageControllerGetPublicPage } from "@/api/endpoints/page";

const HOMEPAGE_PAGE_KEY = "homepage";
const HOMEPAGE_EDITOR_SECTION_KEY = "homepage-editor";

type PublicSection = {
  key?: unknown;
  content?: unknown;
};

type ApiResponse = {
  data?: unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const unwrapResponse = (response: unknown): unknown =>
  isRecord(response) && "data" in response
    ? (response as ApiResponse).data
    : response;

export const loadPublicHomepageDraft = async (): Promise<Record<string, unknown> | null> => {
  const response = unwrapResponse(
    await pageControllerGetPublicPage(HOMEPAGE_PAGE_KEY),
  );

  if (!isRecord(response) || !Array.isArray(response.sections)) {
    throw new Error("Không thể đọc dữ liệu homepage công khai từ máy chủ");
  }

  const section = response.sections.find(
    (item): item is PublicSection =>
      isRecord(item) && item.key === HOMEPAGE_EDITOR_SECTION_KEY,
  );

  return section && isRecord(section.content) ? section.content : null;
};
