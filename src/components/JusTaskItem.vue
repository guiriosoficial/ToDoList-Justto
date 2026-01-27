<template>
  <li
    :class="{ 'task-item-container--done': task.done }"
    class="task-item-container"
  >
    <div class="task-item-container__head">
      <label class="task-item-container__head-checkbox">
        <input
          :checked="task.done"
          :title="checkboxTitle"
          :aria-label="checkboxTitle + ': ' + task.name"
          class="task-item-container__head-checkbox-input"
          type="checkbox"
          @change="handleToggleDone"
        >
        <span class="task-item-container__head-checkmark" />
      </label>
      <span
        v-if="!isEditing"
        class="task-item-container__head-title"
      >
        {{ task.name }}
      </span>
      <input
        v-else
        ref="taskInput"
        v-model="localName"
        type="text"
        class="task-item-container__head-input"
        @keyup.enter="handleConfirmEdition"
        @keyup.esc="handleStopEdition"
        @blur="handleStopEdition"
      >
    </div>
    <div
      v-if="!isEditing"
      class="task-item-container__actions"
    >
      <button
        title="Edit Task"
        aria-label="Edit task"
        @click="handleStartEdition"
      >
        <JusIcon icon="edit" />
      </button>
      <button
        title="Remove Task"
        aria-label="Remove task"
        @click="handleRemoveTask"
      >
        <JusIcon icon="trash-alt" />
      </button>
    </div>
    <div
      v-else
      class="task-item-container__actions"
    >
      <button
        title="Confirm Edition"
        aria-label="Confirm edition"
        @click="handleConfirmEdition"
      >
        <JusIcon icon="check" />
      </button>
      <button
        title="Cancel Edition"
        aria-label="Cancel edition"
        @click="handleStopEdition"
      >
        <JusIcon icon="close" />
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import type { ITask } from '@/models/task'

interface ITaskItemProps {
  task: ITask,
  isEditing?: boolean
}

interface ITaskItemEmits {
  (e: 'update-task', task: ITask): void,
  (e: 'remove-task', task: number): void,
  (e: 'edit-task', taskId: number | null): void
}

const {
  task,
  isEditing = false
} = defineProps<ITaskItemProps>()

const emit = defineEmits<ITaskItemEmits>()

const localName = ref(task.name)
const taskInput = ref<HTMLInputElement | null>(null)

const checkboxTitle = computed(() => task.done ? 'Mark as UNDONE' : 'Mark as DONE')

watch(() => isEditing, (newValue) => {
  if (!newValue) return

  localName.value = task.name

  nextTick(() => {
    taskInput.value?.focus()
  })
})

function handleToggleDone() {
  const eventPayload = { ...task, done: !task.done }
  emit('update-task', eventPayload)
}

function handleRemoveTask() {
  emit('remove-task', task.id)
}

function handleStartEdition() {
  emit('edit-task', task.id)
}

function handleStopEdition() {
  emit('edit-task', null)
}

function handleConfirmEdition() {
  const trimmedName = localName.value.trim()

  if (trimmedName) {
    const eventPayload = { ...task, name: trimmedName }
    emit('update-task', eventPayload)
  }

  handleStopEdition()
}
</script>

<style scoped lang="scss">
.task-item-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 2px;
  width: 100%;
  max-width: 100%;
  height: 56px;
  padding: 0 20px;
  margin-bottom: 12px;
  background-color: var(--surface-base);
  color: var(--foreground-primary);
  font-size: 18px;
  .task-item-container__head {
    display: flex;
    flex: 1;
    align-items: center;
    .task-item-container__head-title {
      text-overflow: ellipsis;
    }
    .task-item-container__head-input {
      padding: 16px 0;
      font-size: 18px;
    }
    .task-item-container__head-checkbox {
      display: block;
      position: relative;
      user-select: none;
      height: 20px;
      width: 20px;
      margin-right: 8px;
      cursor: pointer;
      .task-item-container__head-checkbox-input[type="checkbox"] {
        position: absolute;
        opacity: 0;
        height: 0;
        width: 0;
        cursor: pointer;
      }
      .task-item-container__head-checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        border-radius: 2px;
        background-color: var(--foreground-secondary);
        &:after {
          content: "";
          position: absolute;
          display: none;
          left: 6px;
          top: 2px;
          width: 5px;
          height: 9px;
          border: solid var(--surface-border);
          border-width: 0 3px 3px 0;
          transform: rotate(45deg);
        }
      }
      .task-item-container__head-checkbox-input:checked ~ .task-item-container__head-checkmark {
        background-color: var(--brand-primary);
        &:after {
          display: block;
        }
      }
    }
  }
  &--done {
    text-decoration: line-through;
    opacity: 0.5;
  }
  .task-item-container__actions {
    display: flex;
    align-items: center;
  }
  &:nth-child(even) {
    background-color: var(--surface-alt);
  }
  &:hover {
    background-color: var(--surface-hover);
  }
}
</style>
