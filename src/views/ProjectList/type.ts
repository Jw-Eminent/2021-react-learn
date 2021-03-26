export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export interface Project {
  id: number;
  name: string;
  personId: number | string;
  pin: boolean;
  organization: string;
  created: number;
}

export interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: number | string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}
