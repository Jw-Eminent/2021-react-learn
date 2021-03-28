/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import useQueryParam from "utils/url";

export const useProjectSearchParams = () => {
  const [param, setParam] = useQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};
