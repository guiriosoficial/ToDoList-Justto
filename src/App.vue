<template>
  <div id="App">
    <router-view />
  </div>
</template>

<script>
import TodoHeader from '@/components/TodoHeader'

export default {
  name: 'App',
  components: {
    TodoHeader
  }
}
</script>

<style>
</style>
