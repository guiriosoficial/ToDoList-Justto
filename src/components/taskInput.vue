<template>
  <div class="input-box">
    <li>
      <div class="tasks">
        <input
          v-model="newTask"
          class="input-task"
          placeholder="Insert a New Task Here"
          type="text"
          autofocus
          @keyup.enter="addTask">
      </div>
      <div class="options">
        <button class="btn-icon plus-icon" title="Add Task" @click="addTask">
          <i class="fas fa-plus" />
        </button>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: 'TaskInput',
  data () {
    return {
      newTask: ''
    }
  },
  methods: {
    addTask () {
      if (this.newTask !== '') {
        this.$emit('send-task', this.newTask)
        this.newTask = ''
      }
    }
  }
}
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
