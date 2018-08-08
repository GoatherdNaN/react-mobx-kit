import Loadable from 'react-loadable';
import LoadingComponent from './components/LoadingComponent';
import App from './containers/App';

const COMMIT_DELAY = 200;
const AsyncTodos = Loadable({
  loader: () => import('./containers/Todos'),
  loading: LoadingComponent,
  delay: COMMIT_DELAY,
});
const AsyncOther = Loadable({
  loader: () => import('./containers/Other'),
  loading: LoadingComponent,
  delay: COMMIT_DELAY,
});

export default [
  {
    component: App,
    routes: [
      {
        path: '/todos',
        exact: true,
        component: AsyncTodos,
      },
      {
        path: '/other',
        exact: true,
        component: AsyncOther,
      },
    ],
  },
];
