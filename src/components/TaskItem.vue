<template>
  <li class="task-list-container">
    <div
      v-if="!isEditing"
      :class="classDone"
      class="task-list-container__item"
    >
      <div class="task-list-container__item-title">
        <label class="task-list-container__item-checkbox">
          <input
            :checked="task.done"
            title="Mark as DONE"
            type="checkbox"
            @change="handleToggleDone"
          >
          <span class="task-list-container__item-checkmark" />
        </label>
        <span :class="classDone">
          {{ task.name }}
        </span>
      </div>
      <div class="task-list-container__item-actions">
        <button
          title="Edit Task"
          @click="handleEditTask()"
        >
          <FontAwesomeIcon icon="edit" />
        </button>
        <button
          title="Remove Task"
          @click="handleRemoveTask"
        >
          <FontAwesomeIcon icon="trash-alt" />
        </button>
      </div>
    </div>
    <div
      v-if="isEditing"
      class="task-list-container__item"
    >
      <div class="task-list-container__item-title">
        <label class="task-list-container__item-checkbox">
          <input
            :checked="task.done"
            title="Mask as DONE"
            type="checkbox"
            @change="handleToggleDone"
          >
          <span class="task-list-container__item-checkmark" />
        </label>
        <input
          ref="task"
          v-model="localName"
          type="text"
          @keyup.enter="handleConfirmEdition"
          @keyup.esc="handleCancelEdition"
          @blur="handleCancelEdition"
        >
      </div>
      <button
        title="Confirm Edition"
        @click="handleConfirmEdition"
      >
        <FontAwesomeIcon icon="check" />
      </button>
      <button
        title="Cancel Edition"
        @click="handleCancelEdition"
      >
        <FontAwesomeIcon icon="close" />
      </button>
    </div>
  </li>
</template>

<script lang="ts">
import type { ITask } from '@/types'
import type { PropType } from 'vue'

export default {
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'remove-task',
    'update-task',
    'edit-task'
  ],
  data() {
    return {
      localName: this.task.name
    }
  },
  computed: {
    classDone() {
      return this.task.done ? 'task-done' : ''
    }
  },
  watch: {
    isEditing(newValue) {
      if (!newValue) return

      this.localName = this.task.name
      this.$nextTick(() => {
        const input = this.$refs.task as HTMLInputElement
        input?.focus()
      })
    }
  },
  methods: {
    handleToggleDone() {
      this.$emit('update-task', { ...this.task, done: !this.task.done })
    },
    handleRemoveTask() {
      this.$emit('remove-task', this.task)
    },
    handleEditTask() {
      this.$emit('edit-task', this.task.id)
    },
    handleConfirmEdition() {
      if (this.localName.trim() == '') return

      this.$emit('update-task', { ...this.task, name: this.localName });
      this.$emit('edit-task', null);
    },
    handleCancelEdition() {
      this.$emit('edit-task', null);
    }
  }
}
</script>

<style scoped lang="scss">
@use "../assets/colors";

.task-done {
  text-decoration: line-through;
  background-color: colors.$color-grey-hover !important;
}
.task-list-container {
  display: flex;
  .task-list-container__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 2px;
    width: 100%;
    max-width: 100%;
    height: 56px;
    padding: 0 20px;
    margin-bottom: 12px;
    background-color: colors.$color-grey-light;
    color: colors.$color-text-primary;
    font-size: 18px;
    .task-list-container__item-title {
      display: flex;
      width: 100%;
      max-width: 100%;
      align-items: center;
      span {
        text-overflow: ellipsis;
      }
      input, button {
        height: 50px;
        padding: 16px 0;
        font-size: 18px;
      }
      .task-list-container__item-checkbox {
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
        .task-list-container__item-checkmark {
          position: absolute;
          top: 0;
          left: 0;
          height: 20px;
          width: 20px;
          border-radius: 2px;
          background-color: colors.$color-text-secondary;
          &:after {
            content: "";
            position: absolute;
            display: none;
            left: 6px;
            top: 2px;
            width: 5px;
            height: 9px;
            border: solid colors.$color-white;
            border-width: 0 3px 3px 0;
            transform: rotate(45deg);
          }
        }
        input:checked ~ .task-list-container__item-checkmark {
          background-color: colors.$color-primary;
          &:after {
            display: block;
          }
        }
      }
    }
    .task-list-container__item-actions {
      display: flex;
      align-items: center;
      min-width: 64px;
    }
    &:hover {
      background-color: colors.$color-grey-hover;
    }
  }
  &:nth-child(even) .task-list-container__item {
    background-color: colors.$color-grey-dark;
    &:hover {
      background-color: colors.$color-grey-hover;
    }
  }
}
</style>
