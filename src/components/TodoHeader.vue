<template>
  <header class="header">
    <div class="logo">
      <h1>TODO List</h1>
    </div>
    <router-link :to="link" class="nav">
      {{ title }}
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'TodoHeader',
  props: {
    title: {
      type: String,
      default: 'SOBRE',
      required: true
    }
  },
  computed: {
    link () {
      return this.title === 'SOBRE' ? '/about' : '/'
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/colors.scss';

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 100%;
  padding: 0 20px;
  font-weight: bold;
  background-color: $--color-primary;
  .logo h1 {
    font-size: 24px;
    color: $--color-white;
  }
  .nav {
    font-size: 16px;
    color: $--color-white;
    background-color: $--color-primary-dark;
    border-radius: 2px;
    padding: 8px 14px;
    transition: .5s ease;
    &:hover {
      background-color: $--color-primary-light;
    }
  }
}
</style>
