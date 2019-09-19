<template>
  <div class="taskName-container">
    <div class="input">
      <input
        v-model="taskName"
        class="input-task"
        placeholder="Insira uma nova task aqui"
        autofocus
        @keyup.enter="addTask">
    </div>
    <div class="add-btn">
      <button class="btn-icon" title="Adcionar Tarefa" @click="addTask">
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
      taskName: ''
    }
  },
  methods: {
    addTask () {
      if (this.taskName !== '') {
        this.$emit('add-task', this.taskName)
        this.taskName = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';

.taskName-container {
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
  &:hover {
    background: #ccc;
  }
}
.input {
  width: calc(100% - 140px);
  input {
    width: 100%;
  }
}
</style>
