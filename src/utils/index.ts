import { useState, useEffect, useRef } from "react";
import useAsync from "./useAsync";
import useHttp from "./http";

const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

const useMount = (callback: Function) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

const useArray = <T>(initialValue: T[]) => {
  const [value, setValue] = useState(initialValue);

  const clear = () => {
    setValue([]);
  };

  const removeIndex = (index: number): void => {
    const temp = [...value];
    temp.splice(index, 1);
    setValue(temp);
  };

  const add = (item: T) => {
    setValue([...value, item]);
  };

  return {
    value,
    add,
    removeIndex,
    clear,
  };
};

const useDocumentTitle = (title: string, keepUnmount: boolean = true) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepUnmount, oldTitle]);
};

const resetRoute = () => (window.location.href = window.location.origin);

export {
  useHttp,
  useAsync,
  cleanObject,
  useMount,
  useDebounce,
  useArray,
  useDocumentTitle,
  resetRoute,
};
