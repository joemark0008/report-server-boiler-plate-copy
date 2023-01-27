export interface Credentials {
  email: string;
  password: string;
}

export interface SubLink {
  label: string;
  link: string;
}

export interface UserEmployee {
  id: string;
  username: string;
  email: string;
  role: string[];
  updatedAt: string;
  createdAt: string;
  employee: Employee;
}

export interface TableProps {
  columns: Col[];
  dataSource: any[];
  loading: boolean;
  minWidth: number;
}

export interface SelectType {
  value: string;
  label: string;
}

//types
type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  clinicId: string;
};

type Col = {
  title: string;
  key: string;
  align?: any;
  dataIndex: string;
  render?: any;
  nowrap?: boolean;
};
