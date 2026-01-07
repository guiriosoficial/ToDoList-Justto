<template>
  <button
    v-show="number > 0"
    class="remove-all-button"
    title="Clear List"
    @click="handleRemoveAll"
  >
    <FontAwesomeIcon icon="trash-alt" />
  </button>
</template>

<script setup lang="ts">
interface ICleanTasksProps {
  number?: number
}

interface ICleanTasksEmits {
  (e: 'remove-all'): void
}

const { number = 0 } = defineProps<ICleanTasksProps>()

const emit = defineEmits<ICleanTasksEmits>()

function handleRemoveAll() {
  emit('remove-all')
}
</script>

<style scoped lang="scss">
@use "../assets/colors";

.remove-all-button {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -38%);
  background-color: colors.$color-text-primary;
  border-radius: 50%;
  padding: 8px;
  margin: 0;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: colors.$color-white;
  font-size: 24px;
  transition: 0.1s ease-in-out;
  &:hover {
    transform: translate(-50%, -50%);
    color: colors.$color-white;
    cursor: pointer;
  }
}
</style>
