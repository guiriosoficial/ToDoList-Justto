<template>
  <div class="task-input-container">
    <input
      v-model="taskName"
      class="task-input-container__input"
      placeholder="Insert a new task here"
      autofocus
      @keyup.enter="handleCreateTask"
    >
    <button
      class="task-input-container__button"
      title="Add Task"
      aria-label="Add Task"
      @click="handleCreateTask"
    >
      <JusIcon icon="plus" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ITaskInputEmits {
  (e: 'create-task', taskName: string): void
}

const taskName = ref('')

const emit = defineEmits<ITaskInputEmits>()

function handleCreateTask() {
  const trimmedName = taskName.value.trim()

  if (!trimmedName) return

  emit('create-task', trimmedName)
  taskName.value = ''
}
</script>

<style scoped lang="scss">
.task-input-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  padding: 0 20px;
  background-color: var(--surface-alt);
  &:hover {
    background-color: var(--surface-hover);
  }
  .task-input-container__input,
  .task-input-container__button {
    display: flex;
    align-items: center;
    height: 60px;
    padding: 20px 0;
    font-size: 20px;
  }
  ::-webkit-input-placeholder {
    color: var(--foreground-secondary);
  }
}
</style>
