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
      :to="link"
      class="header-container__link"
    >
      {{ route.meta.headerButtonTitle }}
    </RouterLink>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export interface ICounter {
  doing: number,
  done: number,
  total: number
}

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

const link = computed(() => route.meta.headerButtonTitle === 'ABOUT' ? '/about' : '/')
</script>

<style scoped lang="scss">
@use "../assets/colors";

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 100%;
  padding: 0 20px;
  font-weight: bold;
  background-color: colors.$color-primary;
  .header-container__logo {
    font-size: 24px;
    color: colors.$color-white;
  }
  .header-container__details {
    display: flex;
    gap: 8px;
    font-size: 14px;
    color: colors.$color-white;
  }
  .header-container__link {
    font-size: 16px;
    color: colors.$color-white;
    background-color: colors.$color-primary-dark;
    border-radius: 2px;
    padding: 8px 14px;
    transition: .5s ease;
    &:hover {
      background-color: colors.$color-primary-light;
    }
  }
}
</style>
