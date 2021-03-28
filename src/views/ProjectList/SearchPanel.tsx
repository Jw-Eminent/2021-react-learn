/* @jsxImportSource @emotion/react */
import React from "react";
import { Input, Form } from "antd";
import IdSelector from "../../components/IdSelector";
import { SearchPanelProps } from "../../types/projectList";

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  const handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event
  ) => {
    setParam({
      ...param,
      name: event.target.value,
    });
  };

  const handleSelect: (value?: number) => void = (value) => {
    setParam({
      ...param,
      personId: value || 0,
    });
  };

  return (
    <Form layout="inline" css={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input value={param.name} onChange={handleInput} placeholder="项目名" />
      </Form.Item>
      <Form.Item>
        <IdSelector
          value={param.personId}
          defaultOptionName="负责人"
          options={users.map((u) => ({ name: u.name, id: u.id }))}
          onChange={handleSelect}
        />
      </Form.Item>
    </Form>
  );
};
