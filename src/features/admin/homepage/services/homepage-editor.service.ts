import {
  pageControllerCreatePage,
  pageControllerCreateSection,
  pageControllerGetSections,
  pageControllerUpdateSection,
  pageControllerUpdateSectionStatus,
} from "@/api/endpoints/page";
import { CreateSectionDtoType } from "@/api/models";

const HOMEPAGE_PAGE_KEY = "homepage";
const HOMEPAGE_EDITOR_SECTION_KEY = "homepage-editor";

type ApiResponse = {
  data?: unknown;
};

type StoredSection = {
  key?: unknown;
  content?: unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const unwrapResponse = (response: unknown): unknown =>
  isRecord(response) && "data" in response
    ? (response as ApiResponse).data
    : response;

const getHomepageEditorSection = async (): Promise<StoredSection | undefined> => {
  const response = unwrapResponse(await pageControllerGetSections(HOMEPAGE_PAGE_KEY));

  if (!isRecord(response) || !Array.isArray(response.sections)) {
    throw new Error("Không thể đọc dữ liệu homepage từ máy chủ");
  }

  return response.sections.find(
    (section): section is StoredSection =>
      isRecord(section) && section.key === HOMEPAGE_EDITOR_SECTION_KEY,
  );
};

const getErrorStatus = (error: unknown): number | undefined =>
  isRecord(error) && typeof error.status === "number" ? error.status : undefined;

export const loadHomepageEditorDraft = async (): Promise<Record<string, unknown> | null> => {
  try {
    const section = await getHomepageEditorSection();
    return section && isRecord(section.content) ? section.content : null;
  } catch (error) {
    if (getErrorStatus(error) === 404) {
      return null;
    }

    throw error;
  }
};

export const saveHomepageEditorDraft = async (content: object): Promise<void> => {
  let section: StoredSection | undefined;

  try {
    section = await getHomepageEditorSection();
  } catch (error) {
    if (getErrorStatus(error) !== 404) {
      throw error;
    }

    await pageControllerCreatePage({
      key: HOMEPAGE_PAGE_KEY,
      name: "Homepage",
      isActive: true,
    });
  }

  const sectionContent = content as Record<string, unknown>;

  if (section) {
    await pageControllerUpdateSection(
      HOMEPAGE_PAGE_KEY,
      HOMEPAGE_EDITOR_SECTION_KEY,
      { content: sectionContent },
    );
    await pageControllerUpdateSectionStatus(
      HOMEPAGE_PAGE_KEY,
      HOMEPAGE_EDITOR_SECTION_KEY,
      { isActive: true },
    );
    return;
  }

  await pageControllerCreateSection(HOMEPAGE_PAGE_KEY, {
    key: HOMEPAGE_EDITOR_SECTION_KEY,
    type: CreateSectionDtoType.CUSTOM,
    content: sectionContent,
    sortOrder: 1000,
    isActive: true,
  });
};
