import React from "react";
import { Link } from "react-router-dom";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Project, User } from "../../types/projectList";
interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      {...props}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render: (name, project) => (
            <Link to={String(project.id)}>{name}</Link>
          ),
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
