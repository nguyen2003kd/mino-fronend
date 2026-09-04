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
  MediaControllerFindAllParams,
  MediaControllerUploadBody,
  MediaListResponseDto,
  MediaResponseDto,
  MessageResponseDto
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
 * @summary Upload image to S3 (Admin only)
 */
export const mediaControllerUpload = (
    mediaControllerUploadBody: MediaControllerUploadBody,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {

      const formData = new FormData();
if(mediaControllerUploadBody.file !== undefined) {
 formData.append(`file`, mediaControllerUploadBody.file);
 }

      return mainInstance<MediaResponseDto>(
      {url: `/api/v1/media`, method: 'POST',
      headers: {'Content-Type': 'multipart/form-data', },
       data: formData, signal
    },
      options);
    }




export const getMediaControllerUploadQueryKey = (mediaControllerUploadBody?: MediaControllerUploadBody,) => {
    return [
    'POST', `/api/v1/media`, mediaControllerUploadBody
    ] as const;
    }


export const getMediaControllerUploadQueryOptions = <TData = Awaited<ReturnType<typeof mediaControllerUpload>>, TError = void>(mediaControllerUploadBody: MediaControllerUploadBody, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof mediaControllerUpload>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getMediaControllerUploadQueryKey(mediaControllerUploadBody);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof mediaControllerUpload>>> = ({ signal }) => mediaControllerUpload(mediaControllerUploadBody, requestOptions, signal);





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof mediaControllerUpload>>, TError, TData> & { queryKey: QueryKey }
}

export type MediaControllerUploadQueryResult = NonNullable<Awaited<ReturnType<typeof mediaControllerUpload>>>
export type MediaControllerUploadQueryError = void


/**
 * @summary Upload image to S3 (Admin only)
 */

export function useMediaControllerUpload<TData = Awaited<ReturnType<typeof mediaControllerUpload>>, TError = void>(
 mediaControllerUploadBody: MediaControllerUploadBody, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof mediaControllerUpload>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getMediaControllerUploadQueryOptions(mediaControllerUploadBody,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}






/**
 * @summary List media with pagination
 */
export const mediaControllerFindAll = (
    params?: MediaControllerFindAllParams,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {


      return mainInstance<MediaListResponseDto>(
      {url: `/api/v1/media`, method: 'GET',
        params, signal
    },
      options);
    }




export const getMediaControllerFindAllQueryKey = (params?: MediaControllerFindAllParams,) => {
    return [
    `/api/v1/media`, ...(params ? [params] : [])
    ] as const;
    }


export const getMediaControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof mediaControllerFindAll>>, TError = unknown>(params?: MediaControllerFindAllParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof mediaControllerFindAll>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getMediaControllerFindAllQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof mediaControllerFindAll>>> = ({ signal }) => mediaControllerFindAll(params, requestOptions, signal);





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof mediaControllerFindAll>>, TError, TData> & { queryKey: QueryKey }
}

export type MediaControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof mediaControllerFindAll>>>
export type MediaControllerFindAllQueryError = unknown


/**
 * @summary List media with pagination
 */

export function useMediaControllerFindAll<TData = Awaited<ReturnType<typeof mediaControllerFindAll>>, TError = unknown>(
 params?: MediaControllerFindAllParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof mediaControllerFindAll>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getMediaControllerFindAllQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}






/**
 * @summary Get media detail by ID
 */
export const mediaControllerFindOne = (
    id: string,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {


      return mainInstance<MediaResponseDto>(
      {url: `/api/v1/media/${id}`, method: 'GET', signal
    },
      options);
    }




export const getMediaControllerFindOneQueryKey = (id: string,) => {
    return [
    `/api/v1/media/${id}`
    ] as const;
    }


export const getMediaControllerFindOneQueryOptions = <TData = Awaited<ReturnType<typeof mediaControllerFindOne>>, TError = void>(id: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof mediaControllerFindOne>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getMediaControllerFindOneQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof mediaControllerFindOne>>> = ({ signal }) => mediaControllerFindOne(id, requestOptions, signal);





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof mediaControllerFindOne>>, TError, TData> & { queryKey: QueryKey }
}

export type MediaControllerFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof mediaControllerFindOne>>>
export type MediaControllerFindOneQueryError = void


/**
 * @summary Get media detail by ID
 */

export function useMediaControllerFindOne<TData = Awaited<ReturnType<typeof mediaControllerFindOne>>, TError = void>(
 id: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof mediaControllerFindOne>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getMediaControllerFindOneQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}






/**
 * @summary Delete media from S3 (Admin only)
 */
export const mediaControllerRemove = (
    id: string,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {


      return mainInstance<MessageResponseDto>(
      {url: `/api/v1/media/${id}`, method: 'DELETE', signal
    },
      options);
    }




export const getMediaControllerRemoveQueryKey = (id: string,) => {
    return [
    'DELETE', `/api/v1/media/${id}`
    ] as const;
    }


export const getMediaControllerRemoveQueryOptions = <TData = Awaited<ReturnType<typeof mediaControllerRemove>>, TError = void>(id: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof mediaControllerRemove>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getMediaControllerRemoveQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof mediaControllerRemove>>> = ({ signal }) => mediaControllerRemove(id, requestOptions, signal);





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof mediaControllerRemove>>, TError, TData> & { queryKey: QueryKey }
}

export type MediaControllerRemoveQueryResult = NonNullable<Awaited<ReturnType<typeof mediaControllerRemove>>>
export type MediaControllerRemoveQueryError = void


/**
 * @summary Delete media from S3 (Admin only)
 */

export function useMediaControllerRemove<TData = Awaited<ReturnType<typeof mediaControllerRemove>>, TError = void>(
 id: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof mediaControllerRemove>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getMediaControllerRemoveQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}






