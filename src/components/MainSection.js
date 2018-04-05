import React, { Component } from "react";
import { Layout } from "antd";
import TodoTextInput from "./TodoTextInput";
import TodoItem from "./TodoItem";
import AppFooter from "./AppFooter";
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from "../constants/TodoFilters";

const { Content } = Layout;

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

export default class MainSection extends Component {
  state = { filter: SHOW_ALL };

  handleClearCompleted = () => {
    this.props.actions.clearCompleted()
  }

  handleSave = text => {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  };

  handleClearCompleted = () => {
    this.props.actions.clearCompleted();
  };

  handleShow = filter => {
    this.setState({ filter });
  };

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props;
    if (todos.length > 0) {
      return (
        <span>
          <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todos.length}
          />
          <label onClick={actions.completeAll} />
        </span>
      );
    }
  }

  renderFooter(completedCount) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <AppFooter
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted}
          onShow={this.handleShow}
        />
      );
    }
  }

  render() {
    const { todos, actions } = this.props;
    const { filter } = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce(
      (count, todo) => (todo.completed ? count + 1 : count), 0
    );

    return (
      <Content className="main">
        <TodoTextInput
          newTodo
          onSave={this.handleSave}
          placeholder="What needs to be done?"
        />
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              {...actions}
            />
          ))}
        </ul>
        {this.renderFooter(completedCount)}
      </Content>
    );
  }
}
