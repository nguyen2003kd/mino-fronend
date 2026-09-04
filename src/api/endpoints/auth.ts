/* eslint-disable */
import {
  useMutation,
  useQuery
} from '@tanstack/react-query';
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import type {
  AuthResponseDto,
  LoginDto,
  RegisterDto
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
 * @summary Register a new user
 */
export const authControllerRegister = (
    registerDto: RegisterDto,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {


      return mainInstance<AuthResponseDto>(
      {url: `/api/v1/auth/register`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: registerDto, signal
    },
      options);
    }




export const getAuthControllerRegisterMutationKey = () => ['authControllerRegister'] as const;

export const getAuthControllerRegisterMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof authControllerRegister>>, TError,AuthControllerRegisterMutationVariables, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof authControllerRegister>>, TError,AuthControllerRegisterMutationVariables, TContext> => {

const mutationKey = getAuthControllerRegisterMutationKey();
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof authControllerRegister>>, AuthControllerRegisterMutationVariables> = (props) => {
          const {data} = props ?? {};

          return  authControllerRegister(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type AuthControllerRegisterMutationResult = NonNullable<Awaited<ReturnType<typeof authControllerRegister>>>
    export type AuthControllerRegisterMutationBody = RegisterDto
    export type AuthControllerRegisterMutationError = unknown
    export type AuthControllerRegisterMutationVariables = {data: RegisterDto}

    /**
 * @summary Register a new user
 */
export const useAuthControllerRegister = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof authControllerRegister>>, TError,AuthControllerRegisterMutationVariables, TContext>, request?: SecondParameter<typeof mainInstance>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof authControllerRegister>>,
        TError,
        AuthControllerRegisterMutationVariables,
        TContext
      > => {
      return useMutation(getAuthControllerRegisterMutationOptions(options));
    }
    /**
 * @summary Login and get JWT token
 */
export const authControllerLogin = (
    loginDto: LoginDto,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {


      return mainInstance<AuthResponseDto>(
      {url: `/api/v1/auth/login`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: loginDto, signal
    },
      options);
    }




export const getAuthControllerLoginMutationKey = () => ['authControllerLogin'] as const;

export const getAuthControllerLoginMutationOptions = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof authControllerLogin>>, TError,AuthControllerLoginMutationVariables, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof authControllerLogin>>, TError,AuthControllerLoginMutationVariables, TContext> => {

const mutationKey = getAuthControllerLoginMutationKey();
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof authControllerLogin>>, AuthControllerLoginMutationVariables> = (props) => {
          const {data} = props ?? {};

          return  authControllerLogin(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type AuthControllerLoginMutationResult = NonNullable<Awaited<ReturnType<typeof authControllerLogin>>>
    export type AuthControllerLoginMutationBody = LoginDto
    export type AuthControllerLoginMutationError = void
    export type AuthControllerLoginMutationVariables = {data: LoginDto}

    /**
 * @summary Login and get JWT token
 */
export const useAuthControllerLogin = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof authControllerLogin>>, TError,AuthControllerLoginMutationVariables, TContext>, request?: SecondParameter<typeof mainInstance>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof authControllerLogin>>,
        TError,
        AuthControllerLoginMutationVariables,
        TContext
      > => {
      return useMutation(getAuthControllerLoginMutationOptions(options));
    }
    /**
 * @summary Get current user info
 */
export const authControllerGetMe = (

 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {


      return mainInstance<AuthResponseDto>(
      {url: `/api/v1/auth/me`, method: 'GET', signal
    },
      options);
    }




export const getAuthControllerGetMeQueryKey = () => {
    return [
    `/api/v1/auth/me`
    ] as const;
    }


export const getAuthControllerGetMeQueryOptions = <TData = Awaited<ReturnType<typeof authControllerGetMe>>, TError = unknown>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof authControllerGetMe>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getAuthControllerGetMeQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof authControllerGetMe>>> = ({ signal }) => authControllerGetMe(requestOptions, signal);





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof authControllerGetMe>>, TError, TData> & { queryKey: QueryKey }
}

export type AuthControllerGetMeQueryResult = NonNullable<Awaited<ReturnType<typeof authControllerGetMe>>>
export type AuthControllerGetMeQueryError = unknown


/**
 * @summary Get current user info
 */

export function useAuthControllerGetMe<TData = Awaited<ReturnType<typeof authControllerGetMe>>, TError = unknown>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof authControllerGetMe>>, TError, TData>, request?: SecondParameter<typeof mainInstance>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getAuthControllerGetMeQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}






