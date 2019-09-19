<template>
  <div class="input-box">
    <div class="tasks">
      <input
        v-model="newTask"
        class="input-task"
        placeholder="Insira uma nova task aqui"
        autofocus
        @keyup.enter="addTask">
    </div>
    <div class="options">
      <button class="btn-icon plus-icon" title="Adcionar Tarefa" @click="addTask">
        <i class="fas fa-plus" />
      </button>
    </div>
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
