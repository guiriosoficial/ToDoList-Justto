<template>
  <TodoHeader
    :counter="doingDone"
    title="ABOUT"
  />
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

<script lang="ts">
import type { ITask } from '@/types'
import TodoHeader from '@/components/TodoHeader.vue'
import CleanTasks from '@/components/CleanTasks.vue'
import TaskInput from '@/components/TaskInput.vue'
import TaskItem from '@/components/TaskItem.vue'

export default {
  components: {
    TodoHeader,
    CleanTasks,
    TaskInput,
    TaskItem
  },
  data() {
    return {
      list: [] as ITask[],
      editingTaskId: null as number | null
    }
  },
  computed: {
    doingDone() {
      return {
        doing: this.list.filter((item: ITask) => !item.done).length,
        done: this.list.filter((item: ITask) => item.done).length,
        total: this.list.length
      }
    }
  },
  beforeMount() {
    if (localStorage.getItem('jus-todo')) {
      try {
        const localItems = localStorage.getItem('jus-todo') ?? ''
        this.list = JSON.parse(localItems)
      } catch {
        localStorage.removeItem('jus-todo')
      }
    }
  },
  methods: {
    handleCreateTask(task: string) {
      this.list.push({
        id: Date.now(),
        name: task,
        done: false,
      })
      this.saveInCache()
    },
    handleStartEdit(taskId: number) {
      this.editingTaskId = taskId
    },
    handleRemoveTask(task: ITask) {
      this.list = this.list.filter(t => t !== task)
      this.saveInCache()
    },
    handleUpdateTask(task: ITask) {
      const index = this.list.findIndex(t => t.id === task.id);
      if (index !== -1) {
        this.list.splice(index, 1, task);
        this.saveInCache();
      }
    },
    handleRemoveAll() {
      const confirmed = confirm('Are you sure you want to remove all ' + this.list.length + ' tasks from list?\nThis action cannot be undone.')

      if (confirmed) {
        this.list = []
        this.saveInCache()
      }
    },
    saveInCache() {
      const parsed = JSON.stringify(this.list)
      localStorage.setItem('jus-todo', parsed)
    }
  }
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
