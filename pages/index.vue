<template>
  <div class="flex flex-col justify-center items-center h-full">
    <h1 class="mb-10">{{ $t('general.welcome') }} !</h1>

    <el-form ref="formRef" :model="form" :rules="formRules" inline @submit.prevent="submitForm">
      <el-form-item class="!mr-2" prop="search">
        <el-input v-model="form.search" type="text" clearable class="w-[250px]" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading">
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

const router = useRouter()
const generalStore = useGeneralStore()
const formRef = useElFormRef()
const form = useElFormModel({
  search: ''
})
const formRules = useElFormRules({
  search: useRequiredRule()
})

const loading = ref(false)

const routeName = useLocaleRouteName()

async function submitForm () {
  if (!formRef.value) return

  const isValid = await formRef.value.validate().catch(() => false)
  if (!isValid) return

  try {
    loading.value = true
    await generalStore.getMovies({ search: form.search })
    await router.push({ name: routeName('movies'), query: { search: form.search } })
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

</script>
