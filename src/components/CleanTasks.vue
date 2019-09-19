<template>
  <button class="rmv-all" title="Limpar lista de tarefas" @click="removeAll">
    <i class="fas fa-trash-alt" />
  </button>
</template>

<script>
export default {
  name: 'CleanTasks'
}
</script>

<style lang="scss">
@import '@/styles/colors.scss';

.rmv-all {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -36%);
  top: 100%;
  transition: 0.1s ease-in-out;
  border-radius: 50%;
  padding: 8px;
  background-color: #666;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: $--color-white;
  font-size: 26px;
  width: 60px;
  height: 60px;
  &:hover {
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: 0.1s ease-in-out;
  }
  .fas {
    position: absolute;
    top: 10px;
  }
}
</style>
