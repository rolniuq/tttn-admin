import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LockOutlined,
  SnippetsOutlined,
  UnorderedListOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Switch, useHistory } from "react-router-dom";
import Avatar from "./Avatar";
import { Link } from 'react-router-dom';
import { getTokenLocal, removeUserSession } from '../utils/Common';

const { Header, Sider, Content } = Layout;

const MyLayout = ({ children }: any) => {
  const [token, setToken] = useState<string>();
  const [collapsed, setCollapsed] = useState(false);
  const url = window.location.pathname;
  const history = useHistory();

  useEffect(() => {
    const tokenLocal: any = getTokenLocal();
    setToken(tokenLocal);
  }, []);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleClickLogout = () => {
    removeUserSession();
    history.push("/");
  }

  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Avatar />
        <Menu theme="dark" mode="inline"
          defaultSelectedKeys={url === "/category" ? ["0"] : url === "/order" ? ["1"] : url === "/product" ? ["2"] :
            url === "/statistic" ? ["3"] : ["4"]}
        >
          {
            !token ? (
              <Menu.Item key="4" icon={<LockOutlined />}>
                Đăng nhập
              </Menu.Item>
            ) : (
              <>
                <Menu.Item key="0" icon={<MenuUnfoldOutlined />}>
                  <Link to="/category">Danh mục</Link>
                </Menu.Item>
                <Menu.Item key="1" icon={<SnippetsOutlined />}>
                  <Link to="/order">Đơn hàng</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                  <Link to="/product">Sản phẩm</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<BarChartOutlined />}>
                  <Link to="statistic">Thống kê</Link>
                </Menu.Item>
                <Menu.Item icon={<LogoutOutlined />} onClick={handleClickLogout}>
                  <Link to="statistic">Đăng xuất</Link>
                </Menu.Item>
              </>
            )
          }
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            {children}
          </Switch>
        </Content>
      </Layout>
    </>
  )
}

export default MyLayout
