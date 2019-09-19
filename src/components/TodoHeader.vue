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
  data () {
    return {
      title: 'SOBRE',
      link: '/about'
    }
  },
  computed: {
    currentRoute () {
      return this.$route.path
    }
  },
  watch: {
    currentRoute: function () {
      if (this.currentRoute === '/') {
        this.title = 'SOBRE'
        this.link = '/about'
      } else {
        this.title = 'VOLTAR'
        this.link = '/'
      }
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
  padding: 0 20px;
  font-weight: bold;
  background-color: $--color-primary;
  .nav {
    background-color: $--color-primary-30;
    border-radius: 2px;
    padding: 6px 14px;
    cursor: pointer;
    color: white;
    &:hover {
      background-color: $--color-primary-40;
    }
  }
}
</style>
