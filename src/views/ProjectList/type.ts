export interface User {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: number;
}

export interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}

export interface ListProps {
  list: Project[];
  users: User[];
}
