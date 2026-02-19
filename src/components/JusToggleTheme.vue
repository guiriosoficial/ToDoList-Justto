<script setup lang="ts">
import { AppThemes } from '@/config/appThemes'
import { LocalStorageKeys } from '@/config/localStorageKeys'
import { ref, onMounted, computed } from 'vue'

const light = AppThemes.LIGHT
const dark = AppThemes.DARK
const key = LocalStorageKeys.THEME
const attribute = 'data-theme'

const theme = ref(light)

const themeIcon = computed(() => theme.value === light ? 'sun' : 'moon')

function handleToggleTheme() {
  const newTheme = theme.value === light ? dark : light
  theme.value = newTheme
  document.documentElement.setAttribute(attribute, newTheme)
  localStorage.setItem(key, newTheme)
}

onMounted(() => {
  const savedTheme = localStorage.getItem(key) || light
  theme.value = savedTheme
  document.documentElement.setAttribute(attribute, savedTheme)
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