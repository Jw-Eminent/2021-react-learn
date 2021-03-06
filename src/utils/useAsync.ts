import { useState } from "react";

interface State<T> {
  error: Error | null;
  data: T | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig: {
  throwError?: boolean;
  needUpdateData?: boolean;
} = {
  throwError: false,
  needUpdateData: true,
};

const useAsync = <T>(
  initialState?: State<T>,
  initialConfig?: typeof defaultConfig
) => {
  const [state, setState] = useState<State<T>>({
    ...defaultInitialState,
    ...initialState,
  });
  const [retry, setRetry] = useState(() => {
    return () => {};
  });

  const config = {
    ...defaultConfig,
    ...initialConfig,
  };

  const setData = (data: T) =>
    setState({
      data,
      stat: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });

  // 触发异步请求
  const run = (
    promise: Promise<T>,
    runConfig?: { retry: () => Promise<T> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }
    setRetry(() => {
      return () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      };
    });

    setState({ ...state, stat: "loading" });
    return promise
      .then((res) => {
        if (config.needUpdateData) {
          setData(res);
        }
        return res;
      })
      .catch((error) => {
        setError(error);
        if (config.throwError) {
          return Promise.reject(error);
        }
        return error;
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    retry,
    setData,
    setError,
    ...state,
  };
};

export default useAsync;
