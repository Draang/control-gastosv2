import { useReducer, createContext, Dispatch, ReactNode } from "react";
import type { BudgetActions, BudgetState } from "../reducers/budgetReducer";
import { budgetReducer, initialState } from "../reducers/budgetReducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
};
type BudgetProviderProps = {
  children: ReactNode;
};
export const BudgetContext = createContext<BudgetContextProps>(null!);
export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);
  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};
