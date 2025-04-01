import { formatCurrency } from "../helpers";
import type { Expense } from "../types";

type ExpenseDetailsProps = {
  expense: Expense;
};
export default function ExpenseDetails({ expense }: ExpenseDetailsProps) {
  return (
    <div>
      {expense.expenseName}- {formatCurrency(expense.amount)}
    </div>
  );
}
