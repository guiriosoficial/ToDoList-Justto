import Vue from 'vue';
import Router from 'vue-router';

import taskList from '@/components/taskList';
import about from '@/components/about';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: taskList,
    },
    {
      path: '/about',
      component: about,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
