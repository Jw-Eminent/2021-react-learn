import React, { useState, useEffect } from "react";
import * as qs from "qs";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import { cleanObject, useDebounce, useMount } from "utils";
import { User, Project } from "./type";

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [param, setParam] = useState<{ name: string; personId: string }>({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 800);
  const [list, setList] = useState<Project[]>([]);

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (res) => {
      if (res.ok) {
        setList(await res.json());
      }
    });
  }, [debouncedParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  );
};

export default ProjectList;