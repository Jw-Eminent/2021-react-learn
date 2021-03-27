import React from "react";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjects, useUsers } from "./hooks";
import styled from "@emotion/styled";
import useQueryParam from "utils/url";

const ProjectList = () => {
  const [param, setParam] = useQueryParam(["name", "personId"]);
  const debouncedParam = useDebounce(param, 500);
  const { isLoading, data: list } = useProjects(debouncedParam);
  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);

  return (
    <Coptainer>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Coptainer>
  );
};

export default ProjectList;

ProjectList.whyDidYouRender = false; // 使用whyDidYouRender 追踪组件每次渲染的原因

const Coptainer = styled.div`
  padding: 3.2rem;
`;
