import React from "react";
import { Table } from "antd";
import dayjs from "dayjs";
import { ListProps } from "./type";

export const List = ({ list, users }: ListProps) => {
  return (
    <Table
      dataSource={list}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render: (value, project) => (
            <span>
              {users.find((u) => u.id === project.personId)?.name || "未知"}
            </span>
          ),
        },
        {
          title: "创建时间",
          dataIndex: "created",
          render: (created) => {
            return (
              <span>
                {created ? dayjs(created).format("YYYY-MM-DD") : "未知"}
              </span>
            );
          },
        },
      ]}
      rowKey="name"
      pagination={false}
    />
  );
};
