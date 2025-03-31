import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import useBudget from "../hooks/useBudget";

export default function BudgetForm() {
  const { dispatch } = useBudget();
  const [budget, setBudget] = useState(0);
  const isValid = useMemo(() => budget > 0, [budget]);
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setBudget(e.target.valueAsNumber);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    dispatch({ type: "add-budget", payload: { budget } });
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Definir presupuesto
        </label>
        <input
          type="number"
          name="budget"
          id="budget"
          value={budget}
          className="w-full bg-white border border-gray-200 p-2 rounded-lg"
          placeholder="Define tu presupuesto"
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        value="Definir presupuesto"
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer uppercase w-full p-2 text-white font-bold rounded-lg disabled:opacity-30"
        disabled={!isValid}
      />
    </form>
  );
}
