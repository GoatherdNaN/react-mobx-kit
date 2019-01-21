import TableStore from 'pages/Table/store';
import LoginStore from './LoginStore';

const AllStores = {
  TableStore,
  LoginStore,
};

export default function createStoresFromState() {
  const createdStores = {};
  Object.keys(AllStores).forEach(value => {
    createdStores[value.replace(/^\S/, s => s.toLowerCase())] = new AllStores[value]();
  });
  return createdStores;
}
