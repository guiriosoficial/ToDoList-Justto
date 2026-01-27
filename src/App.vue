<template>
  <JusTodoHeader :counter="counter" />
  <RouterView @update-counter="handleUpdateCounter" />
</template>

<script setup lang="ts">
import JusTodoHeader from '@/components/JusTodoHeader.vue'
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import type { ICounter } from '@/models/counter'

const counter = ref()

function handleUpdateCounter(value: ICounter) {
  counter.value = value
}
</script>