import TableStore from './TableStore';
import LoginStore from './LoginStore';

const AllStores = {
  TableStore,
  LoginStore,
};

export default function createStoresFromState(state={}) {
  const createdStores = {};
  Object.keys(AllStores).forEach(value => {
    createdStores[value.replace(/^\S/, s => s.toLowerCase())] = new AllStores[value](state[value]);
  });
  return createdStores;
}
