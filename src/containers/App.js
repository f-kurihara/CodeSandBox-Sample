import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import AppHeader from '../components/AppHeader';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions';
import 'antd/dist/antd.css';

const App = ({ todos, actions }) => (
  <Layout className='layout'>
    <AppHeader />
    <MainSection
      addTodo={actions.addTodo}
      todos={todos}
      actions={actions}
    />
  </Layout>
);

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
