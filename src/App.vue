<template>
  <TodoHeader :counter="counters" />
  <RouterView @update-counter="handleUpdateCounter" />
</template>

<script setup lang="ts">
import TodoHeader, { type ICounter } from '@/components/TodoHeader.vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const counters = ref()

function handleUpdateCounter(value: ICounter) {
  counters.value = value
}
</script>