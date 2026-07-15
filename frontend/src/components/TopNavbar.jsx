import { CalendarDays, Menu, Wallet } from "lucide-react";
import { formatDisplayDate } from "../utils/helpers";

function TopNavbar({ onMenuOpen }) {
  return (
    <header className="topbar">
      <div className="topbar__left">
        <button
          type="button"
          className="topbar__menu"
          onClick={onMenuOpen}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
        <div className="topbar__brand">
          <span className="topbar__logo" aria-hidden="true">
            <Wallet size={18} strokeWidth={2.25} />
          </span>
          <div>
            <p className="topbar__title">Expense Tracker</p>
            <p className="topbar__subtitle">Dashboard overview</p>
          </div>
        </div>
      </div>

      <div className="topbar__right">
        <div className="topbar__date">
          <CalendarDays size={16} aria-hidden="true" />
          <time dateTime={new Date().toISOString()}>
            {formatDisplayDate()}
          </time>
        </div>
        <div className="topbar__avatar" aria-label="Profile">
          ET
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;
