import { useMemo } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import useBudget from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import "react-circular-progressbar/dist/styles.css";
export default function BudgetTracker() {
  const { state, dispatch } = useBudget();
  const totalExpense = useMemo(
    () => state.expenses.reduce((total, current) => total + current.amount, 0),
    [state.expenses]
  );
  const totalAvailable = useMemo(
    () => state.budget - totalExpense,
    [totalExpense, state.budget]
  );
  const percentage = useMemo(
    () => (totalExpense * 100) / state.budget,
    [state.budget, totalExpense]
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex flex-col justify-center items-center gap-y-2">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: percentage >= 100 ? "#dc2626" : "#3b82f6",
            trailColor: "#f5f5f5",
            textSize: 15,
            textColor: percentage >= 100 ? "#dc2626" : "#3b82f6",
          })}
          text={`${percentage.toFixed(2)}%`}
        />
        {percentage >= 100 && (
          <p className="text-2xl text-red-700 font-black">
            Exediste tu presupuesto
          </p>
        )}
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full text-white uppercase font-bold rounded-lg cursor-pointer"
          onClick={() => dispatch({ type: "reset" })}
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
