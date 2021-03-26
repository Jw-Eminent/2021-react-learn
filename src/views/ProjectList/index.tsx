import React, { useState } from "react";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjects, useUsers } from "./hooks";
import styled from "@emotion/styled";

const ProjectList = () => {
  const [param, setParam] = useState<{ name: string; personId: string }>({
    name: "",
    personId: "",
  });
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

const Coptainer = styled.div`
  padding: 3.2rem;
`;
