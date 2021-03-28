/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Project } from "types/projectList";
import { cleanObject } from "utils";
import { useAsync, useHttp } from "utils";

const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const request = useHttp();

  useEffect(() => {
    run(request("/projects", { data: cleanObject(param || {}) }));
  }, [param]);

  return result;
};

export default useProjects;
