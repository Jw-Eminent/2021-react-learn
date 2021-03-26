/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dropdown, Menu, Button } from "antd";
import { Navigate, Routes, Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "@emotion/styled";
import ProjectList from "views/ProjectList";
import Project from "views/Project";
import { useAuth } from "context/authContext";
import { Row } from "./components/lib";
import { ReactComponent as Logo } from "./assets/software-logo.svg";
import { resetRoute } from "utils";

export default function AuthenticatedApp() {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Router>
          <Routes>
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:projectId/*" element={<Project />} />
            <Navigate to="/projects" />
          </Routes>
        </Router>
      </Main>
    </Container>
  );
}

const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between>
      <HeaderLeft gap>
        <LogoBtn onClick={resetRoute} type="link">
          <Logo width="18rem" color="rgb(38, 132, 255)" />
        </LogoBtn>
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item key="logout">
                <a onClick={logout}>登出</a>
              </Menu.Item>
            </Menu>
          }
        >
          <a onClick={(e) => e.preventDefault()}>Hi, {user?.name}</a>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main``;

const LogoBtn = styled(Button)`
  padding: 0;
`;
