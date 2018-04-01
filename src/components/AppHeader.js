import React, { Component } from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

export default class AppHeader extends Component {
  render() {
    return (
      <Header className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">todos</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
    );
  }
}
