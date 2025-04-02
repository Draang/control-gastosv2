import { formatCurrency } from "../helpers";
type AmountDisplayProps = {
  label?: string;
  amount: number;
};
export default function AmountDisplay({ amount, label }: AmountDisplayProps) {
  return (
    <p className="text-2xl text-blue-600 font-bold  text-justify">
      {label && `${label}: `}
      <span
        className={`font-black ${
          amount >= 0 ? "text-blue-950" : "text-red-600"
        } `}
      >
        {formatCurrency(amount)}
      </span>
    </p>
  );
}
