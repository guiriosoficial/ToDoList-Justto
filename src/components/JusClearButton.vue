<template>
  <button
    class="remove-all-button"
    aria-label="Clear List"
    @click="handleClick"
  >
    <JusIcon icon="trash-alt" />
  </button>
</template>

<script setup lang="ts">
interface ICleanTasksEmits {
  (e: 'click'): void
}

const emit = defineEmits<ICleanTasksEmits>()

function handleClick() {
  emit('click')
}
</script>

<style scoped lang="scss">
.remove-all-button {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -38%);
  background-color: var(--foreground-primary);
  border-radius: 50%;
  padding: 8px;
  margin: 0;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: var(--surface-base);
  font-size: 24px;
  transition: 0.1s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: translate(-50%, -50%);
  }
}
</style>
