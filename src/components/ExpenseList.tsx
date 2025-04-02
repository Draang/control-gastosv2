import { useMemo } from "react";
import useBudget from "../hooks/useBudget";
import ExpenseDetails from "./ExpenseDetails";

export default function ExpenseList() {
  const { state } = useBudget();
  const filterExpenses = useMemo(
    () =>
      state.currentCategory
    ? state.expenses.filter(
      (expense) => expense.category === state.currentCategory
    )
    : state.expenses,
    [state.expenses, state.currentCategory]
  );
  const isEmpty = useMemo(() => filterExpenses.length === 0, [filterExpenses]);
  return (
    <div className="mt-10 shadow-lg bg-white p-5">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold">No hay gastos</p>
      ) : (
        <>
          <p className=" text-gray-600 text-2xl font-bold my-5">
            Listado de gastos
          </p>
          {filterExpenses.map((expense) => (
            <ExpenseDetails key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
}
