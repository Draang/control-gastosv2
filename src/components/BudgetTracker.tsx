import { useMemo } from "react";
import useBudget from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";

export default function BudgetTracker() {
  const { state } = useBudget();
  const totalExpense = useMemo(
    () => state.expenses.reduce((total, current) => total + current.amount, 0),
    [state.expenses]
  );
  const totalAvailable = useMemo(
    () => state.budget - totalExpense,
    [totalExpense, state.budget]
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <img src="/grafico.jpg" alt="grafica" />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full text-white uppercase font-bold rounded-lg"
        >
          Resetear app
        </button>
        <AmountDisplay label="Presupuesto" amount={state.budget} />
        <AmountDisplay label="Disponible" amount={totalAvailable} />
        <AmountDisplay label="Gastado" amount={totalExpense} />
      </div>
    </div>
  );
}
