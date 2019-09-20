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
  .nav {
    background-color: $--color-primary-30;
    border-radius: 2px;
    padding: 8px 14px;
    color: $--color-white;
    cursor: pointer;
    &:hover {
      background-color: $--color-primary-40;
    }
  }
}
</style>
