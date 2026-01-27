<template>
  <header class="header-container">
    <div>
      <h1 class="header-container__logo">
        TODO List
      </h1>
      <div class="header-container__details">
        <span>Total: {{ counter.total }}</span>
        <span>Done: {{ counter.done }}</span>
        <span>Left: {{ counter.doing }}</span>
      </div>
    </div>
    <RouterLink
      :to="{ name: route.meta.headerButtonLink }"
      :aria-label="`Go to ${route.meta.headerButtonTitle} page`"
      class="header-container__link"
    >
      {{ route.meta.headerButtonTitle }}
    </RouterLink>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { ICounter } from '@/models/counter'

interface ITodoHeaderProps {
  counter?: ICounter
}

const route = useRoute()

const {
  counter = {
    doing: 0,
    done: 0,
    total: 0
  }
} = defineProps<ITodoHeaderProps>()
</script>

<style scoped lang="scss">
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 100%;
  padding: 0 20px;
  font-weight: bold;
  background-color: var(--brand-primary);
  .header-container__logo {
    font-size: 24px;
    color: var(--brand-on-primary);
  }
  .header-container__details {
    display: flex;
    gap: 8px;
    font-size: 14px;
    color: var(--brand-on-primary);
  }
  .header-container__link {
    font-size: 16px;
    color: var(--brand-on-primary);
    background-color: var(--brand-primary-dark);
    border-radius: 2px;
    padding: 8px 14px;
    transition: .5s ease;
    &:hover {
      background-color: var(--brand-primary-light);
    }
  }
}
</style>
