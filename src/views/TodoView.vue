<template>
  <TaskInput @create-task="handleCreateTask" />

  <div
    v-if="!list.length"
    class="todo_view-container__empty-state"
  >
    <FontAwesomeIcon
      class="todo_view-container__empty-state-icon"
      icon="calendar-times"
    />
    <p>No tasks Here!</p>
  </div>

  <ul
    v-else
    class="todo_view-container__task-list"
  >
    <TaskItem
      v-for="task in list"
      :key="task.id"
      :task="task"
      :is-editing="editingTaskId === task.id"
      @update-task="handleUpdateTask"
      @remove-task="handleRemoveTask"
      @edit-task="handleStartEdit"
    />
  </ul>

  <CleanTasks
    :number="list.length"
    @remove-all="handleRemoveAll"
  />
</template>

<script setup lang="ts">
import type { ITask } from '@/types'
import CleanTasks from '@/components/CleanTasks.vue'
import TaskInput from '@/components/TaskInput.vue'
import TaskItem from '@/components/TaskItem.vue'
import { ref, onBeforeMount, watch } from 'vue'
import type { ICounter } from '@/components/TodoHeader.vue'

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
  const storageItems = localStorage.getItem('jus-todo')

  if (!storageItems) return

  try {
    list.value = JSON.parse(storageItems ?? '')
  } catch {
    localStorage.removeItem('jus-todo')
  }
})

function handleCreateTask(task: string) {
  list.value.push({
    id: Date.now(),
    name: task,
    done: false,
  })

  saveInStorage()
}

function handleStartEdit(taskId: number | null) {
  editingTaskId.value = taskId
}

function handleRemoveTask(task: ITask) {
  list.value = list.value.filter((t) => t !== task)
  saveInStorage()
}

function handleUpdateTask(task: ITask) {
  const index = list.value.findIndex((t) => t.id === task.id);

  if (index === -1) return

  list.value[index] = { ...task };
  saveInStorage();
}

function handleRemoveAll() {
  const confirmed = confirm('Are you sure you want to remove all ' + list.value.length + ' tasks from list?\nThis action cannot be undone.')

  if (confirmed) {
    list.value = []
    saveInStorage()
  }
}

function saveInStorage() {
  const parsed = JSON.stringify(list.value)
  localStorage.setItem('jus-todo', parsed)
}
</script>

<style scoped lang="scss">
@use "../assets/colors";

.todo_view-container__empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 130px);
  color: colors.$color-text-primary;
  font-size: 20px;
  gap: 16px;
  .todo_view-container__empty-state-icon {
    font-size: 48px;
  }
}
.todo_view-container__task-list {
  height: calc(100vh - 130px);
  overflow-y: auto;
  padding: 12px 12px 0;
}
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track-piece {
  background-color: colors.$color-grey-light;
}
::-webkit-scrollbar-thumb {
  background-color: colors.$color-primary-light;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: colors.$color-primary;
}
</style>
