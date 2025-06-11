<template>
  <button
    v-show="number > 0"
    class="rmv-all"
    title="Clear List"
    @click="removeAll"
  >
     <FontAwesomeIcon icon="trash-alt" />
  </button>
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      default: 0
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
.rmv-all {
  position: absolute;
  left: 50%;
  top: 100%;
  transition: 0.1s ease-in-out;
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
