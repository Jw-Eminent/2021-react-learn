/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Project } from "types/projectList";
import { cleanObject } from "utils";
import { useAsync, useHttp } from "utils";

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const request = useHttp();
  const fetchProjects = () =>
    request("/projects", { data: cleanObject(param || {}) });

  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
  }, [param]);

  return result;
};

export const useEditProject = () => {
  const { run, ...result } = useAsync();
  const request = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      request(`/projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };

  return {
    mutate,
    ...result,
  };
};

export const useAddProject = () => {
  const { run, ...result } = useAsync();
  const request = useHttp();
  const mutate = (params: Partial<Project>) => {
    run(
      request(`/project/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };

  return {
    mutate,
    ...result,
  };
};
