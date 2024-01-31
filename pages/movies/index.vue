<template>
  <div>
    <Swiper
      v-if="generalStore.movies.length"
      :modules="[SwiperAutoplay, SwiperNavigation]"
      :slides-per-view="4"
      :loop="true"
      :navigation="true"
      :effect="'creative'"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }"
      :creative-effect="{
        prev: {
          shadow: false,
          translate: ['-20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }"
    >
      <SwiperSlide v-for="slide in generalStore.movies" :key="slide.imdbID">
        <NuxtLink
          :to="`${localeRoutePath}/${slide.imdbID}`"
          class="flex flex-col items-center w-full h-full"
        >
          <img
            loading="lazy"
            :alt="slide.Title"
            :src="slide.Poster"
            class="w-[250px] h-[350px] shrink-0 object-cover"
          >

          <h2 class="text-center">{{ slide.Title }}</h2>
          <p>{{ slide.Year }}</p>
        </NuxtLink>
      </SwiperSlide>
    </Swiper>
    <div v-else class="flex flex-col items-center gap-5">
      <h1 class="text-center">
        {{ $t('general.noResults') }}
      </h1>
      <el-button @click="navigateTo(localePath('index'))">Back to search</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  pageLabel: 'navigation.searchResult'
})

const generalStore = useGeneralStore()
const localePath = useLocalePath()

const localeRoutePath = computed(() => {
  return `${localePath('movies')}`
})

if (!generalStore.movies.length) {
  generalStore.getMovies()
}
</script>
