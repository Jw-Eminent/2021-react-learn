/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useAsync, useHttp } from "utils";
import { Project, User } from "../../types/projectList";

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const request = useHttp();

  useEffect(() => {
    run(request("/projects", { data: cleanObject(param || {}) }));
  }, [param]);

  return result;
};

export const useUsers = (param?: Partial<User>) => {
  const request = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(request("/users"));
  }, [param]);

  return result;
};
