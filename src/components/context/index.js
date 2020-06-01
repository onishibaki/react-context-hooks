import { createContext, useContext } from "react";

export const EmployeesContext = createContext();

export const useEmployeeState = () => useContext(EmployeesContext);
