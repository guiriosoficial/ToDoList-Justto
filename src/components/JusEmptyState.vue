<template>
  <div class="empty-state-container">
    <JusIcon
      class="empty-state-container__icon"
      icon="calendar-times"
    />
    <p>No tasks Here!</p>
  </div>
</template>

<style scoped lang="scss">
.empty-state-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 130px);
  color: var(--foreground-primary);
  font-size: 20px;
  gap: 16px;
  .empty-state-container__icon {
    font-size: 48px;
  }
}
</style>