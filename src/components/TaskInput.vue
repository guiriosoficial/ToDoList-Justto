<template>
  <div class="taskinput-container">
    <input
      v-model="taskName"
      placeholder="Insira uma nova task aqui"
      autofocus
      @keyup.enter="addTask">
    <button class="btn-icon" title="Adcionar Tarefa" @click="addTask">
      <i class="fas fa-plus" />
    </button>
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

.taskinput-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  padding: 0 20px;
  background-color: #ddd;
  &:hover {
    background: #ccc;
  }
  input, button {
    font-size: 20px;
  }
}
</style>
