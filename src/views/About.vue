<template>
  <div class="about-container">
    <p>Sou Guilherme Rios, 21 anos, e este foi meu desafio para estágio na Justto, minha primeira aplicação em Vue.js</p>
    <p>O desafio consiste em criar uma a <b>TODO List</b> usando Vue.js com Webpack, em que o usuário possa inserir e remover tarefas da lista.</p>
    <p>A edição de tarefas e a criação da tela 'Sobre', utilizando o vue-router foram os bônus propostos para o desafio.</p>
    <p><b>Nota:</b> Sim, eu consegui a vaga :D.</p>
    <router-link to="/" class="link">
      <i class="fas fa-arrow-left" />
      <span><b>Voltar</b></span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';

.about-container {
  margin-top: -70px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
}

p {
  margin: 0 100px;
  text-align: center;
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
    font-size: 18px;
  }
}

</style>
