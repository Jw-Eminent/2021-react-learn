import React from "react";
import { Table } from "antd";
import { ListProps } from "./type";

export const List = ({ list, users }: ListProps) => {
  return (
    <Table
      dataSource={list}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          // sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
          title: "负责人",
          render: (value, project) => (
            <span>
              {users.find((u) => u.id === project.personId)?.name || "未知"}
            </span>
          ),
        },
      ]}
      rowKey="name"
      pagination={false}
    />
  );
};
