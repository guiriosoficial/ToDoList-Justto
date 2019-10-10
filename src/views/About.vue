<template>
  <div>
    <todo-header title="BACK" />
    <div class="about-container">
      <p>I'm Guilherme Rios, 21 years old, and it was my challenge for an internship job at Justto, my first application on Vue.js.</p>
      <p>The challenge is create a <b>TODO List</b> using Vue.js with Webpack, where the user can insert, edit and remove tasks from list.</p>
      <p>Create an "About" page using vue-router was the proposed bonus for the challenge.</p>
      <p><b>Note:</b> Yes, I got the job :D.</p>
      <router-link to="/" class="link">
        <i class="fas fa-arrow-left" />
        <span><b>Back</b></span>
      </router-link>
      <span class="credits">
        Made with &hearts; by <a href="http://github.com/riwersxd" target="_blank">riwersxd</a>
      </span>
    </div>
  </div>
</template>

<script>
import TodoHeader from '@/components/TodoHeader'

export default {
  name: 'About',
  components: {
    TodoHeader
  }
}
</script>

<style lang="scss">
@import '@/styles/colors.scss';

.about-container {
  height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  p {
    margin: 0 100px;
    font-size: 22px;
    text-align: center;
    color: $--color-text-primary;
    word-wrap: break-word;
    &:last-of-type {
      margin-top: 8px;
    }
  }
  .link {
    margin-top: 22px;
    font-size: 18px;
    color: $--color-primary;
    .fas {
      margin-right: 6px;
      display: inline;
    }
  }
  .credits {
    transform: translateX(-50%);
    position: absolute;
    bottom: 20px;
    left: 50%;
    text-align: center;
    color: $--color-text-primary;
    a {
      color: $--color-text-primary;
      text-decoration: underline
    }
  }
}

@media (max-width: 680px) {
  .about-container p {
    font-size: 18px;
    margin: 0 20px;
  }
}
</style>
