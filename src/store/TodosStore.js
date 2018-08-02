import {
  observable,
  computed,
  action
} from 'mobx';
import { getInitTodos } from './api';

export default class TodosState {
  @observable todos = [];
  @observable loadingTodos = false;

  constructor(initialState) {
    Object.assign(this, initialState);
  }

  @computed get doneCount() {
    return this.todos.filter(v => v.isDone).length;
  }

  @computed get count() {
    return this.todos.slice(0).length;
  }

  @computed get allChecked() {
    return this.todos.every(v => v.isDone);
  }

  @action
  async getInitTodos() {
    if (!this.loadingTodos) {
      this.loadingTodos = true;
      const initTodos = await getInitTodos();
      this.loadingTodos = false;
      this.todos = initTodos;
    }
  }

  @action addTodo = text => {
    this.todos.push({
      text,
      isDone: false
    })
  }
  @action clearDone = () => {
    this.todos = this.todos.filter(v => !v.isDone);
  }
  @action deleteTodo = index => {
    this.todos = this.todos.filter((v, i) => i !== index);
  }
  @action changeTodoState = (index, allCheckedFlag) => {
    this.todos = this.todos.map((v, i) => {
      if(allCheckedFlag) {
        v.isDone = allCheckedFlag === 2 ? false : true;
      } else if(i === index){
        v.isDone = !v.isDone;
      }
      return v;
    });
  }
}
