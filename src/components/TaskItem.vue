<template>
  <li class="itemlist-container">
    <div v-if="!task.editing" :class="classDone" class="listitem">
      <div class="item-title">
        <label class="checkbox">
          <input v-model="task.done" title="Marcar como FEITO" type="checkbox">
          <span class="checkmark" />
        </label>
        <span :class="classDone">{{ task.name }}</span>
      </div>
      <div style="display: flex; min-width: 65px;">
        <button @click="editTask(task)">
          <i class="far fa-edit" />
        </button>
        <button @click="removeTask(task)">
          <i class="far fa-trash-alt" />
        </button>
      </div>
    </div>
    <div v-if="task.editing" class="listitem">
      <div class="item-title">
        <label class="checkbox">
          <input v-model="task.done" title="Marcar como FEITO" type="checkbox">
          <span class="checkmark" />
        </label>
        <input
          ref="task"
          v-model="task.name"
          type="text"
          @keyup.enter="confirm">
      </div>
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
      type: Object,
      required: true,
      default: () => ({
        name: 'Ops! Isto não é uma tarefa.',
        done: false,
        editing: false
      })
    }
  },
  data () {
    return {
      editing: false
    }
  },
  computed: {
    classDone () {
      return this.task.done ? 'task-done' : ''
    }
  },
  methods: {
    removeTask (task) {
      this.$emit('remove-task', task)
    },
    editTask (task) {
      this.$emit('edit-task', task)
      this.$nextTick(() => this.$refs.task.focus())
    },
    confirm (task) {
      if (task !== '') {
        this.task.editing = false
        this.$emit('save-edition', task.name)
      }
    }
  }
}

</script>

<style lang="scss">
@import '@/styles/colors.scss';
.task-done {
  text-decoration: line-through;
  background-color: $--color-grey-hover !important;
}
.itemlist-container {
  display: flex;
  .listitem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 2px;
    width: 100%;
    max-width: 100%;
    height: 50px;
    padding: 0 20px;
    margin-bottom: 12px;
    background-color: $--color-grey-light;
    color: $--color-text-primary;
    font-size: 18px;
    .item-title {
      display: flex;
      width: 100%;
      max-width: 100%;
      align-items: center;
      span {
        text-overflow: ellipsis;
      }
      input, button {
        height: 50px;
        padding: 16px 0px;
        font-size: 18px;
      }
      .checkbox {
        display: block;
        position: relative;
        user-select: none;
        height: 20px;
        width: 20px;
        margin-right: 8px;
        cursor: pointer;
        input[type="checkbox"] {
          position: absolute;
          opacity: 0;
          height: 0;
          width: 0;
          cursor: pointer;
        }
        .checkmark {
          position: absolute;
          top: 0;
          left: 0;
          height: 20px;
          width: 20px;
          border-radius: 2px;
          background-color: $--color-text-secondary;
          &:after {
            content: "";
            position: absolute;
            display: none;
            left: 6px;
            top: 2px;
            width: 5px;
            height: 9px;
            border: solid $--color-white;
            border-width: 0 3px 3px 0;
            transform: rotate(45deg);
          }
        }
        input:checked ~ .checkmark {
          background-color: $--color-primary;
          &:after {
            display: block;
          }
        }
      }
    }
    &:hover {
      background-color: $--color-grey-hover;
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
