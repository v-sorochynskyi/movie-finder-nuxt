<template>
  <div class="flex flex-col justify-center items-center h-full">
    <h1 class="mb-10">{{ $t('general.welcome') }} !</h1>

    <el-form inline>
      <el-form-item class="!mr-2">
        <el-input v-model="search" type="text" clearable class="w-[250px]" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading" @click="submitForm">
          {{ $t('general.search') }}
          <AppIconMagnify class="ml-2" />
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  pageLabel: 'navigation.home'
})

const localePath = useLocalePath()
const router = useRouter()
const generalStore = useGeneralStore()

const loading = ref(false)
const search = ref('')

async function submitForm () {
  try {
    loading.value = true

    await router.replace({ path: localePath('index'), query: { search: search.value } })
    await generalStore.getMovies()

    router.push({ path: localePath('movies'), query: { search: search.value } })
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

</script>
