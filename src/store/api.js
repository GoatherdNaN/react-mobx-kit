import { generateUUID } from '../utils/commons';

export function getInitTodos() {
  return new Promise(resolve => {
    const randomDelay = Math.round(Math.max(Math.random() * 2000, 500));

    setTimeout(() => {
      const result = [
        {
          id: generateUUID(),
          text: 'webpack4从0搭建',
          isDone: true,
        },
        {
          id: generateUUID(),
          text: 'Mobx引入并实现Todos',
          isDone: true,
        },
        {
          id: generateUUID(),
          text: 'React SSR',
          isDone: false,
        },
        {
          id: generateUUID(),
          text: '加入jsLint',
          isDone: false,
        },
      ];
      resolve(result);
    }, randomDelay);
  });
}
