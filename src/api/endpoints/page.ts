/* eslint-disable */
import {
  useQuery
} from '@tanstack/react-query';
import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import type {
  CreatePageDto,
  CreateSectionDto,
  MessageResponseDto,
  PageDetailDto,
  PagePublicResponseDto,
  PagesResponseDto,
  ReorderSectionsDto,
  SectionResponseDto,
  SectionsResponseDto,
  UpdatePageDto,
  UpdateSectionDto,
  UpdateSectionStatusDto
} from '../models';

import { mainInstance } from '../mutator/custom-instance';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



const withQueryKey = <T extends object, K>(query: T, queryKey: K): T & { queryKey: K } => {
  const result = { queryKey } as T & { queryKey: K };
  for (const key of Object.keys(query)) {
    // The explicit queryKey always wins, matching the previous
    // `{ ...query, queryKey }` spread where it was set last.
    if (key === 'queryKey') continue;
    Object.defineProperty(result, key, {
      enumerable: true,
      configurable: true,
      get: () => (query as Record<string, unknown>)[key],
    });
  }
  return result;
};

/**
 * @summary List all pages
 */
export const pageControllerGetPages = (

 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {


      return mainInstance<PagesResponseDto>(
      {url: `/api/v1/pages`, method: 'GET', signal
    },
      options);
    }




export const getPageControllerGetPagesQueryKey = () => {
    return [
    `/api/v1/pages`
    ] as const;
    }


export const getPageControllerGetPagesQueryOptions = <TData = Awaited<ReturnType<typeof pageControllerGetPages>>, TError = unknown>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerGetPages>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getPageControllerGetPagesQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof pageControllerGetPages>>> = ({ signal }) => pageControllerGetPages(requestOptions, signal);





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof pageControllerGetPages>>, TError, TData> & { queryKey: QueryKey }
}

export type PageControllerGetPagesQueryResult = NonNullable<Awaited<ReturnType<typeof pageControllerGetPages>>>
export type PageControllerGetPagesQueryError = unknown


/**
 * @summary List all pages
 */

export function usePageControllerGetPages<TData = Awaited<ReturnType<typeof pageControllerGetPages>>, TError = unknown>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerGetPages>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getPageControllerGetPagesQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}






/**
 * @summary Create a new page (Admin only)
 */
