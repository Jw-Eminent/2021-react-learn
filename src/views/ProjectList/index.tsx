import React, { useState, useEffect } from "react";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import { cleanObject, useDebounce, useMount } from "utils";
import { User, Project } from "./type";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

const ProjectList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [param, setParam] = useState<{ name: string; personId: string }>({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 800);
  const [list, setList] = useState<Project[]>([]);
  const request = useHttp();

  useEffect(() => {
    request("/projects", { data: cleanObject(debouncedParam) }).then(setList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);

  useMount(() => {
    request("/users").then(setUsers);
  });

  return (
    <Coptainer>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </Coptainer>
  );
};

export default ProjectList;

const Coptainer = styled.div`
  padding: 3.2rem;
`;
