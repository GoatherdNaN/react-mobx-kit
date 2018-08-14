import React from 'react';
import { Spin } from 'antd';
import TodoItem from './TodoItem';
import styles from '../containers/Todos/index.less';

export default class TodoMain extends React.Component {
  // 遍历显示任务，转发props
  render() {
    return (
      <Spin spinning={this.props.loading} tip="Loading..." size="large">
        <ul className={styles['todo-list']}>
          {this.props.todos.length ? (
            this.props.todos.map((todo, index) => (
              <TodoItem key={todo.id} {...todo} index={index} {...this.props} />
            ))
          ) : (
            <li>No Data</li>
          )}
        </ul>
      </Spin>
    );
  }
}
