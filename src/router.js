import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login.vue';
import Home from '@/components/Home.vue';


Vue.use(Router);

const router = new Router ({
    mode: "history",
    routes: [
        { path: "/login", component: Login },
        { 
            path: "/home",
            component: Home,
            meta: {requireAuth: true}
        },
    ]
});

//Intercepta a navegação caso nao logado
router.beforeEach((to, from, next) =>{
  const usuarioLogado = localStorage.getItem('dado-usuario-logado');
   
   //Valida se a rota solicitada estar logado e se possui dados de login
   if(to.matched.some(record => record.meta.requireAuth) && !usuarioLogado)
    {
     //Se a rota exige autenticaçao e nao há usuario logado, redireciona para login
    next('/login');
   }
   //Segue a vida
   next();
})

export default router;