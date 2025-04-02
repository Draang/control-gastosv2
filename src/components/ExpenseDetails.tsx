import { useMemo } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import { formatDate } from "../helpers";
import type { Category, Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";
import "react-swipeable-list/dist/styles.css";
import useBudget from "../hooks/useBudget";

type ExpenseDetailsProps = {
  expense: Expense;
};
export default function ExpenseDetails({ expense }: ExpenseDetailsProps) {
  const { dispatch } = useBudget();
  const categoryInfo = useMemo<Category>(
    () => categories.find((cat) => cat.id === expense.category)!,
    [expense]
  );

  const leadingActions = () => {
    return (
      <LeadingActions>
        <SwipeAction
          onClick={() =>
            dispatch({
              type: "get-expense-by-id",
              payload: { expenseId: expense.id },
            })
          }
        >
          Actualizar
        </SwipeAction>
      </LeadingActions>
    );
  };
  const trailingActions = () => {
    return (
      <TrailingActions>
        <SwipeAction
          onClick={() => {
            dispatch({
              type: "delete-expense",
              payload: { expenseId: expense.id },
            });
          }}
          destructive={true}
        >
          Eliminar
        </SwipeAction>
      </TrailingActions>
    );
  };
  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={20}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
          <div>
            <img
              src={`/icono_${categoryInfo.icon}.svg`}
              alt={categoryInfo.icon}
              className="w-20"
            />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-600">
              {categoryInfo.name}
            </p>
            <p className="text-lg text-slate-950">{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">
              {formatDate(expense.date!.toString())}
            </p>
          </div>
          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}
