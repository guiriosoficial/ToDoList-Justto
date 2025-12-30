<template>
  <button
    v-show="number > 0"
    class="remove-all-button"
    title="Clear List"
    @click="removeAll"
  >
    <FontAwesomeIcon icon="trash-alt" />
  </button>
</template>

<script lang="ts">
export default {
  props: {
    number: {
      type: Number,
      default: 0
    }
  },
  emits: ['remove-all'],
  methods: {
    removeAll () {
      this.$emit('remove-all')
    }
  }
}
</script>

<style scoped lang="scss">
@use "../assets/colors";

.remove-all-button {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -38%);
  background-color: colors.$color-text-primary;
  border-radius: 50%;
  padding: 8px;
  margin: 0;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: colors.$color-white;
  font-size: 24px;
  transition: 0.1s ease-in-out;
  &:hover {
    transform: translate(-50%, -50%);
    color: colors.$color-white;
    cursor: pointer;
  }
}
</style>
