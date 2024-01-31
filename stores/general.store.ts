import type { ISearchResponse, ISearch } from '@/types/movies'

export const useGeneralStore = defineStore('general', {
  state () {
    return {
      movies: [] as ISearch[]
    }
  },

  getters: {},
  actions: {
    async getMovies () {
      const route = useRoute()
      const { data } = await useHttp<ISearchResponse>({ query: { s: route.query.search } })

      this.movies = data.value?.Search || []

      return data
    }
  }
})
