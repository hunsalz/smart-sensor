import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: {
                name: "login"
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./components/AppLogin.vue'),
        },
        {
            path: '/overview',
            name: 'overview',
            component: () => import('./components/AppOverview.vue'),
            meta: {
                authRequired: true
            }
        },
        {
            path: '*',
            redirect: {
                name: "login"
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired)) {
        if (!store.state.authenticated) {
            next({
                path: '/login'
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;