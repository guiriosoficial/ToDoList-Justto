<template>
  <header class="header">
    <div class="logo">
      <h1>TODO List</h1>
      <div class="details">
        <span>Total: {{ counter.total }} &nbsp;</span>
        <span>Done: {{ counter.done }} &nbsp;</span>
        <span>Left: {{ counter.doing }} &nbsp;</span>
      </div>
    </div>
    <RouterLink
      :to="link"
      class="nav"
    >
      {{ title }}
    </RouterLink>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'ABOUT'
    },
    counter: {
      type: Object,
      default: () => ({
        doing: 0,
        done: 0,
        total: 0
      })
    }
  },
  computed: {
    link () {
      return this.title === 'ABOUT' ? '/about' : '/'
    }
  }
}
</script>

<style scoped lang="scss">
@use "../assets/colors";

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 100%;
  padding: 0 20px;
  font-weight: bold;
  background-color: colors.$color-primary;
  .logo h1 {
    font-size: 24px;
    color: colors.$color-white;
  }
  .details {
    font-size: 14px;
    color: colors.$color-white;
  }
  .nav {
    font-size: 16px;
    color: colors.$color-white;
    background-color: colors.$color-primary-dark;
    border-radius: 2px;
    padding: 8px 14px;
    transition: .5s ease;
    &:hover {
      background-color: colors.$color-primary-light;
    }
  }
}
</style>
