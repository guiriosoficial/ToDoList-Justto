<template>
  <div class="list-item">

    <!-- If Task Edition Is Not Active -->
    <li v-show="!edit">
      <div class="tasks">{{ todo.name }}</div>
      <div class="options">
        <div><button class="btn-icon" @click="editTask()"><i class="far fa-edit" /></button></div>
        <div><button class="btn-icon" @click="removeTask(todo)"><i class="far fa-trash-alt" /></button></div>
      </div>
    </li>

    <!-- If Task Edition Is Active -->
    <li v-show="edit">
      <div class="tasks">
        <input class="task-input-edit" v-model="todo.name" v-on:keyup.enter="confirm()" type="text" ref="task">
      </div>
      <div class="options">
        <div><button class="btn-icon"  @click="confirm()"><i class="fas fa-check" /></button></div>
      </div>
    </li>

  </div>
</template>

<script>
// === EXPORT DEFAULT === //
export default {
  name: 'taskItem',
  props: ['todo'],                                        // Take todoList Object from taskList Component

  methods: {
    removeTask (todo) {                                   // *Removing a Task*
      this.$emit('remove-task', todo)                     // Send the Task to taskList to be excluded
    },
    editTask () {                                         // *Editing a Task*
      this.edit = true                                    // Enables Task Edition
      this.$nextTick(() => this.$refs.task.focus())       // Put the Focus on Input
    },
    confirm (todo) {                                      // *Confirming a Edition*
      this.edit = false                                   // Disables Task Edition
      this.$emit('edit-task', todo)                       // Save in Cache
    }

  },
  data () {
    return {
      edit: false                                         // Var to Enable or Disable Task Edition
    }
  }
}
// = END EXPORT DEFAULT = //
</script>

<style scoped>
/* === INPUT EDIT ITEM === */
.task-input-edit {
  padding: 0px;
  font-size: 22px;
  color: #666;
  background: none;
  width: 100%;
}

.task-input-edit:focus {
  box-shadow: none;
  border: none;
  outline: 0;
}
/* = END INPUT EDIT ITEM = */

/* ==== TASK LIST STYLE ==== */
.list-item {
  background-color: #ddd;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 22px;
  color: #666;
  border-radius: 10px;
  margin: 8px 8px;
  transition: 0.2s ease-in-out;
}

.list-item:nth-child(2n+1) {
  background-color: #eee;
}

.list-item:hover {
  background: #ccc;
  transition: 0.2s ease-in-out;
}
/* == END TASK LIST STYLE == */
</style>
