/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { User } from "types/projectList";
import { useAsync, useHttp } from "utils";

const useUsers = (param?: Partial<User>) => {
  const request = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(request("/users"));
  }, [param]);

  return result;
};

export default useUsers;
