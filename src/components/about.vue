<template>
  <div class="overflow">

    <p>Hello, I'm Guilherme Rios, 20 years old and this is my 'TODO List' made for a stage test at JUSTTO.</p>
    <p>I'm Formed in Computer Network Technician from SENAI, and now, I study Computer Science at Bilac College.</p>
    <p>I have 8 months experience as Web Designer and now I'm fetchin to grow up like a Front-end Developer.</p>

    <div class="btn-center">
      <router-link to="/taskList" class="btn-return"><i class="fas fa-arrow-left" /> &nbsp; RETURN</router-link>
    </div>

  </div>
</template>

<script>
// === EXPORT DEFAULT === //
export default {
  name: 'about'
}
// = END EXPORT DEFAULT = //
</script>

<style scoped>
/* ====== TEXT BOX ====== */
.overflow {
  height: 100%;
  overflow-y: auto;
}

p {
  margin: 20px 30px 0px 30px;
  font-family: cursive;
  font-size: 2em;
  color: #ccc;
  text-align: center;
  line-height: 1.3em;
}
/* ==== END TEXT BOX ==== */

/* === RETURN BUTTON === */
.btn-center {
  display: flex;
  justify-content: center;
  margin: 26px auto;
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
