import UserLayout from '@/layouts/UserLayout';
import Login from '@/pages/Login';
import BasicLayout from '@/layouts/BasicLayout';
import Home from '@/pages/Home';
import Users from '@/pages/Users';
import Todos from '@/pages/Todos';

const routerConfig = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/',
        redirect: '/user/login',
      },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/home',
        component: Home,
      },
      {
        path: '/users/:openId',
        component: Todos,
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/todos',
        component: Todos
      },
      {
        path: '/',
        redirect: '/home',
      },
    ],
  },
];
export default routerConfig;
