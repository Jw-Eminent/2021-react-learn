import React from "react";
import { SearchPanelProps } from "./type";

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  const handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event
  ) => {
    setParam({
      ...param,
      name: event.target.value,
    });
  };

  const handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void = (
    event
  ) => {
    setParam({
      ...param,
      personId: event.target.value,
    });
  };

  return (
    <>
      <input value={param.name} onChange={handleInput} />
      <select value={param.personId} onChange={handleSelect}>
        <option value="">负责人</option>
        {users.map((user) => (
          <option value={user.id} key={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </>
  );
};
