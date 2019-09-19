<template>
  <div class="list-item">
    <li v-show="!edit">
      <div class="tasks">
        {{ todo }}
      </div>
      <div class="options">
        <div>
          <button class="btn-icon" @click="editTask()">
            <i class="far fa-edit" />
          </button>
        </div>
        <div>
          <button class="btn-icon" @click="removeTask(todo)">
            <i class="far fa-trash-alt" />
          </button>
        </div>
      </div>
    </li>
    <li v-show="edit">
      <div class="tasks">
        <input
          ref="task"
          v-model="todo.name"
          class="task-input-edit"
          type="text"
          @keyup.enter="confirm()">
      </div>
      <div class="options">
        <div>
          <button class="btn-icon" @click="confirm()">
            <i class="fas fa-check" />
          </button>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: 'TaskItem',
  props: {
    todo: {
      type: String,
      required: true,
      default: 'It\'s Empty'
    }
  },
  data () {
    return {
      edit: false
    }
  },
  methods: {
    removeTask (todo) {
      this.$emit('remove-task', todo)
    },
    editTask () {
      this.edit = true
      this.$nextTick(() => this.$refs.task.focus())
    },
    confirm (todo) {
      if (todo !== '') {
        this.edit = false
        this.$emit('edit-task', todo)
      }
    }
  }
}

</script>

<style scoped>
/* === INPUT EDIT ITEM === */
.task-input-edit {
  padding: 0px;
  font-size: 22px;
  color: #666;
  background: none;
  width: 100%;
}

.task-input-edit:focus {
  box-shadow: none;
  border: none;
  outline: 0;
}
/* = END INPUT EDIT ITEM = */

/* ==== TASK LIST STYLE ==== */
.list-item {
  background-color: #ddd;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 22px;
  color: #666;
  border-radius: 10px;
  margin: 8px 8px;
  transition: 0.2s ease-in-out;
}

.list-item:nth-child(2n+1) {
  background-color: #eee;
}

.list-item:hover {
  background: #ccc;
  transition: 0.2s ease-in-out;
}
/* == END TASK LIST STYLE == */
</style>
