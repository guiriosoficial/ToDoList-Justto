<template>
  <JusTodoHeader :counter="counter" />
  <RouterView @update-counter="handleUpdateCounter" />
</template>

<script setup lang="ts">
import TodoHeader, { type ICounter } from '@/components/TodoHeader.vue'
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const counter = ref()

function handleUpdateCounter(value: ICounter) {
  counter.value = value
}
</script>