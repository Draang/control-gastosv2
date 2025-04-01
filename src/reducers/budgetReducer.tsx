import { v4 as uuidv4 } from "uuid";
import type { DraftExpense, Expense } from "../types";
export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "add-expense"; payload: { expense: DraftExpense } };
export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
};
export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expenses: [],
};
const formatExpense = (newExpense: DraftExpense): Expense => {
  return { ...newExpense, id: uuidv4() };
};
export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  switch (action.type) {
    case "add-budget":
      return { ...state, budget: action.payload.budget };
    case "show-modal":
      return { ...state, modal: !state.modal };
    case "add-expense": {
      const expense = formatExpense(action.payload.expense);
      return { ...state, expenses: [...state.expenses, expense] };
    }
    default:
      return state;
  }
};
