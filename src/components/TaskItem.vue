<template>
  <li class="itemlist-container">
    <div v-if="!editing" class="listitem">
      <span>{{ task }}</span>
      <div>
        <button @click="editTask">
          <i class="far fa-edit" />
        </button>
        <button @click="removeTask(task)">
          <i class="far fa-trash-alt" />
        </button>
      </div>
    </div>
    <div v-if="editing" class="listitem">
      <input
        ref="task"
        v-model="task"
        type="text"
        @keyup.enter="confirm">
      <button @click="confirm">
        <i class="fas fa-check" />
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'TaskItem',
  props: {
    task: {
      type: String,
      required: true,
      default: 'Ops! Isto não é uma tarefa.'
    }
  },
  data () {
    return {
      editing: false
    }
  },
  methods: {
    removeTask (task) {
      this.$emit('remove-task', task)
    },
    editTask () {
      this.editing = true
      this.$nextTick(() => this.$refs.task.focus())
    },
    confirm (task) {
      if (task !== '') {
        this.editing = false
        this.$emit('edit-task', task)
      }
    }
  }
}

</script>

<style lang="scss">
@import '@/styles/colors.scss';

.itemlist-container {
  display: flex;
  .listitem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 2px;
    width: 100%;
    height: 50px;
    padding: 0 20px;
    margin-bottom: 12px;
    background-color: $--color-grey-light;
    color: $--color-text-primary;
    font-size: 18px;
    &:hover {
      background-color: $--color-grey-hover;
    }
    input, button {
      height: 50px;
      padding: 16px 0px;
      font-size: 18px;
    }
  }
  &:nth-child(even) .listitem {
    background-color: $--color-grey-dark;
    &:hover {
      background-color: $--color-grey-hover;
    }
  }
}
</style>
