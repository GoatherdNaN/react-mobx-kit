import LoginStore from './LoginStore';
import RouterStore from './RouterStore'
import TableStore from 'pages/Table/store';

const AllStores = {
  TableStore,
  RouterStore,
  LoginStore,
};

export default function createStoresFromState() {
  const createdStores = {};
  Object.keys(AllStores).forEach(value => {
    createdStores[value.replace(/^\S/, s => s.toLowerCase())] = new AllStores[value]();
  });
  return createdStores;
}
