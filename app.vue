<template>
  <ElConfigProvider
    :locale="{
      name: locale,
      el: messages[locale]?.el as TranslatePair
    }"
  >
    <NuxtLayout>
      <NuxtPage :page-key="pageKey" />
    </NuxtLayout>
  </ElConfigProvider>
</template>
<script lang="ts" setup>
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { TranslatePair } from 'element-plus/lib/locale'

const { locale, messages } = useI18n()

const pageKey = (route: RouteLocationNormalizedLoaded) => {
  const baseName = typeof route.name === 'string' ? route.name.replace(/___\w+$/, '') : ''
  return baseName + JSON.stringify(route.params)
}
</script>
