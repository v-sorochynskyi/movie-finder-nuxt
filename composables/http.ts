import type { UseFetchOptions } from '#app'

export function useHttp<T = void> (opts?: UseFetchOptions<T>) {
  const config = useRuntimeConfig()
  const query = {
    ...opts?.query,
    apikey: config.public.API_KEY
  }

  return useFetch(`${config.public.BASE_URL}`, { ...opts, query })
}
