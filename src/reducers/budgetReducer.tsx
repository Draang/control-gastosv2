import { v4 as uuidv4 } from "uuid";
import type { DraftExpense, Expense } from "../types";
export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "close-modal" }
  | { type: "add-expense"; payload: { expense: DraftExpense } }
  | { type: "edit-expense"; payload: { expense: Expense } }
  | { type: "delete-expense"; payload: { expenseId: Expense["id"] } }
  | { type: "get-expense-by-id"; payload: { expenseId: Expense["id"] } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
};
const initialBudget = (): number => {
  const budget = localStorage.getItem("budget");
  return budget ? +budget : 0;
};
const initialExpenses = (): Expense[] => {
  const expenses = localStorage.getItem("expenses");
  return expenses ? JSON.parse(expenses) : [];
};
export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: initialExpenses(),
  editingId: "",
};
const formatExpense = (newExpense: DraftExpense): Expense => {
  return { ...newExpense, id: uuidv4() };
};
export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
): BudgetState => {
  switch (action.type) {
    case "add-budget":
      return { ...state, budget: action.payload.budget };
    case "show-modal":
      return { ...state, modal: true };
    case "close-modal":
      return { ...state, modal: false, editingId: "" };
    case "add-expense": {
      const expense = formatExpense(action.payload.expense);
      return {
        ...state,
        expenses: [...state.expenses, expense],
        modal: false,
      };
    }
    case "edit-expense": {
      const expenses = state.expenses.map((expense) =>
        expense.id === state.editingId ? action.payload.expense : expense
      );
      return { ...state, expenses, editingId: "", modal: false };
    }
    case "delete-expense": {
      const updateExpenses = state.expenses.filter(
        (ex) => ex.id !== action.payload.expenseId
      );
      return { ...state, expenses: updateExpenses };
    }
    case "get-expense-by-id":
      return { ...state, editingId: action.payload.expenseId, modal: true };
    default:
      return state;
  }
};
