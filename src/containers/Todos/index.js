import React from 'react';
import {inject, observer} from 'mobx-react';
import TodoHeader from '../../components/TodoHeader';
import TodoMain from '../../components/TodoMain';
import TodoFooter from '../../components/TodoFooter';

import styles from './index.less';
import TodosStore from '../../store/TodosStore';
const todosStore = new TodosStore();

@inject('todosStore')
@observer
export default class TodoApp extends React.Component {
  componentWillMount() {
    this.props.todosStore.getInitTodos();
  }
  render() {
    const { count, todos, deleteTodo, clearDone, changeTodoState, addTodo, allChecked, doneCount } = this.props.todosStore;
    return (
      <div className={styles.panel}>
        <h1>TODOS: {count}</h1>
        <TodoHeader addTodo={addTodo}/>
        <TodoMain
          deleteTodo={deleteTodo}
          todos={todos}
          changeTodoState={changeTodoState}
        />
        <TodoFooter
          allChecked={allChecked}
          doneCount={doneCount}
          clearDone={clearDone}
          changeTodoState={changeTodoState}
        />
      </div>
    )
  }
}
