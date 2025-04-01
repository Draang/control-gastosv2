import { ChangeEvent, FormEvent, useState } from "react";
import type { DraftExpense, ValueDate } from "../types";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { categories } from "../data/categories";
import ErrorMessage from "./ErrorMessage";
import useBudget from "../hooks/useBudget";
const INITIAL_EXPENSE = {
  amount: 0,
  expenseName: "",
  category: "",
  date: new Date(),
};
export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>(INITIAL_EXPENSE);
  const { dispatch } = useBudget();
  const [error, setError] = useState("");
  function handleChangeDate(e: ValueDate) {
    setExpense({ ...expense, date: e });
  }
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    const { name, value } = event.target;
    console.log(event.target);
    const isNumber = name == "amount";
    if (isNumber) {
      console.log({
        ...expense,
        [name]: isNumber ? +value : value,
      });
    }
    setExpense({
      ...expense,
      [name]: isNumber ? +value : value,
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    //validar
    if (Object.values(expense).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");

    dispatch({ type: "add-expense", payload: { expense } });
    setExpense(INITIAL_EXPENSE);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-bold border-b-4 border-b-blue-600 py-2">
        Nuevo gastos
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nuevo gasto:
        </label>
        <input
          type="text"
          name="expenseName"
          id="expenseName"
          placeholder="Nombre de gasto"
          className="bg-slate-100 p-2"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          placeholder="Cantidad de gasto ej: 300"
          className="bg-slate-100 p-2"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Cantidad:
        </label>
        <select
          name="category"
          id="amount"
          className="bg-slate-100 p-2"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-----Seleccione----</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Fecha gasto:
        </label>
        <DatePicker
          className={"bg-slate-100 p-2 border-0"}
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>
      <input
        type="submit"
        value="Registrar gasto"
        className="bg-blue-600 cursor-pointer w-full text-white uppercase font-bold rounded-lg p-2"
      />
    </form>
  );
}
