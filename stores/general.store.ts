import type { IMovieResponse, IMovie, IMovieErrorResponse } from '@/types/movies'

export const useGeneralStore = defineStore('general', {
  state () {
    return {
      movies: [] as IMovie[],
      error: null as string | null
    }
  },

  getters: {},
  actions: {
    async getMovies ({ search }: { search: string }) {
      const { data } = await useHttp<IMovieResponse | IMovieErrorResponse>({ query: { s: search } })

      if (data.value && 'Error' in data.value) {
        this.error = data.value.Error
        return data
      }

      if (data.value) {
        this.movies = data.value.Search
      }

      return data
    }
  }
})
