import {
  Wallet,
  Receipt,
  TrendingUp,
  ChartNoAxesCombined,
} from "lucide-react";
import { formatCurrency } from "../utils/helpers";

function TotalExpenses({ total, count, highest = 0, average = 0 }) {
  const cards = [
    {
      id: "total",
      label: "Total Expenses",
      value: formatCurrency(total),
      subtitle:
        count === 0
          ? "No spending recorded yet"
          : "All-time amount spent",
      icon: Wallet,
      tone: "primary",
    },
    {
      id: "transactions",
      label: "Total Transactions",
      value: String(count),
      subtitle: count === 1 ? "1 expense logged" : "Expenses logged",
      icon: Receipt,
      tone: "mint",
    },
    {
      id: "highest",
      label: "Highest Expense",
      value: formatCurrency(highest),
      subtitle: count === 0 ? "Waiting for data" : "Largest single entry",
      icon: TrendingUp,
      tone: "glow",
    },
    {
      id: "average",
      label: "Average Expense",
      value: formatCurrency(average),
      subtitle: count === 0 ? "Waiting for data" : "Mean per transaction",
      icon: ChartNoAxesCombined,
      tone: "soft",
    },
  ];

  return (
    <section className="stats-grid" aria-label="Expense statistics">
      {cards.map(({ id, label, value, subtitle, icon: Icon, tone }) => (
        <article key={id} className={`stat-card stat-card--${tone}`}>
          <div className="stat-card__icon" aria-hidden="true">
            <Icon size={20} strokeWidth={2} />
          </div>
          <div className="stat-card__body">
            <p className="stat-card__label">{label}</p>
            <p className="stat-card__value">{value}</p>
            <p className="stat-card__subtitle">{subtitle}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

export default TotalExpenses;
