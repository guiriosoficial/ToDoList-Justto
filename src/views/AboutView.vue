<template>
  <div class="about-container">
    <p>I'm Guilherme Rios, 21 years old, and it was my challenge for an internship job at Justto, my first application on Vue.js.</p>
    <p>The challenge is create a <b>TODO List</b> using Vue.js with Webpack, where the user can insert, edit and remove tasks from list.</p>
    <p>Create an "About" page using vue-router was the proposed bonus for the challenge.</p>
    <p><b>Note:</b> Yes, I got the job :D.</p>
    <RouterLink
      to="/"
      class="about-container__link"
    >
      <FontAwesomeIcon icon="arrow-left" />
      <span>
        <b>Back</b>
      </span>
    </RouterLink>
    <span class="about-container__credits">
      Made with &hearts; by
      <a
        href="https://github.com/guiriosoficial"
        target="_blank"
      >
        guiriosoficial
      </a>
    </span>
  </div>
</template>

<style scoped lang="scss">
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
    color: var(--foreground-primary);
    word-wrap: break-word;
    &:last-of-type {
      margin-top: 8px;
    }
  }
  .about-container__link {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 22px;
    font-size: 18px;
    color: var(--brand-primary);
  }
  .about-container__credits {
    transform: translateX(-50%);
    position: absolute;
    bottom: 20px;
    left: 50%;
    text-align: center;
    color: var(--foreground-primary);
    a {
      color: var(--foreground-primary);
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
