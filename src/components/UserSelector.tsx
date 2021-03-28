import React from "react";
import useUsers from "../utils/useUsers";
import IdSelector from "./IdSelector";

export default function UserSelector(
  props: React.ComponentProps<typeof IdSelector>
) {
  const { data: users } = useUsers();
  return <IdSelector {...props} options={users || []} />;
}
