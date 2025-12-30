<template>
  <div class="task-input-container">
    <input
      v-model="taskName"
      placeholder="Insert a new task here"
      autofocus
      @keyup.enter="addTask"
      class="task-input-container__input"
    >
    <button
      class="task-input-container__button"
      title="Add Task"
      @click="addTask"
    >
      <FontAwesomeIcon icon="plus" />
    </button>
  </div>
</template>

<script lang="ts">
export default {
  emits: ['add-task'],
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

<style scoped lang="scss">
@use "../assets/colors";

.task-input-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  padding: 0 20px;
  background-color: colors.$color-grey-dark;
  &:hover {
    background-color: colors.$color-grey-hover;
  }
  .task-input-container__input,
  .task-input-container__button {
    display: flex;
    align-items: center;
    height: 60px;
    padding: 20px 0;
    font-size: 20px;
  }
  ::-webkit-input-placeholder {
    color: colors.$color-text-secondary;
  }
}
</style>
