import {
  LayoutDashboard,
  Receipt,
  ChartPie,
  Settings,
  Wallet,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "expenses", label: "Expenses", icon: Receipt },
];


function Sidebar({ activeNav, onNavigate, isOpen, onClose }) {
  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "is-visible" : ""}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <aside
        className={`sidebar ${isOpen ? "is-open" : ""}`}
        aria-label="Main navigation"
      >
        <div className="sidebar__brand">
          <span className="sidebar__logo" aria-hidden="true">
            <Wallet size={22} strokeWidth={2.25} />
          </span>
          <div>
            <p className="sidebar__brand-kicker">Personal Finance</p>
            <p className="sidebar__brand-name">Expense Tracker</p>
          </div>
          <button
            type="button"
            className="sidebar__close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar__nav">
          {NAV_ITEMS.map(({ id, label, icon: Icon, soon }) => (
            <button
              key={id}
              type="button"
              className={`sidebar__link ${activeNav === id ? "is-active" : ""}`}
              onClick={() => {
                if (soon) return;
                onNavigate(id);
              }}
              disabled={soon}
              aria-current={activeNav === id ? "page" : undefined}
            >
              <Icon size={18} strokeWidth={2} aria-hidden="true" />
              <span>{label}</span>
              {soon && <span className="sidebar__soon">Soon</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar__footer">
          <p>Track spending with clarity.</p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
