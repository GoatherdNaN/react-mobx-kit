export function getInitTodos() {
  return new Promise((resolve) => {
    const randomDelay = Math.round(Math.max(Math.random() * 2000, 500));

    setTimeout(() => {
      const result = [
        {
          text: 'webpack4从0搭建',
          isDone: true
        },
        {
          text: 'Mobx引入并实现Todos',
          isDone: true
        },
        {
          text: 'React SSR',
          isDone: false
        },
        {
          text: '加入jsLint',
          isDone: false
        },
      ];
      resolve(result);
    }, randomDelay);
  });
}
