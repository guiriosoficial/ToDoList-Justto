<script setup lang="ts">
import { AppThemes } from '@/config/appThemes'
import { LocalStorageKeys } from '@/config/localStorageKeys'
import { onMounted, computed } from 'vue'
import { useLocalStorage } from "@/composables/useLocalStorage.ts";

const light = AppThemes.LIGHT
const dark = AppThemes.DARK
const attribute = 'data-theme'

const {
  state: theme,
} = useLocalStorage<AppThemes>(LocalStorageKeys.THEME, light)

const themeIcon = computed(() => theme.value === light ? 'sun' : 'moon')

function handleToggleTheme() {
  const newTheme = theme.value === light ? dark : light
  theme.value = newTheme
  document.documentElement.setAttribute(attribute, newTheme)
}

onMounted(() => {
  document.documentElement.setAttribute(attribute, theme.value)
})
</script>

<template>
  <JusIcon
    :icon="themeIcon"
    class="toggle-theme-button"
    @click="handleToggleTheme"
  />
</template>

<style scoped lang="scss">
.toggle-theme-button {
  color: var(--brand-on-primary);
  width: 24px;
  cursor: pointer;
}
</style>
