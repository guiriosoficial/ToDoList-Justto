<template>
  <div class="center">
    <div>

      <h1>Error 404</h1>
      <h2>Page Not Found</h2>

      <div class="btn-center">
        <router-link to="/taskList" class="btn-return"><i class="fas fa-arrow-left" /> &nbsp; BACK</router-link>
      </div>

    </div>
  </div>
</template>

<script>
// === EXPORT DEFAULT === //
export default {
  name: 'error404'
}
// = END EXPORT DEFAULT = //
</script>

<style scoped>
/* ====== TEXT BOX ====== */
.center {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1, h2 {
  font-family: cursive;
  font-size: 5.4em;
  color: #ccc;
  text-align: center;
  line-height: 1.2em;
}

h2 {
  font-size: 2.6em;
}
/* ==== END TEXT BOX ==== */

/* === RETURN BUTTON === */
.btn-center {
  display: flex;
  justify-content: center;
  margin-top: 5em;
}

.btn-return {
  text-decoration: none;
  color: #fff;
  background-color: #1c75db;
  padding: 12px 20px;
  border-radius: 8px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 26px;
  font-weight: bold;
  transition: 0.2s ease-in-out;
}

.btn-return:hover {
  background-color: #1764bd;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.fas {
  display: inline;
}
/* = END RETURN BUTTON = */
</style>
