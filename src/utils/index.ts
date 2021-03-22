import { useState, useEffect } from "react";
import {} from "../views/ProjectList/type";

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: Function) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useArray = <T>(initialValue: T[]) => {
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
