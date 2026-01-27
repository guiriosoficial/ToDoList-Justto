<template>
  <FontAwesomeIcon :icon="icon" />
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

interface IJusIcon {
  icon: string
}

const {
  icon
} = defineProps<IJusIcon>()
</script>
