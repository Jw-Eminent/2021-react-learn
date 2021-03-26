/* @jsxImportSource @emotion/react */
import React from "react";
import { Input, Select, Form } from "antd";
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
    <Form layout="inline" css={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input value={param.name} onChange={handleInput} placeholder="项目名" />
      </Form.Item>
      <Form.Item>
        <Select value={String(param.personId)} onChange={handleSelect}>
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => (
            <Select.Option value={String(user.id)} key={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
