<template>
  <div v-loading.fullscreen="pending">
    <div v-if="error" class="flex flex-col items-center gap-5">
      <h1 class="text-center">{{ error }}</h1>
      <el-button @click="navigateTo(localePath('index'))">Back to search</el-button>
    </div>

    <div v-else>
      <h1 class="text-2xl mb-10">{{ movieDetails?.Title }}</h1>

      <div class="flex gap-5">
        <img
          loading="lazy"
          :alt="movieDetails?.Title"
          :src="movieDetails?.Poster"
          class="w-[350px] h-[450px] shrink-0 object-cover"
        >

        <ul>
          <li
            v-for="item in details"
            :key="item.label"
            :class="{ 'flex items-center': 'rate' in item }"
          >
            {{ $t(item.label) }}:
            <el-rate
              v-if="'rate' in item"
              :model-value="item.rate"
              :max="10"
              allow-half
              show-score
              disabled
              class="ml-2"
            />
            <template v-else>
              {{ item.value }}
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IMovieDetails, IMovieErrorResponse } from '@/types/movies'

definePageMeta({
  pageLabel: 'navigation.searchResult'
})

type TMoviesIdRoute = Extract<TRouteNamedMapKeys, `movies-id___${string}`>

const route = useRoute<TMoviesIdRoute>()
const localePath = useLocalePath()
const movieDetails = ref<IMovieDetails | null>(null)
const error = ref('')
const { data, pending } = await useHttp<IMovieDetails | IMovieErrorResponse>({
  key: `movie-${route.params.id}`,
  query: { i: route.params.id }
})

const details = computed(() => {
  const d = movieDetails.value
  return [
    { label: 'general.year', value: d?.Year },
    { label: 'general.country', value: d?.Country },
    { label: 'general.director', value: d?.Director },
    { label: 'general.genre', value: d?.Genre },
    { label: 'general.language', value: d?.Language },
    { label: 'general.plot', value: d?.Plot },
    { label: 'general.imdbRating', rate: Number(d?.imdbRating) || 0 },
    { label: 'general.imdbVotes', value: d?.imdbVotes }
  ]
})

if (data.value && 'Error' in data.value) {
  error.value = data.value.Error
} else if (data.value) {
  movieDetails.value = data.value
}

</script>
