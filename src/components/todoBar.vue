<template>
  <header>
    <div class="logo">
      &#x2713; TODO List
    </div>
    <nav class="navigation">
      <router-link to="/about" class="btn-about">
        ABOUT
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'TodoBar'
}
</script>

<style scoped>
/* ==== HEADER BOX ==== */
header {
  height: 70px;
  width: 100%;
  background-color: #0084ff;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 26px;
  font-weight: bold;
  border-radius: 12px 12px 0px 0px;
}
/* == END HEADER BOX == */

/* ====== LOGO ====== */
.logo {
  float: left;
  margin: 20px;
}
/* ==== END LOGO ==== */

/* ==== MENU BUTTON ==== */
.navigation {
  float: right;
  margin: 20px;
  overflow: initial;
}

.btn-about {
  text-decoration: none;
  color: #fff;
  background-color: #1c75db;
  padding: 8px 16px;
  border-radius: 6px;
  transition: 0.2s ease-in-out;
}

.btn-about:hover {
  background-color: #1764bd;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
/* == END MENU BUTTON == */

/* ==== MEDIA SCREEN ==== */
@media screen and (max-width: 1024px){
  header {
    border-radius: 0px 0px 0px 0px;
  }
}

@media screen and (max-width: 360px){
  header {
    border-radius: 0px 0px 0px 0px;
    font-size: 20px;
  }
  .logo {
    float: left;
    margin: 23px 0px 23px 16px;
  }
  .navigation {
    margin: 23px 16px 23px 0px;
  }
}
/* == END MEDIA SCREEN == */
</style>
