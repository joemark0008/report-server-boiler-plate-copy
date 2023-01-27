import { createContext } from "react";
import { UserEmployee } from "../../utility/interfaces";

export const NULLACCOUNT: UserEmployee = {
  id: "",
  username: "",
  email: "",
  role: ["USER"],
  updatedAt: "",
  createdAt: "",
  employee: {
    id: "",
    firstName: "",
    lastName: "",
    middleName: "",
    clinicId: "",
  },
};

export const AccountContext = createContext(NULLACCOUNT);

export const AccountProvider = AccountContext.Provider;
export const AccountConsumer = AccountContext.Consumer;
