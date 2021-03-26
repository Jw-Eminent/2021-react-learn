import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Tasks from "views/Tasks";
import Kanban from "../Kanban";

export default function Project() {
  return (
    <div>
      <h2>Project</h2>
      <Link to="kanban">看板</Link>
      <Link to="tasks">任务组</Link>
      <Routes>
        <Route path="kanban" element={<Kanban />} />
        <Route path="tasks" element={<Tasks />} />
        <Navigate to={`${window.location.pathname}/kanban`} />
      </Routes>
    </div>
  );
}
