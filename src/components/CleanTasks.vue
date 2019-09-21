<template>
  <button v-show="number > 0" class="rmv-all" title="Limpar lista de tarefas" @click="removeAll">
    <i class="fas fa-trash-alt" />
  </button>
</template>

<script>
export default {
  name: 'CleanTasks',
  props: {
    number: {
      type: Number,
      default: 0,
      required: true,
    }
  },
  methods: {
    removeAll () {
      this.$emit('remove-all')
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/colors.scss';

.rmv-all {
  position: absolute;
  left: 50%;
  top: 100%;
  transition: 0.1s ease-in-out;
  transform: translate(-50%, -38%);
  background-color: $--color-text-primary;
  border-radius: 50%;
  padding: 8px;
  margin: 0;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: $--color-white;
  font-size: 24px;
  transition: 0.1s ease-in-out;
  &:hover {
    transform: translate(-50%, -50%);
    color: $--color-white;
    cursor: pointer;
  }
  .fas {
    position: absolute;
    top: 10px;
  }
}
</style>
