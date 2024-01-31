<template>
  <div class="flex flex-col h-full">
    <!-- HEADER -->
    <div class="shrink-0 flex items-center h-20 bg-white shadow border-b border-gray-300 px-5 justify-between">
      <Compute
        #default="{ labelClass, pageLabel }"
        :labelClass="'font-bold text-lg min-w-[200px]'"
        :pageLabel="$route.meta?.pageLabel"
      >
        <slot name="header" :labelClass="labelClass" :pageLabel="pageLabel">
          <p :class="labelClass">{{ $t(pageLabel) }}</p>
        </slot>
      </Compute>

      <client-only>
        <el-tooltip content="Back to search" effect="light">
          <NuxtLink :to="localePath('index')">
            <AppIconMovieClapper class="w-10 h-10" />
          </NuxtLink>
        </el-tooltip>
      </client-only>

      <div class="flex gap-5 items-center">
        <!-- LANG SWITCHER -->
        <client-only>
          <el-select
            v-model="locale"
            @update:modelValue="navigateTo(switchLocalePath(locale))"
          >
            <el-option
              v-for="l in (locales as LocaleObject[])"
              :key="l.code"
              :label="l.name"
              :value="l.code"
            />
          </el-select>
        </client-only>

        <el-button @click="navigateTo(localePath('movies-create'))"><AppIconPlus /></el-button>
      </div>
    </div>

    <!-- MAIN -->
    <main class="flex-grow p-5">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
import type { LocaleObject } from 'vue-i18n-routing'

const { locale, locales } = useI18n()

const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()

</script>
