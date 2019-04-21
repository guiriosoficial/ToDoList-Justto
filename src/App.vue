<template>
  <div class="container">
    <div class="center">
      <todoBar />
      <main class="view">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import todoBar from './components/todoBar'

export default {
  name: 'App',
  components: {
    todoBar
  }
}
</script>

<style>
/* ===== CSS RESET ===== */
* {
  border: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
/* === END CSS RESET === */

/* ===== BODY DISPLAY ===== */
body {
  background-color: aliceblue;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.center {
  width: 50vw;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0px 0px 15px 0px rgba(163,163,163,1);
  border-radius: 12px;
}

.view {
  height: 70vh;
  border-top: none;
  border-radius: 0px 0px 12px 12px;
  background-color: #fff;
}
/* === END BODY DISPLAY === */

/* ===== MEDIA SCREEN ===== */
@media screen and (max-width: 1024px){
  .center {
    width: 100vw;
    top: 0;
    transform: translateY(0);
  }
  .view{
    height: calc(100vh - 70px);
    border-radius: 0px 0px 0px 0px;
    border: none;
  }
}
/* === END MEDIA SCREEN === */

/* ===== SCROLL BAR ===== */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track-piece {
  background-color: #eee;
  border-radius: 5px;
  margin: 4px;
}

::-webkit-scrollbar-thumb:vertical {
  background-color: rgba(0, 132, 255, 0.5);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:vertical:hover {
  background-color: rgb(0, 132, 255);
  transition: 0.2s ease;
}
/* === END SCROLL BAR === */
</style>
