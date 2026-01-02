<template>
  <li
    :class="{ 'task-item-container--done': task.done }"
    class="task-item-container"
  >
    <div class="task-item-container__head">
      <label class="task-item-container__head-checkbox">
        <input
          :checked="task.done"
          :title="checkboxTitle"
          class="task-item-container__head-checkbox-input"
          type="checkbox"
          @change="handleToggleDone"
        >
        <span class="task-item-container__head-checkmark" />
      </label>
      <span
        v-if="!isEditing"
        class="task-item-container__head-title"
      >
        {{ task.name }}
      </span>
      <input
        v-else
        ref="task"
        v-model="localName"
        type="text"
        class="task-item-container__head-input"
        @keyup.enter="handleConfirmEdition"
        @keyup.esc="handleCancelEdition"
        @blur="handleCancelEdition"
      >
    </div>
    <div
      v-if="!isEditing"
      class="task-item-container__actions"
    >
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
    <div
      v-else
      class="task-item-container__actions"
    >
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
    checkboxTitle() {
      return this.task.done ? 'Mark as UNDONE' : 'Mark as DONE'
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

.task-item-container {
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
  .task-item-container__head {
    display: flex;
    flex: 1;
    align-items: center;
    .task-item-container__head-title {
      text-overflow: ellipsis;
    }
    .task-item-container__head-input {
      padding: 16px 0;
      font-size: 18px;
    }
    .task-item-container__head-checkbox {
      display: block;
      position: relative;
      user-select: none;
      height: 20px;
      width: 20px;
      margin-right: 8px;
      cursor: pointer;
      .task-item-container__head-checkbox-input[type="checkbox"] {
        position: absolute;
        opacity: 0;
        height: 0;
        width: 0;
        cursor: pointer;
      }
      .task-item-container__head-checkmark {
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
      .task-item-container__head-checkbox-input:checked ~ .task-item-container__head-checkmark {
        background-color: colors.$color-primary;
        &:after {
          display: block;
        }
      }
    }
  }
  &--done {
    text-decoration: line-through;
    opacity: 0.5;
  }
  .task-item-container__actions {
    display: flex;
    align-items: center;
  }
  &:nth-child(even) {
    background-color: colors.$color-grey-dark;
  }
  &:hover {
    background-color: colors.$color-grey-hover;
  }
}
</style>
