<template>
  <div class="hello">
    <i class="fas fa-arrow-up" />
    <p>You can insert your tasks here</p>
  </div>
</template>

<script>
export default {
  name: 'Hello'
}
</script>

<style scoped>
/* ====== TEXT BOX ====== */

.hello {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 3em;
  color: #ccc;
  font-family: cursive;
}

p {
  margin-top: 40px;
}

.fas {
  font-size: 2.5em;
}
/* ==== END TEXT BOX ==== */
</style>
