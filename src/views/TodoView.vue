<template>
  <JusTaskInput @create-task="handleCreateTask" />

  <JusEmptyState v-if="!list.length" />

  <ul
    v-else
    class="todo_view-container__task-list"
  >
    <JusTaskItem
      v-for="task in list"
      :key="task.id"
      :task="task"
      :is-editing="editingTaskId === task.id"
      @update-task="handleUpdateTask"
      @remove-task="handleRemoveTask"
      @edit-task="handleStartEdit"
    />
  </ul>

  <JusClearButton
    v-if="list.length > 0"
    @click="handleRemoveAll"
  />
</template>

<script setup lang="ts">
import JusClearButton from '@/components/JusClearButton.vue'
import JusTaskInput from '@/components/JusTaskInput.vue'
import JusTaskItem from '@/components/JusTaskItem.vue'
import JusEmptyState from "@/components/JusEmptyState.vue";
import { ref, onBeforeMount, watch } from 'vue'
import type { ICounter } from '@/models/counter'
import type { ITask } from '@/models/task'

// TODO: Put in global variables
const LOCAL_STORAGE_KEY = 'jus-todo'

interface ITodoViewEmits {
  (e: 'update-counter', counter: ICounter): void
}

const list = ref<ITask[]>([])
const editingTaskId = ref<number | null>(null)

const emit = defineEmits<ITodoViewEmits>()

watch(() => list.value, (newValue) => {
  const total = newValue?.length ?? 0
  const done = newValue?.filter((item: ITask) => item.done).length ?? 0
  const doing = total - done
  const counters = { total, done, doing }

  emit('update-counter', counters)
}, { deep: true })

onBeforeMount(() => {
  const storageItems = localStorage.getItem(LOCAL_STORAGE_KEY)

  if (!storageItems) return

  try {
    list.value = JSON.parse(storageItems ?? '')
  } catch {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }
})

function handleCreateTask(task: string) {
  list.value.push({
    id: Date.now(),
    name: task,
    done: false
  })
}

function handleStartEdit(taskId: number | null) {
  editingTaskId.value = taskId
}

function handleRemoveTask(taskId: number) {
  list.value = list.value.filter((t) => t.id !== taskId)
}

function handleUpdateTask(task: ITask) {
  const target = list.value.find((t) => t.id === task.id)

  if (target) Object.assign(target, task)
}

function handleRemoveAll() {
  const confirmed = confirm('Are you sure you want to remove all ' + list.value.length + ' tasks from list?\nThis action cannot be undone.')

  if (confirmed) list.value = []
}

function saveInStorage() {
  const parsed = JSON.stringify(list.value)
  localStorage.setItem(LOCAL_STORAGE_KEY, parsed)
}

watch(list, saveInStorage, { deep: true })
</script>

<style scoped lang="scss">
.todo_view-container__task-list {
  height: calc(100vh - 130px);
  overflow-y: auto;
  padding: 12px 12px 0;
}
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track-piece {
  background-color: var(--surface-base);
}
::-webkit-scrollbar-thumb {
  background-color: var(--brand-primary-light);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: var(--brand-primary);
}
</style>
