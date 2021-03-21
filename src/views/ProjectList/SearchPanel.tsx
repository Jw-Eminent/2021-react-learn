import React from "react";
import { Input, Select } from "antd";
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

  const handleSelect: (value: string) => void = (value) => {
    setParam({
      ...param,
      personId: value,
    });
  };

  return (
    <>
      <Input value={param.name} onChange={handleInput} />
      <Select value={param.personId} onChange={handleSelect}>
        <Select.Option value="">负责人</Select.Option>
        {users.map((user) => (
          <Select.Option value={user.id} key={user.id}>
            {user.name}
          </Select.Option>
        ))}
      </Select>
    </>
  );
};
