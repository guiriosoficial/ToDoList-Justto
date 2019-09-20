<template>
  <div>
    <todo-header link="SOBRE" />

    <task-input @add-task="addTask" />
    <div v-if="list.length === 0" class="empty">
      <i class="far fa-calendar-times" />
      <p>Nenhuma tarefa por aqui!</p>
    </div>

    <ul v-else class="overflow">
      <taskItem
        v-for="(task, index) in list"
        :key="index"
        :todo="task"
        @remove-task="removeTask"
        @edit-task="saveInCache" />
    </ul>

    <clean-tasks @remove-all="removeAll" />
  </div>
</template>

<script>
import TodoHeader from './TodoHeader'
import CleanTasks from './CleanTasks'
import TaskInput from './TaskInput'
import taskItem from './taskItem'

export default {
  name: 'TaskList',
  components: {
    TodoHeader,
    CleanTasks,
    TaskInput,
    taskItem
  },
  data () {
    return {
      list: []
    }
  },
  beforeMount () {
    if (localStorage.getItem('justtodo')) {
      try {
        this.tasks = JSON.parse(localStorage.getItem('justtodo'))
      } catch {
        localStorage.removeItem('justtodo')
      }
    }
  },
  methods: {
    addTask (task) {
      this.list.push(task)
      this.saveInCache()
    },
    removeTask (todo) {
      const index = this.tasks.indexOf(todo)
      this.list.splice(index, 1)
      this.saveInCache(todo)
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
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 130px);
  p { margin-top: 20px }
  i { font-size: 60px; }
}

/* ====== LIST BOX ====== */
// ul {
//   width: 100%;
//   height: 100%;
// }
//
// .overflow {
//   height: calc(100% - 54px);
//   overflow-y: auto;
// }
// /* ==== END LIST BOX ====*/
//
// /* ====== TASKS BOX ====== */
// .tasks {
//   float: left;
//   display: flex;
//   padding: 12px 20px;
//   width: calc(100% - 140px);
// }
// /* ==== END TASKS BOX ==== */
//
// /* ====== OPTIONS BOX ====== */
// .options {
//   float: right;
//   display: flex;
//   align-items: center;
//   padding: 0 6px;
// }
// /* ==== END OPTIONS BOX ==== */
//
// /* ==== OPTIONS BUTTON ==== */
// .btn-icon {
//   background: none;
//   padding: 0px 20px 0px 0px;
//   color: #888;
//   font-size: 20px;
//   float: right;
//   transition: 0.2s ease-in-out;
// }
//
// .btn-icon:hover {
//   color: #666;
//   cursor: pointer;
//   transition: 0.2s ease-in-out;
// }
//
// .btn-icon:focus {
//   box-shadow: none;
//   border: none;
//   outline: 0;
// }
// /* == END OPTIONS BUTTON == */

</style>
