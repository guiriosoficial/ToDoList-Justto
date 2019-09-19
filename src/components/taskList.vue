<template>
  <ul>
    <taskInput @send-task="addTask" />

    <div v-if="tasks.length === 0" class="no-tasks">
      <i class="far fa-calendar-times" />
      <p>Nenhuma tarefa no momento</p>
    </div>

    <div v-else class="overflow">
      <taskItem
        v-for="(task, index) in tasks"
        :key="index"
        :todo="task"
        @remove-task="removeTask"
        @edit-task="saveInCache" />
      <clean-tasks />
    </div>
  </ul>
</template>

<script>
import CleanTasks from './CleanTasks'
import taskInput from './taskInput'
import taskItem from './taskItem'

export default {
  name: 'TaskList',
  components: {
    CleanTasks,
    taskInput,
    taskItem
  },
  data () {
    return {
      tasks: []
    }
  },
  mounted () {
    if (localStorage.getItem('tasks')) {
      try {
        this.tasks = JSON.parse(localStorage.getItem('tasks'))
      } catch (error) {
        localStorage.removeItem('tasks')
      }
    }
  },
  methods: {
    addTask (todo) {
      this.tasks.push({ name: todo })
      this.saveInCache(todo)
    },
    removeTask (todo) {
      const index = this.tasks.indexOf(todo)
      this.tasks.splice(index, 1)
      this.saveInCache(todo)
    },
    removeAll (todo) {
      if (confirm('Are you sure you want to remove all tasks?')) {
        this.tasks.splice(todo)
        this.saveInCache(todo)
      }
    },
    saveInCache () {
      const parsed = JSON.stringify(this.tasks)
      localStorage.setItem('tasks', parsed)
    }
  }
}
</script>

<style>
.no-tasks {
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
  padding: 12px 6px;
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
