<template>
  <header class="header">
    <div class="logo">
      <h1>TODO List</h1>
      <div class="details">
        <span>Total: {{ counter.total }} &nbsp;</span>
        <span>Feitas: {{ counter.done }} &nbsp;</span>
        <span>Restantes: {{ counter.doing }} &nbsp;</span>
      </div>
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
    },
    counter: {
      type: Object,
      required: true,
      default: () => ({
        doing: 0,
        done: 0,
        total: 0
      })
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
  .details {
    font-size: 14px;
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
