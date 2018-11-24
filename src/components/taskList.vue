<template>
    <ul>

      <taskInput v-on:send-task="addTask" />
      <!-- Task Input Will Be Render Here -->

      <!-- If Task List Is Empty, Render Hello -->
      <hello v-if="todoList == 0" />

      <!-- If Task List Is Not Empty, Render List -->
      <div class="overflow" v-else>
        <!-- Loop to Render the List with All Tasks -->
        <taskItem v-for="(todo,index) in todoList" @remove-task="removeTask" @edit-task="saveInCache" :todo="todo" :key="index" />
        <!-- The Tasks Items Will Be Render Here -->
        <button class="btn-rmv-all" @click="removeAll" title="Revome All Tasks"><i class="fas fa-trash-alt" /></button>
      </div>

    </ul>
</template>

<script>
// ====== IMPORTS ====== //
import taskInput from './taskInput'
import hello from './hello'
import taskItem from './taskItem'
// ==== END IMPORTS ==== //

// === EXPORT DEFAULT === //
export default {
  name: 'taskList',
  components: {
    taskInput,
    hello,
    taskItem
  },

  data () {
    return {
      todoList: []                                                        // Array with Task List
    }
  },

  methods: {
    addTask (todo) {                                                      // *Add Tasks at List*
      this.todoList.push({name: todo})                                    // Push Task to List
      this.saveInCache(todo)                                              // Save in Cache
    },

    removeTask (todo) {                                                   // *Remove Tasks from List*
      const index = this.todoList.indexOf(todo)                           // Get the Task Inde n Array
      this.todoList.splice(index, 1)                                      // Remove Object from Array
      this.saveInCache(todo)                                              // Save In Cache
    },

    removeAll (todo) {                                                    // *Remove All Tasks from List*
      if (confirm('Are you sure you want to remove all tasks?')) {        // Alert to Confirm Remotion (Avoit Miss Clicks)
        this.todoList.splice(todo)                                        // Remove All Objects from Array
        this.saveInCache(todo)                                            // Save In Cache
      }
    },

    saveInCache (todo) {                                                  // *Saves Task List in Cache*
      const parsed = JSON.stringify(this.todoList)                        // Serialize Values with JSON
      localStorage.setItem('todoList', parsed)                            // Save Task in Cache
    }
  },

  mounted () {
    if (localStorage.getItem('todoList')) {                                // Get the List
      try {
        this.todoList = JSON.parse(localStorage.getItem('todoList'))       // Unserialize Values with JSON
      }
      catch (error) {
        localStorage.removeItem('todoList')                                // Erase Array if Somethig Wrong
      }
    }
  }
}
// = END EXPORT DEFAULT = //
</script>

<style>
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
  left: 45%;
  top: 100%;
  transform: translateX(-50%);
  transform: translateY(-36%);
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
  transform: translateY(-50%);
  cursor: pointer;
  transition: 0.1s ease-in-out;
}

.btn-rmv-all:focus {
  box-shadow: none;
  border: none;
  outline: 0;
}

.btn-rmv-all .fas {
  position: absolute;
  top: 10px;
}

/* ===== MEDIA SCREEN ===== */
@media screen and (max-width: 1024px) {
  .btn-rmv-all {
    transform: translateY(-46%);
  }
}
/* === END MEDIA SCREEN === */
/* = END REMOVE ALL BUTTON = */
</style>
