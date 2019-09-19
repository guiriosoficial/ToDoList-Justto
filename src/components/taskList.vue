<template>
  <div>
    <task-input @add-task="addTask" />

    <div v-if="list.length === 0" class="empty">
      <p><i class="far fa-calendar-times" />Nenhuma tarefa no momento</p>
    </div>

    <ul v-else class="overflow">
      <taskItem
        v-for="(task, index) in list"
        :key="index"
        :todo="task"
        @remove-task="removeTask"
        @edit-task="saveInCache" />
    </ul>
    <clean-tasks @remove-all="removeAll"/>
  </div>
</template>

<script>
import CleanTasks from './CleanTasks'
import TaskInput from './TaskInput'
import taskItem from './taskItem'

export default {
  name: 'TaskList',
  components: {
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
      try {this.tasks = JSON.parse(localStorage.getItem('justtodo'))}
      catch {localStorage.removeItem('justtodo')}
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

<style>
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

/* ====== LIST BOX ====== */
ul {
  width: 100%;
  height: 100%;
}

.overflow {
  height: calc(100% - 54px);
  overflow-y: auto;
}
/* ==== END LIST BOX ====*/

/* ====== TASKS BOX ====== */
.tasks {
  float: left;
  display: flex;
  padding: 12px 20px;
  width: calc(100% - 140px);
}
/* ==== END TASKS BOX ==== */

/* ====== OPTIONS BOX ====== */
.options {
  float: right;
  display: flex;
  align-items: center;
  padding: 0 6px;
}
/* ==== END OPTIONS BOX ==== */

/* ==== OPTIONS BUTTON ==== */
.btn-icon {
  background: none;
  padding: 0px 20px 0px 0px;
  color: #888;
  font-size: 20px;
  float: right;
  transition: 0.2s ease-in-out;
}

.btn-icon:hover {
  color: #666;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.btn-icon:focus {
  box-shadow: none;
  border: none;
  outline: 0;
}
/* == END OPTIONS BUTTON == */

/* === REMOVE ALL BUTTON === */
.btn-rmv-all {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -36%);
  top: 100%;
  transition: 0.1s ease-in-out;
  border-radius: 50%;
  padding: 8px;
  background-color: #666;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: #eee;
  font-size: 26px;
  width: 60px;
  height: 60px;
}

.btn-rmv-all:hover {
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: 0.1s ease-in-out;
}

/*.btn-rmv-all:focus {
  box-shadow: none;
  border: none;
  outline: 0;
}*/

.btn-rmv-all .fas {
  position: absolute;
  top: 10px;
}

/* ===== MEDIA SCREEN ===== */
@media screen and (max-width: 1024px) {
  .btn-rmv-all {
    transform: translateY(-50%, -46%);
  }
}
/* === END MEDIA SCREEN === */
/* = END REMOVE ALL BUTTON = */
</style>
