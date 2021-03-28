import React from "react";
import { Link } from "react-router-dom";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Project, User } from "../../types/projectList";
import Pin from "components/Pin";
import { useEditProject } from "utils/projects";
interface ListProps extends TableProps<Project> {
  users: User[];
  refresh: () => void;
}

export const List = ({ users, refresh, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(() => refresh());
  return (
    <Table
      {...props}
      columns={[
        {
          title: <Pin checked disabled />,
          dataIndex: "pin",
          render: (pin, project) => (
            <Pin checked={pin} onCheckedChange={pinProject(project.id)} />
          ),
        },
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