export const pageControllerCreatePage = (
    createPageDto: CreatePageDto,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {


      return mainInstance<PageDetailDto>(
      {url: `/api/v1/pages`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createPageDto, signal
    },
      options);
    }




export const getPageControllerCreatePageQueryKey = (createPageDto?: CreatePageDto,) => {
    return [
    'POST', `/api/v1/pages`, createPageDto
    ] as const;
    }


export const getPageControllerCreatePageQueryOptions = <TData = Awaited<ReturnType<typeof pageControllerCreatePage>>, TError = void>(createPageDto: CreatePageDto, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerCreatePage>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getPageControllerCreatePageQueryKey(createPageDto);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof pageControllerCreatePage>>> = ({ signal }) => pageControllerCreatePage(createPageDto, requestOptions, signal);





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof pageControllerCreatePage>>, TError, TData> & { queryKey: QueryKey }
}

export type PageControllerCreatePageQueryResult = NonNullable<Awaited<ReturnType<typeof pageControllerCreatePage>>>
export type PageControllerCreatePageQueryError = void


/**
 * @summary Create a new page (Admin only)
 */

export function usePageControllerCreatePage<TData = Awaited<ReturnType<typeof pageControllerCreatePage>>, TError = void>(
 createPageDto: CreatePageDto, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerCreatePage>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getPageControllerCreatePageQueryOptions(createPageDto,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}






/**
 * @summary Get page detail including audit (Admin only)
 */
export const pageControllerGetPageByKey = (
    pageKey: string,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {


      return mainInstance<PageDetailDto>(
      {url: `/api/v1/pages/admin/${pageKey}`, method: 'GET', signal
    },
      options);
    }




export const getPageControllerGetPageByKeyQueryKey = (pageKey: string,) => {
    return [
    `/api/v1/pages/admin/${pageKey}`
    ] as const;
    }


export const getPageControllerGetPageByKeyQueryOptions = <TData = Awaited<ReturnType<typeof pageControllerGetPageByKey>>, TError = void>(pageKey: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerGetPageByKey>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getPageControllerGetPageByKeyQueryKey(pageKey);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof pageControllerGetPageByKey>>> = ({ signal }) => pageControllerGetPageByKey(pageKey, requestOptions, signal);





   return  { queryKey, queryFn, enabled: pageKey !== null && pageKey !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof pageControllerGetPageByKey>>, TError, TData> & { queryKey: QueryKey }
}

export type PageControllerGetPageByKeyQueryResult = NonNullable<Awaited<ReturnType<typeof pageControllerGetPageByKey>>>
export type PageControllerGetPageByKeyQueryError = void


/**
 * @summary Get page detail including audit (Admin only)
 */

export function usePageControllerGetPageByKey<TData = Awaited<ReturnType<typeof pageControllerGetPageByKey>>, TError = void>(
 pageKey: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerGetPageByKey>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getPageControllerGetPageByKeyQueryOptions(pageKey,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}






/**
 * @summary Update a page (Admin only)
 */
export const pageControllerUpdatePage = (
    pageKey: string,
    updatePageDto: UpdatePageDto,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {


      return mainInstance<PageDetailDto>(
      {url: `/api/v1/pages/${pageKey}`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: updatePageDto, signal
    },
      options);
    }




export const getPageControllerUpdatePageQueryKey = (pageKey: string,
    updatePageDto?: UpdatePageDto,) => {
    return [
    'PATCH', `/api/v1/pages/${pageKey}`, updatePageDto
    ] as const;
    }


export const getPageControllerUpdatePageQueryOptions = <TData = Awaited<ReturnType<typeof pageControllerUpdatePage>>, TError = void>(pageKey: string,
    updatePageDto: UpdatePageDto, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerUpdatePage>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getPageControllerUpdatePageQueryKey(pageKey,updatePageDto);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof pageControllerUpdatePage>>> = ({ signal }) => pageControllerUpdatePage(pageKey,updatePageDto, requestOptions, signal);





   return  { queryKey, queryFn, enabled: pageKey !== null && pageKey !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof pageControllerUpdatePage>>, TError, TData> & { queryKey: QueryKey }
}

export type PageControllerUpdatePageQueryResult = NonNullable<Awaited<ReturnType<typeof pageControllerUpdatePage>>>
export type PageControllerUpdatePageQueryError = void


/**
 * @summary Update a page (Admin only)
 */

export function usePageControllerUpdatePage<TData = Awaited<ReturnType<typeof pageControllerUpdatePage>>, TError = void>(
 pageKey: string,
    updatePageDto: UpdatePageDto, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerUpdatePage>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getPageControllerUpdatePageQueryOptions(pageKey,updatePageDto,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}






/**
 * @summary Delete a page and all its sections (Admin only)
 */
export const pageControllerDeletePage = (
    pageKey: string,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {


      return mainInstance<MessageResponseDto>(
      {url: `/api/v1/pages/${pageKey}`, method: 'DELETE', signal
    },
      options);
    }




export const getPageControllerDeletePageQueryKey = (pageKey: string,) => {
    return [
    'DELETE', `/api/v1/pages/${pageKey}`
    ] as const;
    }


export const getPageControllerDeletePageQueryOptions = <TData = Awaited<ReturnType<typeof pageControllerDeletePage>>, TError = void>(pageKey: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerDeletePage>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getPageControllerDeletePageQueryKey(pageKey);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof pageControllerDeletePage>>> = ({ signal }) => pageControllerDeletePage(pageKey, requestOptions, signal);





   return  { queryKey, queryFn, enabled: pageKey !== null && pageKey !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof pageControllerDeletePage>>, TError, TData> & { queryKey: QueryKey }
}

export type PageControllerDeletePageQueryResult = NonNullable<Awaited<ReturnType<typeof pageControllerDeletePage>>>
export type PageControllerDeletePageQueryError = void


/**
 * @summary Delete a page and all its sections (Admin only)
 */

export function usePageControllerDeletePage<TData = Awaited<ReturnType<typeof pageControllerDeletePage>>, TError = void>(
 pageKey: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerDeletePage>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getPageControllerDeletePageQueryOptions(pageKey,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}






/**
 * @summary Get public page with active sections
 */
export const pageControllerGetPublicPage = (
    pageKey: string,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {


      return mainInstance<PagePublicResponseDto>(
      {url: `/api/v1/pages/${pageKey}`, method: 'GET', signal
    },
      options);
    }




export const getPageControllerGetPublicPageQueryKey = (pageKey: string,) => {
    return [
    `/api/v1/pages/${pageKey}`
    ] as const;
    }


export const getPageControllerGetPublicPageQueryOptions = <TData = Awaited<ReturnType<typeof pageControllerGetPublicPage>>, TError = void>(pageKey: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerGetPublicPage>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getPageControllerGetPublicPageQueryKey(pageKey);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof pageControllerGetPublicPage>>> = ({ signal }) => pageControllerGetPublicPage(pageKey, requestOptions, signal);





   return  { queryKey, queryFn, enabled: pageKey !== null && pageKey !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof pageControllerGetPublicPage>>, TError, TData> & { queryKey: QueryKey }
}

export type PageControllerGetPublicPageQueryResult = NonNullable<Awaited<ReturnType<typeof pageControllerGetPublicPage>>>
export type PageControllerGetPublicPageQueryError = void


/**
 * @summary Get public page with active sections
 */

export function usePageControllerGetPublicPage<TData = Awaited<ReturnType<typeof pageControllerGetPublicPage>>, TError = void>(
 pageKey: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerGetPublicPage>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getPageControllerGetPublicPageQueryOptions(pageKey,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}






/**
 * @summary Get all sections including inactive (Admin only)
 */
export const pageControllerGetSections = (
    pageKey: string,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {


      return mainInstance<SectionsResponseDto>(
      {url: `/api/v1/pages/${pageKey}/sections`, method: 'GET', signal
    },
      options);
    }




export const getPageControllerGetSectionsQueryKey = (pageKey: string,) => {
    return [
    `/api/v1/pages/${pageKey}/sections`
    ] as const;
    }


export const getPageControllerGetSectionsQueryOptions = <TData = Awaited<ReturnType<typeof pageControllerGetSections>>, TError = void>(pageKey: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerGetSections>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getPageControllerGetSectionsQueryKey(pageKey);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof pageControllerGetSections>>> = ({ signal }) => pageControllerGetSections(pageKey, requestOptions, signal);





   return  { queryKey, queryFn, enabled: pageKey !== null && pageKey !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof pageControllerGetSections>>, TError, TData> & { queryKey: QueryKey }
}

export type PageControllerGetSectionsQueryResult = NonNullable<Awaited<ReturnType<typeof pageControllerGetSections>>>
export type PageControllerGetSectionsQueryError = void


/**
 * @summary Get all sections including inactive (Admin only)
 */

export function usePageControllerGetSections<TData = Awaited<ReturnType<typeof pageControllerGetSections>>, TError = void>(
 pageKey: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerGetSections>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getPageControllerGetSectionsQueryOptions(pageKey,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}






/**
 * @summary Create a new section (Admin only)
 */
export const pageControllerCreateSection = (
    pageKey: string,
    createSectionDto: CreateSectionDto,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {


      return mainInstance<SectionResponseDto>(
      {url: `/api/v1/pages/${pageKey}/sections`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createSectionDto, signal
    },
      options);
    }




export const getPageControllerCreateSectionQueryKey = (pageKey: string,
    createSectionDto?: CreateSectionDto,) => {
    return [
    'POST', `/api/v1/pages/${pageKey}/sections`, createSectionDto
    ] as const;
    }


export const getPageControllerCreateSectionQueryOptions = <TData = Awaited<ReturnType<typeof pageControllerCreateSection>>, TError = void>(pageKey: string,
    createSectionDto: CreateSectionDto, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerCreateSection>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getPageControllerCreateSectionQueryKey(pageKey,createSectionDto);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof pageControllerCreateSection>>> = ({ signal }) => pageControllerCreateSection(pageKey,createSectionDto, requestOptions, signal);





   return  { queryKey, queryFn, enabled: pageKey !== null && pageKey !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof pageControllerCreateSection>>, TError, TData> & { queryKey: QueryKey }
}

export type PageControllerCreateSectionQueryResult = NonNullable<Awaited<ReturnType<typeof pageControllerCreateSection>>>
export type PageControllerCreateSectionQueryError = void


/**
 * @summary Create a new section (Admin only)
 */

export function usePageControllerCreateSection<TData = Awaited<ReturnType<typeof pageControllerCreateSection>>, TError = void>(
 pageKey: string,
    createSectionDto: CreateSectionDto, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerCreateSection>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getPageControllerCreateSectionQueryOptions(pageKey,createSectionDto,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}






/**
 * @summary Reorder sections (Admin only)
 */
export const pageControllerReorderSections = (
    pageKey: string,
    reorderSectionsDto: ReorderSectionsDto,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {


      return mainInstance<SectionsResponseDto>(
      {url: `/api/v1/pages/${pageKey}/sections/reorder`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: reorderSectionsDto, signal
    },
      options);
    }




export const getPageControllerReorderSectionsQueryKey = (pageKey: string,
    reorderSectionsDto?: ReorderSectionsDto,) => {
    return [
    'PATCH', `/api/v1/pages/${pageKey}/sections/reorder`, reorderSectionsDto
    ] as const;
    }


export const getPageControllerReorderSectionsQueryOptions = <TData = Awaited<ReturnType<typeof pageControllerReorderSections>>, TError = void>(pageKey: string,
    reorderSectionsDto: ReorderSectionsDto, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerReorderSections>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getPageControllerReorderSectionsQueryKey(pageKey,reorderSectionsDto);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof pageControllerReorderSections>>> = ({ signal }) => pageControllerReorderSections(pageKey,reorderSectionsDto, requestOptions, signal);





   return  { queryKey, queryFn, enabled: pageKey !== null && pageKey !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof pageControllerReorderSections>>, TError, TData> & { queryKey: QueryKey }
}

export type PageControllerReorderSectionsQueryResult = NonNullable<Awaited<ReturnType<typeof pageControllerReorderSections>>>
export type PageControllerReorderSectionsQueryError = void


/**
 * @summary Reorder sections (Admin only)
 */

export function usePageControllerReorderSections<TData = Awaited<ReturnType<typeof pageControllerReorderSections>>, TError = void>(
 pageKey: string,
    reorderSectionsDto: ReorderSectionsDto, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerReorderSections>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getPageControllerReorderSectionsQueryOptions(pageKey,reorderSectionsDto,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}






/**
 * @summary Toggle section active status (Admin only)
 */
export const pageControllerUpdateSectionStatus = (
    pageKey: string,
    sectionKey: string,
    updateSectionStatusDto: UpdateSectionStatusDto,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {


      return mainInstance<SectionResponseDto>(
      {url: `/api/v1/pages/${pageKey}/sections/${sectionKey}/status`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: updateSectionStatusDto, signal
    },
      options);
    }




export const getPageControllerUpdateSectionStatusQueryKey = (pageKey: string,
    sectionKey: string,
    updateSectionStatusDto?: UpdateSectionStatusDto,) => {
    return [
    'PATCH', `/api/v1/pages/${pageKey}/sections/${sectionKey}/status`, updateSectionStatusDto
    ] as const;
    }


export const getPageControllerUpdateSectionStatusQueryOptions = <TData = Awaited<ReturnType<typeof pageControllerUpdateSectionStatus>>, TError = void>(pageKey: string,
    sectionKey: string,
    updateSectionStatusDto: UpdateSectionStatusDto, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerUpdateSectionStatus>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getPageControllerUpdateSectionStatusQueryKey(pageKey,sectionKey,updateSectionStatusDto);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof pageControllerUpdateSectionStatus>>> = ({ signal }) => pageControllerUpdateSectionStatus(pageKey,sectionKey,updateSectionStatusDto, requestOptions, signal);





   return  { queryKey, queryFn, enabled: pageKey !== null && pageKey !== undefined && sectionKey !== null && sectionKey !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof pageControllerUpdateSectionStatus>>, TError, TData> & { queryKey: QueryKey }
}

export type PageControllerUpdateSectionStatusQueryResult = NonNullable<Awaited<ReturnType<typeof pageControllerUpdateSectionStatus>>>
export type PageControllerUpdateSectionStatusQueryError = void


/**
 * @summary Toggle section active status (Admin only)
 */

export function usePageControllerUpdateSectionStatus<TData = Awaited<ReturnType<typeof pageControllerUpdateSectionStatus>>, TError = void>(
 pageKey: string,
    sectionKey: string,
    updateSectionStatusDto: UpdateSectionStatusDto, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerUpdateSectionStatus>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getPageControllerUpdateSectionStatusQueryOptions(pageKey,sectionKey,updateSectionStatusDto,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}






/**
 * @summary Update section content/settings (Admin only)
 */
export const pageControllerUpdateSection = (
    pageKey: string,
    sectionKey: string,
    updateSectionDto: UpdateSectionDto,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {


      return mainInstance<SectionResponseDto>(
      {url: `/api/v1/pages/${pageKey}/sections/${sectionKey}`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: updateSectionDto, signal
    },
      options);
    }




export const getPageControllerUpdateSectionQueryKey = (pageKey: string,
    sectionKey: string,
    updateSectionDto?: UpdateSectionDto,) => {
    return [
    'PATCH', `/api/v1/pages/${pageKey}/sections/${sectionKey}`, updateSectionDto
    ] as const;
    }


export const getPageControllerUpdateSectionQueryOptions = <TData = Awaited<ReturnType<typeof pageControllerUpdateSection>>, TError = void>(pageKey: string,
    sectionKey: string,
    updateSectionDto: UpdateSectionDto, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerUpdateSection>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getPageControllerUpdateSectionQueryKey(pageKey,sectionKey,updateSectionDto);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof pageControllerUpdateSection>>> = ({ signal }) => pageControllerUpdateSection(pageKey,sectionKey,updateSectionDto, requestOptions, signal);





   return  { queryKey, queryFn, enabled: pageKey !== null && pageKey !== undefined && sectionKey !== null && sectionKey !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof pageControllerUpdateSection>>, TError, TData> & { queryKey: QueryKey }
}

export type PageControllerUpdateSectionQueryResult = NonNullable<Awaited<ReturnType<typeof pageControllerUpdateSection>>>
export type PageControllerUpdateSectionQueryError = void


/**
 * @summary Update section content/settings (Admin only)
 */

export function usePageControllerUpdateSection<TData = Awaited<ReturnType<typeof pageControllerUpdateSection>>, TError = void>(
 pageKey: string,
    sectionKey: string,
    updateSectionDto: UpdateSectionDto, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerUpdateSection>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getPageControllerUpdateSectionQueryOptions(pageKey,sectionKey,updateSectionDto,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}






/**
 * @summary Delete a section (Admin only)
 */
export const pageControllerDeleteSection = (
    pageKey: string,
    sectionKey: string,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {


      return mainInstance<MessageResponseDto>(
      {url: `/api/v1/pages/${pageKey}/sections/${sectionKey}`, method: 'DELETE', signal
    },
      options);
    }




export const getPageControllerDeleteSectionQueryKey = (pageKey: string,
    sectionKey: string,) => {
    return [
    'DELETE', `/api/v1/pages/${pageKey}/sections/${sectionKey}`
    ] as const;
    }


export const getPageControllerDeleteSectionQueryOptions = <TData = Awaited<ReturnType<typeof pageControllerDeleteSection>>, TError = void>(pageKey: string,
    sectionKey: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerDeleteSection>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getPageControllerDeleteSectionQueryKey(pageKey,sectionKey);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof pageControllerDeleteSection>>> = ({ signal }) => pageControllerDeleteSection(pageKey,sectionKey, requestOptions, signal);





   return  { queryKey, queryFn, enabled: pageKey !== null && pageKey !== undefined && sectionKey !== null && sectionKey !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof pageControllerDeleteSection>>, TError, TData> & { queryKey: QueryKey }
}

export type PageControllerDeleteSectionQueryResult = NonNullable<Awaited<ReturnType<typeof pageControllerDeleteSection>>>
export type PageControllerDeleteSectionQueryError = void


/**
 * @summary Delete a section (Admin only)
 */

export function usePageControllerDeleteSection<TData = Awaited<ReturnType<typeof pageControllerDeleteSection>>, TError = void>(
 pageKey: string,
    sectionKey: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof pageControllerDeleteSection>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getPageControllerDeleteSectionQueryOptions(pageKey,sectionKey,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}






