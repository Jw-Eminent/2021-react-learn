import React from "react";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjectSearchParams } from "./hooks";
import styled from "@emotion/styled";
import { useProjects } from "utils/projects";
import useUsers from "utils/useUsers";

const ProjectList = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectSearchParams();
  const { isLoading, data: list, retry } = useProjects(useDebounce(param, 500));
  const { data: users } = useUsers();
  return (
    <Coptainer>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <List
        dataSource={list || []}
        users={users || []}
        loading={isLoading}
        refresh={retry}
      />
    </Coptainer>
  );
};

export default ProjectList;

ProjectList.whyDidYouRender = false; // 使用whyDidYouRender 追踪组件每次渲染的原因

const Coptainer = styled.div`
  padding: 3.2rem;
`;
