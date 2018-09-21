import React from 'react';
import { inject, observer } from 'mobx-react';
import TodoHeader from '../../components/TodoHeader';
import TodoMain from '../../components/TodoMain';
import TodoFooter from '../../components/TodoFooter';
import withWrapError from '../../components/ErrorHandle';


import styles from './index.less';

@withWrapError // 放在最上面
@inject('todosStore')
@observer
export default class TodoApp extends React.Component {
  componentWillMount() {
    this.props.todosStore.getInitTodos();
  }

  render() {
    const {
      count,
      todos,
      deleteTodo,
      clearDone,
      changeTodoState,
      addTodo,
      allChecked,
      doneCount,
      loadingTodos,
    } = this.props.todosStore;
    return (
      <div className={styles.panel}>
        <h1>
          TODOS：
          {count}
        </h1>
        <TodoHeader addTodo={addTodo} />
        <TodoMain
          todos={todos}
          deleteTodo={deleteTodo}
          loading={loadingTodos}
          changeTodoState={changeTodoState}
        />
        <TodoFooter
          allChecked={allChecked}
          doneCount={doneCount}
          clearDone={clearDone}
          changeTodoState={changeTodoState}
        />
      </div>
    );
  }
}
