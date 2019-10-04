<template>
  <div>
    <todo-header title="SOBRE" />
    <task-input @add-task="addTask" />

    <div v-if="list.length === 0" class="empty">
      <i class="far fa-calendar-times" />
      <p>Nenhuma tarefa por aqui!</p>
    </div>

    <ul v-else class="overflow">
      <task-item
        v-for="(task, index) in list"
        :key="index"
        :task="task"
        :oneByOne="oneByOne"
        @cancel-edit="cancelEdit"
        @remove-task="removeTask"
        @edit-task="saveInCache" />
    </ul>

    <clean-tasks :number="list.length" @remove-all="removeAll" />
  </div>
</template>

<script>
import TodoHeader from '@/components/TodoHeader'
import CleanTasks from '@/components/CleanTasks'
import TaskInput from '@/components/TaskInput'
import TaskItem from '@/components/TaskItem'

export default {
  name: 'Todo',
  components: {
    TodoHeader,
    CleanTasks,
    TaskInput,
    TaskItem
  },
  data () {
    return {
      list: [],
      oneByOne: false
    }
  },
  beforeMount () {
    if (localStorage.getItem('justtodo')) {
      try {
        this.list = JSON.parse(localStorage.getItem('justtodo'))
      } catch {
        localStorage.removeItem('justtodo')
      }
    }
  },
  methods: {
    cancelEdit () {
      this.oneByOne = !this.oneByOne
    },
    addTask (task) {
      this.list.push(task)
      this.saveInCache()
    },
    removeTask (task) {
      let index = this.list.indexOf(task)
      this.list.splice(index, 1)
      this.saveInCache()
    },
    removeAll () {
      if (confirm('Tem certeza que deseja remover todas as tarefas da lista?\nEsta Ação não pode ser desfeita.')) {
        this.list = []
        this.saveInCache(this.list)
      }
    },
    saveInCache () {
      const parsed = JSON.stringify(this.list)
      localStorage.setItem('justtodo', parsed)
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/colors.scss';

.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 130px);
  color: $--color-text-primary;
  p { font-size: 20px; margin-top: 16px; }
  i { font-size: 48px; }
}
.overflow {
  height: calc(100vh - 130px);
  overflow-y: auto;
  padding: 12px 12px 0;
}
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track-piece {
  background-color: $--color-grey-light;
}
::-webkit-scrollbar-thumb {
  background-color: $--color-primary-light;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: $--color-primary;
}

</style>
