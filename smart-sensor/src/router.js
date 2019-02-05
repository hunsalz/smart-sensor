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
    
    // verify if auth is required
    if (to.matched.some(record => record.meta.authRequired)) {
        // route to target if authentication is done
        if (store.state.authenticated) {
            next();
        // otherwise route to login
        } else {
            next({
                name: 'login'
            });
        }
    // if no auth is required ...
    } else {
        // redirect to overview if authentication is already done
        if (to.name === 'login' && store.state.authenticated) {
            next({
                name: 'overview'
            });
        // otherwise move on to routes that do not require authentication
        } else {
            next();
        }
    }
});

export default router;