type ValuePieceDate = Date | null;

export type ValueDate = ValuePieceDate | [ValuePieceDate, ValuePieceDate];

export type Category = {
  id: string;
  name: string;
  icon: string;
};
export type Expense = {
  id: string;
  amount: number;
  expenseName: string;
  category: Category["id"];
  date: ValueDate;
};

export type DraftExpense = Omit<Expense, "id">;
