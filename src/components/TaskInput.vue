<template>
  <div class="taskinput-container">
    <input
      v-model="taskName"
      placeholder="Insert a new task here"
      autofocus
      @keyup.enter="addTask"
    >
    <button
      class="btn-icon"
      title="Add Task"
      @click="addTask"
    >
      <FontAwesomeIcon icon="plus" />
    </button>
  </div>
</template>

<script>
export default {
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

<style lang="scss">
.taskinput-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  padding: 0px 20px;
  background-color: colors.$color-grey-dark;
  &:hover {
    background-color: colors.$color-grey-hover;
  }
  input, button {
    height: 60px;
    padding: 20px 0px;
    font-size: 20px;
  }
  ::-webkit-input-placeholder {
    color: colors.$color-text-secondary;
  }
}
</style>
