<template>
  <div id="App">
    <todo-header />
    <router-view class="center" />
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
.center {
  height: 100vh;
  width: 100vw;
  /*display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;*/
  /*box-shadow: 0px 0px 15px 0px rgba(163,163,163,1);*/
}
</style>
