import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

/**
 * 返回页面url中指定键的参数值
 * @export
 * @template T
 * @param {T[]} key
 */
export default function useQueryParam<T extends string>(keys: T[]) {
  const [searchParams, setSearcnParams] = useSearchParams();

  const params = useMemo(() => {
    return keys.reduce((prev, key) => {
      return { ...prev, [key]: searchParams.get(key) || "" };
    }, {} as { [key in T]: string });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSetSearchParam = (params: Partial<{ [key in T]: unknown }>) => {
    // iterator 迭代器
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearcnParams(o);
  };

  return [params, handleSetSearchParam] as const;
}
