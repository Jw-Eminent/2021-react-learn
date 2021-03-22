/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import ProjectList from "views/ProjectList";
import { useAuth } from "context/authContext";
import { Row } from "./components/lib";
import { ReactComponent as Logo } from "./assets/software-logo.svg";

export default function AuthenticatedApp() {
  const { logout, user } = useAuth();
  return (
    <Container>
      <Header between>
        <HeaderLeft gap>
          <Logo width="18rem" color="rgb(38, 132, 255)" />
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
      <Main>
        <ProjectList />
      </Main>
    </Container>
  );
}

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

const HeaderListItem = styled.h3``;

const HeaderRight = styled.div``;

const Main = styled.main``;
