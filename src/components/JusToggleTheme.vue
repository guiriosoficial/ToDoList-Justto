<script setup lang="ts">
import { ref, onMounted } from 'vue'

const theme = ref('light')

function handleToggleTheme() {
  // 1. Inverte o tema
  const newTheme = theme.value === 'light' ? 'dark' : 'light'

  // 2. Atualiza o estado reativo
  theme.value = newTheme

  // 3. Aplica ao HTML (CSS Selector)
  document.documentElement.setAttribute('data-theme', newTheme)

  // 4. Persiste no localStorage
  localStorage.setItem('app-theme', newTheme)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('app-theme') || 'light'
  theme.value = savedTheme
  document.documentElement.setAttribute('data-theme', savedTheme)
})
</script>

<template>
  <JusIcon
    :icon="theme === 'light' ? 'moon' : 'sun'"
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