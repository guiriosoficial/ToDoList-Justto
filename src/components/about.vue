<template>
  <div class="overflow">
    <p>
      Hello, I'm Guilherme Rios, 21 years old and this is my first application with Vue.JS.<br>
      This 'TODO List' was my challenge for an internship at JUSTTO.<br>
      Yes, I got the job.
    </p>
    <router-link to="/" class="btn-return">
      <i class="fas fa-arrow-left" />
      &nbsp; RETURN
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
/* ====== TEXT BOX ====== */
.overflow {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}

p {
  margin: 20px 30px 0px 30px;
  font-family: cursive;
  font-size: 2em;
  color: #ccc;
  text-align: center;
}
br {
  line-height: 2em;
}
/* ==== END TEXT BOX ==== */

/* === RETURN BUTTON === */
.btn-return {
  margin-top: 38px;
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
