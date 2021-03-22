import { Button } from "antd";
import styled from "@emotion/styled";
import ProjectList from "views/ProjectList";
import { useAuth } from "context/authContext";
import { Row } from "./components/lib";

export default function AuthenticatedApp() {
  const { logout } = useAuth();
  return (
    <Container>
      <Header between>
        <HeaderLeft gap>
          <h3>Logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Button onClick={logout}>退出登录</Button>
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

const Header = styled(Row)``;

const HeaderLeft = styled(Row)``;

const HeaderListItem = styled.h3``;

const HeaderRight = styled.div``;

const Main = styled.main``;
