<template>
  <div class="input-box">

    <li>
      <div class="tasks">
        <input class="input-task" v-model="newTask" @keyup.enter="addTask" type="text" placeholder="Insert a New Task Here" autofocus>
      </div>

      <div class="options">
        <button class="btn-icon plus-icon" @click="addTask" title="Add Task"><i class="fas fa-plus" /></button>
      </div>
    </li>

  </div>
</template>

<script>
// === EXPORT DEFAULT === //
export default {
  name: 'taskInput',

  methods: {
    addTask () {                                  // *Adding a New Task*
      if (this.newTask !== '') {                  // Check if the input is filled or empty
        this.$emit('send-task', this.newTask)     // Send the Task to taskList
        this.newTask = ''                         // Clear Input
      }
    }
  },

  data () {
    return {
      newTask: ''                                 // Task Name Variable
    }
  }
}
// = END EXPORT DEFAULT = //
</script>

<style scoped>
/* ===== INPUT BOX ===== */
.input-box {
  background-color: #ddd;
  border-radius: 0px 0px 12px 12px;
  margin: 0px;
  width: 100%;
}

.input-box:hover {
  background: #ccc;
}
/* === END INPUT BOX === */

/* ===== INPUT ITEM ===== */
.input-task {
  padding: 0px;
  font-size: 24px;
  color: #666;
  background: none;
  width: 100%;
}

.input-task:focus {
  box-shadow: none;
  border: none;
  outline: 0;
}
/* === END INPUT ITEM === */

/* ===== ADD BUTTON ===== */
.plus-icon {
  font-size: 22px;
  padding: 0px 26px;
}

.plus-icon:focus {
  box-shadow: none;
  border: none;
  outline: 0;
}

.fas {
  display: inline;
}
/* === END ADD BUTTON === */
</style>
