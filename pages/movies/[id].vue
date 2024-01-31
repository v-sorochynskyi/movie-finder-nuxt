<template>
  <div v-loading="pending">
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
          <li>
            Year: {{ movieDetails?.Year }}
          </li>
          <li>
            Country: {{ movieDetails?.Country }}
          </li>
          <li>
            Director: {{ movieDetails?.Director }}
          </li>
          <li>
            Genre: {{ movieDetails?.Genre }}
          </li>
          <li>
            Language: {{ movieDetails?.Language }}
          </li>
          <li>
            Plot: {{ movieDetails?.Plot }}
          </li>
          <li class="flex items-center">
            IMDB Rating: <el-rate
              :model-value="Number(movieDetails?.imdbRating) || 0"
              :max="10"
              allow-half
              show-score
              disabled
              class="ml-2"
            />
          </li>
          <li>
            IMDB Votes: {{ movieDetails?.imdbVotes }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IMovieResponse } from '@/types/movies'

definePageMeta({
  pageLabel: 'navigation.searchResult'
})

const route = useRoute()
const localePath = useLocalePath()
const movieDetails = ref<IMovieResponse | null>(null)
const error = ref('')
const { data, pending } = await useHttp<IMovieResponse>({ query: { i: route.params.id } })

console.log('data', data.value)
if (data.value.Error) {
  console.log(data.value.Error)
  error.value = data.value.Error
} else {
  movieDetails.value = data.value
}

</script>
